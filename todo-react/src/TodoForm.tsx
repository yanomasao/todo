import React, { useEffect, useState } from "react";
import axios from "axios";
import { Todo } from "./if/todo";

interface TodoFormProps {
  onTodoSubmit: () => void;
  todo: Todo | null;
}

const TodoForm: React.FC<TodoFormProps> = ({ onTodoSubmit, todo }) => {
  const [formTodo, setFormTodo] = useState<
    Omit<Todo, "created_at" | "updated_at" | "updated_by">
  >({
    id: 0,
    title: "",
    description: null,
    status: "pending",
    created_by: "",
  });

  useEffect(() => {
    if (todo) {
      setFormTodo(todo);
    }
  }, [todo]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormTodo({
      ...formTodo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log(formTodo);
      await axios.post("/api/todo", formTodo);
      setFormTodo({
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
    <form onSubmit={handleSubmit} className="mb-3">
      <div className="mb-3">
        <label className="form-label">タイトル</label>
        <input
          type="text"
          name="title"
          value={formTodo.title}
          onChange={handleChange}
          required
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label className="form-label">説明</label>
        <input
          type="text"
          name="description"
          value={formTodo.description || ""}
          className="form-control"
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
      <input type="hidden" name="id" value={formTodo.id} />
    </form>
  );
};

export default TodoForm;
