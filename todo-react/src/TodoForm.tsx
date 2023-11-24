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
    active_flg: true,
    created_by: "",
  });

  useEffect(() => {
    if (todo) {
      setFormTodo(todo);
    }
  }, [todo]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value =
      e.target.name === "active_flg" ? e.target.checked : e.target.value;
    setFormTodo({
      ...formTodo,
      // [e.target.name]: e.target.value,
      [e.target.name]: value,
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
        active_flg: true,
        created_by: "",
      });
      onTodoSubmit();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <div className="row">
        <div className="col">
          <div className="mb-3">
            <label className="form-label">タイトル</label>
          </div>
        </div>
        <div className="col">
          <input
            type="text"
            name="title"
            value={formTodo.title}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <div className="col">
          <div className="mb">
            <label className="form-label">説明</label>
          </div>
        </div>
        <div className="col">
          <input
            type="text"
            name="description"
            value={formTodo.description || ""}
            className="form-control form-control-lg"
            onChange={handleChange}
          />
        </div>
        <div className="col">
          <div className="mb">
            <label className="form-label">有効</label>
          </div>
        </div>
        <div className="col">
          <input
            type="checkbox"
            name="active_flg"
            checked={formTodo.active_flg}
            className="form-check-input"
            onChange={handleChange}
          />
        </div>
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
      <input type="hidden" name="id" value={formTodo.id} />
    </form>
  );
};

export default TodoForm;
