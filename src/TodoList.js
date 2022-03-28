import React from "react";
import { TodoContext } from './App';

const TodoList = (props) => {
  const {dispatch, getState} = React.useContext(TodoContext);

  const handleCompleteCheckbox = (index) => {
    dispatch({
      type: "TOGGLE_TODO",
      payload: { index },
    });
  };

  return (
      <div className="Todo-list">
        {getState().map((todo, index) => (
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
  );
};

export default TodoList;