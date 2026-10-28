import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRouter from "./routes/auth.js";
import taskRouter from "./routes/tasks.js";
import errorHandler from "./middleware/errorHandler.js";

// Boot-time guard: refuse to start without a JWT secret
if (!process.env.JWT_SECRET) {
  console.error("FATAL: JWT_SECRET is missing from .env. Server will not start.");
  process.exit(1);
}

const app = express();

// Session 14: only web pages served from these addresses may read
// the API's answers in a browser. A comma-separated list.
const allowedOrigins = (process.env.CORS_ORIGIN || "")
  .split(",")
  .filter(Boolean);

app.use(cors({ origin: allowedOrigins }));
app.use(morgan("dev"));
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api", taskRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});