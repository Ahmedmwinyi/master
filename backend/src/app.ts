import express from "express";
import { clerkMiddleware } from '@clerk/express'

import authRoutes from "./routes/authRoutes"
import chatRoutes from "./routes/chatRoutes"
import messageRoutes from "./routes/messageRoutes"
import userRoutes from "./routes/userRoutes"
import { errorHandler } from "./middleware/errorHandler";


const app = express();

app.use(express.json())

app.use(clerkMiddleware())

app.get("/health", (req, res) => {
  res.json({ status: "Ok", message: "Server is up and running!" });
});

app.use("/api/auth", authRoutes)
app.use("/api/chat", chatRoutes)
app.use("/api/message", messageRoutes)
app.use("/api/user", userRoutes)

app.use(errorHandler)

export default app;
