import React, { useState } from "react";
import axios from "axios";
import { Todo } from "./if/todo";

const TodoForm: React.FC = () => {
  // const [todo, setTodo] = useState<Omit<Todo, 'id' | 'created_at' | 'updated_at'>>({
  const [todo, setTodo] = useState<Todo>({
    id: 100,
    title: "",
    description: null,
    status: "pending",
    created_at: new Date().toISOString(),
    created_by: "fff",
    updated_at: null,
    updated_by: null,
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
      // const res = await axios.get("/api/todo");
      // console.log(res.data);
      setTodo({
        id: 101,
        title: "",
        description: null,
        status: "pending",
        created_by: "",
        created_at: new Date().toISOString(),
        updated_by: null,
        updated_at: null,
      });
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
      {/* created_by: <input type="text" name="created_by" value={todo.created_by} onChange={handleChange} required /> */}
      <input type="submit" value="Submit" />
    </form>
  );
};

export default TodoForm;
