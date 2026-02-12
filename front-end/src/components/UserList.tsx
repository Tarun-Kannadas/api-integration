import { useEffect, useState } from "react";
import type { User } from "../types/User";

export const UserList = () => {
  // 1. Tell useState it will hold an ARRAY of Users (<User[]>)
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Define the async function inside useEffect to avoid scope issues
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        // 2. Cast the JSON to our User[] type
        const data = (await response.json()) as User[];
        setUsers(data);
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
    <div style={{ marginTop:'50px', maxWidth: '1500px'}}>
      <h2>User Directory</h2>
      <ul style={{ 
          listStyle: "none", 
          padding: 0, 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", 
          gap: "20px" 
        }}
      >
        {users.map((user) => (
          <li 
            key={user.id} 
            style={{ 
              border: "1px solid #ccc", 
              padding: "10px", 
              borderRadius: "5px", 
            }}
          >
            <strong>{user.name}</strong> <br />
            <small>{user.email}</small> <br />
            <a href={`http://${user.website}`}>{user.website}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};