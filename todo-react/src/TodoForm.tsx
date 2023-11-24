import React, { useState } from "react";
import axios from "axios";
import { Todo } from "./if/todo";

interface TodoFormProps {
  onTodoSubmit: () => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onTodoSubmit }) => {
  const [todo, setTodo] = useState<
    Omit<Todo, "created_at" | "updated_at" | "updated_by">
  >({
    id: 0,
    title: "",
    description: null,
    status: "pending",
    created_by: "fff",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo({
      ...todo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log(todo);
      await axios.post("/api/todo/create", todo);
      setTodo({
        id: 0,
        title: "",
        description: null,
        status: "pending",
        created_by: "",
      });
      onTodoSubmit();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      title:{" "}
      <input
        type="text"
        name="title"
        value={todo.title}
        onChange={handleChange}
        required
      />
      description:{" "}
      <input
        type="text"
        name="description"
        value={todo.description || ""}
        onChange={handleChange}
      />
      <input type="submit" value="Submit" />
    </form>
  );
};

export default TodoForm;
