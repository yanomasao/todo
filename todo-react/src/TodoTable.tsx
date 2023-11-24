import React, { useEffect, useState } from "react";
import { Todo } from "./if/todo";

interface TodoTableProps {
  todos: Todo[];
  onTodoSelect: (todo: Todo) => void;
}

const TodoTable: React.FC<TodoTableProps> = ({ todos, onTodoSelect }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>title</th>
            <th>description</th>
            <th>status</th>
            <th>created_at</th>
            <th>updated_at</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id} onClick={() => onTodoSelect(todo)}>
              <td onClick={() => onTodoSelect(todo)}>{todo.id}</td>
              <td>{todo.title}</td>
              <td>{todo.description}</td>
              <td>{todo.status}</td>
              <td>{todo.created_at}</td>
              <td>{todo.created_by}</td>
              <td>{todo.updated_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoTable;
