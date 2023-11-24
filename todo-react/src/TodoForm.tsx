import React, { useEffect, useState } from "react";
import axios from "axios";
import { Todo } from "./if/todo";
import "./TableForm.css";

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
    <form onSubmit={handleSubmit} className="form-horizontal col-8">
      <div className="form-group row">
        <label className="col-md-2 control-label">タイトル</label>
        <div className="col-md-8">
          <input
            type="text"
            name="title"
            value={formTodo.title}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
      </div>
      <div className="form-group row">
        <label className="col-md-2 control-label">説明</label>
        <div className="col-md-10">
          <input
            type="text"
            name="description"
            value={formTodo.description || ""}
            className="form-control form-control"
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="form-group row">
        <label className="col-md-2 control-label">有効</label>
        <div className="col-md-1">
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
