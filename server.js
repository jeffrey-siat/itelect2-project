import "dotenv/config";
import express from "express";
import router, { setCachedUsers } from "./routes/index.js";
import { fetchSampleUsers } from "./src/api.js";

const app = express();
app.use(express.json());
app.use("/api", router);

const PORT = process.env.PORT || 3000;

const start = async () => {
  // Fetch once at startup and cache in memory -- not re-fetched per request.
  const users = await fetchSampleUsers();
  setCachedUsers(users);

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
