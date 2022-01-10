import React, { useContext } from "react";
import { TodosContext } from "../context/TodosContext";
import SingleTodo from "./SingleTodo";
import "./styles.css";

const TodoList: React.FC = () => {
  const { todos } = useContext(TodosContext);
  return (
    <div className="container">
      <div className="todos">
        <span className="todos__heading">
          Active Tasks
          {todos.map((todo) => (
            <SingleTodo todo={todo} key={todo.id} />
          ))}
        </span>
      </div>
      <div className="todos remove">
        <span className="todos__heading">
          Completed Tasks
          {todos.map((todo) => (
            <SingleTodo todo={todo} key={todo.id} />
          ))}
        </span>
      </div>
    </div>
  );
};

export default TodoList;
