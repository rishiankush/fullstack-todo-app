import { Request, Response } from "express";
import { Todo } from "../models/Todo";
import { IGetUserAuthInfoRequest } from "../authMiddleware";

export const getTodos = async (
  req: IGetUserAuthInfoRequest,
  res: Response
): Promise<void> => {
  const userId = req.user?.id;

  if (!userId) {
    res.status(400).json({ error: "User ID is missing." });
    return;
  }

  try {
    const todos = await Todo.findAll({ where: { userId } });
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch todos." });
  }
};

export const createTodo = async (
  req: IGetUserAuthInfoRequest,
  res: Response
): Promise<void> => {
  const { title } = req.body;
  const userId = req.user?.id;

  if (!userId) {
    res.status(400).json({ error: "User ID is missing." });
    return;
  }

  try {
    const todo = await Todo.create({ title, userId });
    res.status(201).json(todo);
  } catch (error) {
    console.error("Error creating todo:", error);
    res.status(500).json({ error: "Failed to create todo." });
  }
};

export const updateTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id, completed } = req.body;

  if (!id) {
    res.status(400).json({ error: "Todo ID is required." });
    return;
  }

  try {
    const todo = await Todo.update({ completed }, { where: { id } });
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: "Failed to update todo." });
  }
};
