import dotenv from "dotenv";
import express from "express";
import { connectDB, closeDB } from "./database/database.ts";
import router from "./routes/index.mts";
import { auth } from "./services/auth.service.mts";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Await DB connection before anything else runs
await connectDB();

app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:4321",
    credentials: true
}));

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(express.json());
app.use("/api/v1", router);

app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

const server = app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

// Graceful shutdown
process.on("SIGINT", async () => {
    console.log("\nShutting down gracefully...");
    server.close(async () => {
        await closeDB();
        process.exit(0);
    });
});