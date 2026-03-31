import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./database/database.ts";
import router from "./routes/index.mts";
import { initAuth } from "./services/auth.service.mts";

dotenv.config();


const app = express();


app.use(express.json());
app.use("/api/v1", router);

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

const PORT = process.env.PORT || 3000;

async function bootstrap() {
  await connectDB();
  initAuth();
  console.log("Auth initialized successfully");
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}
bootstrap();