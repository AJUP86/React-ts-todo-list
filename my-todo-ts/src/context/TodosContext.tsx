import { unlink } from "fs";
import React, { createContext, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Todo } from "../components/model";

type TodosContextProps = {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  handleAdd: (e: React.FormEvent) => void;
  completedTodos: Todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};
export const TodosContext = createContext<TodosContextProps>(
  {} as TodosContextProps
);
interface Props {
  children: JSX.Element | JSX.Element[];
}
const TodosProvider = ({ children }: Props) => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Array<Todo>>([]);
  const [completedTodos, setCompletedTodos] = useState<Array<Todo>>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
      setTodo("");
    }
  };
  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    let add;
    let active = todos;
    let complete = completedTodos;

    if (source.droppableId === "TodoList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }
    if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }
    setCompletedTodos(complete);
    setTodos(active);
  };
  const values = {
    todo,
    setTodo,
    todos,
    setTodos,
    handleAdd,
    completedTodos,
    setCompletedTodos,
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <TodosContext.Provider value={values}>{children}</TodosContext.Provider>
    </DragDropContext>
  );
};

export default TodosProvider;
