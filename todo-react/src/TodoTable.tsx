import React, { useEffect, useState } from "react";
import { Todo } from "./if/todo";

interface TodoTableProps {
  todos: Todo[];
  onTodoSelect: (todo: Todo) => void;
}

const TodoTable: React.FC<TodoTableProps> = ({ todos, onTodoSelect }) => {
  return (
    <div className="table-responsive">
      <table className="table fs-6 table-striped">
        <thead>
          <tr>
            <th>id</th>
            <th>title</th>
            <th>description</th>
            <th>status</th>
            <th>active</th>
            <th>created_at</th>
            <th>created_by</th>
            <th>updated_at</th>
            <th>updated_by</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id} onClick={() => onTodoSelect(todo)}>
              <td onClick={() => onTodoSelect(todo)}>{todo.id}</td>
              <td>{todo.title}</td>
              <td>{todo.description}</td>
              <td>{todo.status}</td>
              <td>{todo.active_flg ? "Active" : "Inactive"}</td>{" "}
              <td>{todo.created_at}</td>
              <td>{todo.created_by}</td>
              <td>{todo.updated_at}</td>
              <td>{todo.updated_by}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoTable;
