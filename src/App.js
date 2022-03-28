import React, { useState } from "react";
import "./App.css";
const TodoContext = React.createContext({});
export const TodoProvider = TodoContext.Provider;
export const TodoConsumer = TodoContext.Consumer;

const todosReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      console.log(action);
      return [
        ...state,
        {
          text: action.text,
          completed: false,
        },
      ];
    case "TOGGLE_TODO":
      console.log(action.payload);
      return state.map((todo, i) => {
        if (i === action.payload.index) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
    default:
      return state;
  }
};

function createStore(reducer, initialState) {
  let state = initialState;
  return {
    dispatch: (action) => {
      state = reducer(state, action);
      console.log(state);
    },
    getState: () => state,
  };
}
const store = createStore(todosReducer, []);

export default function App() {
  const [text, setText] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleCompleteCheckbox = (index) => {
    store.dispatch({
      type: "TOGGLE_TODO",
      payload: { index },
    });
  };

  const addNewTask = () => {
    // console.log(text)
    store.dispatch({
      type: "ADD_TODO",
      text: text,
    });
    setText("");
  };

  const todos = store.getState();
  // console.log(todos);

  return (
    <TodoContext.Provider value={todos}>
      {/* {console.log(store.getState())} */}
      <div className="App">
        <h1>Todo-List</h1>
        <div className="Todo-header">
          <input type="text" value={text} onChange={handleChange}></input>
          <button onClick={() => addNewTask()}>Add</button>
        </div>
        <div className="Todo-list">
          {todos.map((todo, index) => (
            <div key={index}>
              <div>
                <input
                  type="checkbox"
                  onChange={() => handleCompleteCheckbox(index)}
                />
                <span>{todo.text}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Parents />
    </TodoContext.Provider>
  );
}

function Parents(props) {
  return (
    <div>
      <h2>Inherited Parent Property With "props":</h2>
      <label />
      <br />
      <br />
      <br />
      <Children />
    </div>
  );
}

function Children() {
  return (
    <TodoConsumer>
      {context => {
        return (
          <div>
            <h3>Inherited Child Properties without "props": </h3>
            {context.map((item,index) => (
              <div key={index}>{item.text}</div>
              ))}
            {/* <p>{context.text}</p> */}
            {console.log(context)}
          </div>
        );
      }}
    </TodoConsumer>
  );
}


