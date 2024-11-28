import express from "express";
import cors from "cors";
import { connectDB } from "./config/db";
import authRoutes from "./routes/auth";
import todoRoutes from "./routes/todo";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/todos", todoRoutes);

const PORT = 5001;

app
  .listen(PORT, async () => {
    try {
      await connectDB();
      console.log(`Server running at http://localhost:${PORT}`);
    } catch (error) {
      console.error("Database connection failed:", error);
      process.exit(1);
    }
  })
  .on("error", (err: NodeJS.ErrnoException) => {
    if (err.code === "EADDRINUSE") {
      console.error(
        `Port ${PORT} is already in use. Please use a different port.`
      );
      process.exit(1);
    } else {
      console.error("Server error:", err);
      process.exit(1);
    }
  });
