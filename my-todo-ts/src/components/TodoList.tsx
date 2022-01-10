import React, { useContext } from "react";
import { TodosContext } from "../context/TodosContext";
import SingleTodo from "./SingleTodo";
import "./styles.css";

const TodoList: React.FC = () => {
  const { todos } = useContext(TodosContext);
  return (
    <div className="todos">
      {todos.map((todo) => (
        <SingleTodo todo={todo} key={todo.id} />
      ))}
    </div>
  );
};

export default TodoList;
