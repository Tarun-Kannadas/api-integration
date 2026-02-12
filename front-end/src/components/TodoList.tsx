import { useEffect, useState } from "react";
import type { Todos } from "../types/Todo";

export const TodosList = () => {
    // 1. Tell useState it will hold an ARRAY of Users (<User[]>)
    const [todos, settodos] = useState<Todos[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Define the async function inside useEffect to avoid scope issues
        const fetchUsers = async () => {
        try {
            const response = await fetch("http://localhost:4000/api/todos");
            
            if (!response.ok) {
            throw new Error("Failed to fetch users");
            }

            // 2. Cast the JSON to our User[] type
            const data = (await response.json()) as Todos[];
            settodos(data);
        } catch (err) {
            if (err instanceof Error) {
            setError(err.message);
            } else {
            setError("An unknown error occurred");
            }
        } finally {
            setLoading(false);
        }
        };

        fetchUsers();
    }, []); // Empty dependency array = run only once on mount

    // 3. Conditional Rendering
    if (loading) return <p>Loading users...</p>;
    if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

    return (
        <div style={{ padding: "20px" }}>
        <h2>My Custom API Todos</h2>
        <ul>
            {todos.map((todo) => (
            <li style={{ textAlign: "left" }} key={todo.id}>
                {todo.task} {todo.done ? "✅" : "❌"}
            </li>
            ))}
        </ul>
        </div>
    );
}