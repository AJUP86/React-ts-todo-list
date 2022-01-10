import "./App.css";
import InputField from "./components/InputField";
import TodoList from "./components/TodoList";
import TodosProvider from "./context/TodosContext";

const App: React.FC = () => {
  return (
    <div className="App">
      <span className="heading">Taskify</span>
      <TodosProvider>
        <InputField />
        <TodoList />
      </TodosProvider>
    </div>
  );
};

export default App;
