import { unlink } from "fs";
import React, { createContext, useState } from "react";
import { Todo } from "../components/model";

type TodosContextProps = {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  handleAdd: (e: React.FormEvent) => void;
};
export const TodosContext = createContext<TodosContextProps>(
  {} as TodosContextProps
);
interface Props {
  children: JSX.Element | JSX.Element[];
}
const TodosProvider = ({ children }: Props) => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
      setTodo("");
    }
  };
  const values = {
    todo,
    setTodo,
    todos,
    setTodos,
    handleAdd,
  };

  return (
    <div>
      <TodosContext.Provider value={values}>{children}</TodosContext.Provider>
    </div>
  );
};

export default TodosProvider;
