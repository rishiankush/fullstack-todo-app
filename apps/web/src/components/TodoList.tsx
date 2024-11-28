import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Checkbox,
} from "@mui/material";
import { useAuth } from "../hooks/useAuth";
import api from "../services/api";

const Todos: React.FC = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const { token, logout } = useAuth();

  const loadTodos = async () => {
    try {
      const response = await api.get("/todos", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodos(response.data);
    } catch {
      alert("Failed to load todos. Please log in again.");
      logout(); // Log the user out if token is invalid or expired
    }
  };

  const handleAddTodo = async () => {
    try {
      const response = await api.post(
        "/todos",
        { title: newTodo },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTodos([...todos, response.data]);
      setNewTodo("");
    } catch {
      alert("Failed to add todo.");
    }
  };

  const toggleTodo = async (id: number, completed: boolean) => {
    try {
      await api.put(
        "/todos",
        { id, completed: !completed },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTodos(
        todos.map((todo: any) =>
          todo.id === id ? { ...todo, completed: !completed } : todo
        )
      );
    } catch {
      alert("Failed to update todo.");
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4">Your Todos</Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={logout}
          sx={{ mt: 2 }}
        >
          Logout
        </Button>
        <Box sx={{ mt: 2 }}>
          <input
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo"
            style={{
              padding: "10px",
              fontSize: "16px",
              width: "80%",
              marginRight: "10px",
            }}
          />
          <Button variant="contained" onClick={handleAddTodo}>
            Add
          </Button>
        </Box>
        <List>
          {todos.map((todo: any) => (
            <ListItem key={todo.id} disablePadding>
              <Checkbox
                edge="start"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id, todo.completed)}
              />
              <ListItemText
                primary={todo.title}
                secondary={todo.completed ? "Completed" : "Pending"}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default Todos;
