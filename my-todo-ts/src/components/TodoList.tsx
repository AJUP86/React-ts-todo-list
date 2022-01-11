import React, { useContext } from "react";
import { Droppable } from "react-beautiful-dnd";
import { TodosContext } from "../context/TodosContext";
import SingleTodo from "./SingleTodo";
import "./styles.css";

const TodoList: React.FC = () => {
  const { todos, completedTodos, setCompletedTodos, setTodos } =
    useContext(TodosContext);
  return (
    <div className="container">
      <Droppable droppableId="TodosList">
        {(provided, snapshot) => (
          <div
            className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">Active Tasks</span>
            {todos.map((todo, index) => {
              return (
                <SingleTodo
                  index={index}
                  todos={todos}
                  todo={todo}
                  key={todo.id}
                  setTodos={setTodos}
                />
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="TodosRemove">
        {(provided, snapshot) => (
          <div
            className={`todos remove ${
              snapshot.isDraggingOver ? "dragcomplete" : ""
            }}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">Completed Tasks</span>
            {completedTodos.map((todo, index) => {
              return (
                <SingleTodo
                  todo={todo}
                  key={todo.id}
                  todos={completedTodos}
                  setTodos={setCompletedTodos}
                  index={index}
                />
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodoList;
