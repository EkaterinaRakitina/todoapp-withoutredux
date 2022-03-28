import React from "react";
import "./App.css";
import { store } from "./Store";
import Todos from "./Todos";

export const TodoContext = React.createContext({});

export default function App() {

  return (
    <TodoContext.Provider value={store}>
      <div className="App">
        <Todos />
      </div>
    </TodoContext.Provider>
  );
}