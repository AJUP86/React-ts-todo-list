import { useContext, useRef } from "react";
import { TodosContext } from "../context/TodosContext";
import "./styles.css";

const InputField = () => {
  const { todo, setTodo, handleAdd } = useContext(TodosContext);
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <form
      className="input"
      onSubmit={(e) => {
        handleAdd(e);
        inputRef.current?.blur();
      }}
    >
      <input
        ref={inputRef}
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        type="input"
        placeholder="Enter a task"
        className="input__box"
      />
      <button className="input__submit" type="submit">
        Go
      </button>
    </form>
  );
};
export default InputField;
