import React, { useContext, useEffect, useRef, useState } from "react";
import { TodosContext } from "../context/TodosContext";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { Todo } from "./model";
import "./styles.css";
import { Draggable } from "react-beautiful-dnd";
type Props = {
  todo: Todo;
  index: number;
  todos?: Todo[];
  setTodos?: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTodos?: Todo[];
  setCompletedTodos?: React.Dispatch<React.SetStateAction<Todo[]>>;
  key: number;
};

const SingleTodo = ({ todo, index }: Props) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);
  const { todos, setTodos } = useContext(TodosContext);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [isEdit]);
  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };
  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos(
      todos.map((todo, index) =>
        todo.id === id ? { ...todo, todo: editTodo } : todo
      )
    );
    setIsEdit(false);
  };
  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          className={`todos__single ${snapshot.isDragging ? "drag " : ""}`}
          onSubmit={(e) => {
            handleEdit(e, todo.id);
          }}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {isEdit ? (
            <input
              value={editTodo}
              onChange={(e) => {
                setEditTodo(e.target.value);
              }}
              className={"todos__single--text"}
              ref={inputRef}
            />
          ) : todo.isDone ? (
            <s className="todos__single--text">{todo.todo}</s>
          ) : (
            <span className="todos__single--text">{todo.todo}</span>
          )}
          <div>
            <span
              className="icon"
              onClick={() => {
                if (!isEdit && !todo.isDone) {
                  setIsEdit(!isEdit);
                }
              }}
            >
              <AiFillEdit />
            </span>
            <span className="icon">
              <AiFillDelete onClick={() => handleDelete(todo.id)} />
            </span>
            <span className="icon">
              <MdDone onClick={() => handleDone(todo.id)} />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTodo;
