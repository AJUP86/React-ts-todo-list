import React, { useEffect, useState } from "react";
import "./styles.css";

const InputField = () => {
  const [todo, setTodo] = useState<string>("");
  return (
    <form className="input">
      <input
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
