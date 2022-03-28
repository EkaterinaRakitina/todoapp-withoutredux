import React, {useState} from "react";
import TodoList from "./TodoList";
import { store } from './Store';

const Todos = (props) => {
  const [text, setText] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const addNewTask = () => {
    // console.log(text)
    store.dispatch({
      type: "ADD_TODO",
      text: text,
    });
    setText("");
  };

  return (
    <div>
      <h1>Todo-List</h1>
      <div className="Todo-header">
        <input type="text" value={text} onChange={handleChange}></input>
        <button onClick={() => addNewTask()}>Add</button>
      </div>
      <TodoList />
    </div>
  );
};

export default Todos;