import { useEffect, useState } from "react";
import "./App.css";
import React from "react";
import TodoTable from "./TodoTable";
import TodoForm from "./TodoForm";
import { Todo } from "./if/todo";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [reload, setReload] = useState(true);

  const fetchTodos = async () => {
    try {
      const response = await axios.get("/api/todo");
      setTodos(response.data);
    } catch (err) {}
  };

  useEffect(() => {
    if (reload) {
      fetchTodos();
      setReload(false);
    }
  }, [reload]);

  const handleTodoSubmit = () => {
    console.log("handleTodoSubmit");
    setReload(true);
  };

  return (
    <div className="App">
      <header className="App-header">
        <TodoForm onTodoSubmit={handleTodoSubmit} />
        <TodoTable todos={todos} />
      </header>
    </div>
  );
}

export default App;
