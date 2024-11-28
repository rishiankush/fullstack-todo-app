import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

const SECRET = "supersecretkey";

export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "User registration failed." });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    console.log("User found:", user?.dataValues);

    if (!user) {
      console.log("User not found");
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    const hashedPassword = user.password || user.dataValues.password;
    console.log("Hashed password retrieved:", hashedPassword);

    const isPasswordValid = await bcrypt.compare(password, hashedPassword);
    if (!isPasswordValid) {
      console.log("Invalid password");
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    const token = jwt.sign({ id: user?.dataValues.id }, SECRET, {
      expiresIn: "1h",
    });
    console.log("Login successful, token generated:", token);
    res.json({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Login failed" });
  }
};
