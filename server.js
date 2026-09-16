import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import router from "./routes/index.js";
import authRouter from "./routes/auth.js";

// Boot-time guard: refuse to start without a JWT secret
if (!process.env.JWT_SECRET) {
  console.error("FATAL: JWT_SECRET is missing from .env. Server will not start.");
  process.exit(1);
}

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api", router);

app.use((err, req, res, next) => {
  console.error(err.message);

  if (err.name === "SequelizeValidationError") {
    return res.status(400).json({ error: err.errors.map((e) => e.message) });
  }

  if (err.name === "SequelizeUniqueConstraintError") {
    return res.status(409).json({ error: "Email is already registered." });
  }

  const status = err.status || 500;
  res.status(status).json({ error: err.message });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});