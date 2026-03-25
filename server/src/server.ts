import dotenv from "dotenv";
import express from "express";
import http from "http";
import { connectDB } from './database/database.ts';
import routes from './routes/index.mts'


dotenv.config();
const app = express();
app.use('/api/v1/', routes);

const HOST = "localhost";
const PORT = process.env.PORT || 3000;

async function bootstrap() {
  await connectDB();
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
bootstrap();



const server = http.createServer((req, res) => {
  const { method, url } = req;
  
  console.log(`[${new Date().toISOString()}] ${method} ${url}`);
  
  // Route handling placeholder - replace with actual logic or router in the future
  if (method === "GET" && url === "/") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Welcome to my Node.js server!" }));

  } else if (method === "GET" && url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    
    res.end(JSON.stringify({ status: "ok" }));
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Route not found" }));
  }
});

server.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});