
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Todo } from "./if/todo";  // Todoインターフェースをインポートします
import { todo } from "node:test";

const TodoTable = () => {
    //todos に型を定義するには？
    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("/api/todo");
                console.log(res.data);
                setTodos(res.data);
            } catch (e) {
                console.log(e);
            }
        };

        fetchData();
    }, []);
    console.log(todos)

    if (todos === null) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <table>
                <tr>
                    <th>id</th>
                    <th>title</th>
                    <th>description</th>
                    <th>status</th>
                    <th>created_at</th>
                    <th>updated_at</th>
                </tr>
                {todos.map((todo) => (
                    <tr key={todo.id}>
                        <td>{todo['id']}</td>
                        <td>{todo['title']}</td>
                        <td>{todo['description']}</td>
                        <td>{todo['status']}</td>
                        <td>{todo['created_at']}</td>
                        <td>{todo['created_by']}</td>
                        <td>{todo['updated_at']}</td>
                    </tr>
                ))}
            </table>
        </div>
    );
    // return <div>FOOO</div>;
    // return <div>{JSON.stringify(apiMessage)}</div>;
};

export default TodoTable;
