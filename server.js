import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import router, { setCachedUsers } from "./routes/index.js";
import { fetchSampleUsers } from "./src/api.js";
 
const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/api", router);
 
app.use((err, req, res, next) => {
  console.error(err.message);
  const status = err.status || 500;
  res.status(status).json({ error: err.message });
});
 
const PORT = process.env.PORT || 3000;
 
const start = async () => {
  const users = await fetchSampleUsers();
  setCachedUsers(users);
 
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};
 
start();
