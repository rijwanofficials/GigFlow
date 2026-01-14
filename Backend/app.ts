import dotenv from "dotenv";

dotenv.config();
console.log("---✅ Environment variables loaded---");

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { apiRouter } from "./api/v1/routes";
import { connectMongoDB } from "./config/mongo";
// import { connectPostgres } from "./config/postgre";
import { initEmailService } from "./service/emailHelper";
import { initSocket } from "./socket";
import http from "http";

const app = express();
const PORT = process.env.PORT || 5000;

/* ---------- Middlewares ---------- */
app.use(cookieParser());

app.use(
  cors({
    origin: ["https://gig-flow-hazel.vercel.app", "http://localhost:5173"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//  ---------- Socket.io ---------- //
const server = http.createServer(app);
initSocket(server);

/* ---------- Routes ---------- */
app.use("/api/v1", apiRouter);

/* ---------- DB & Services ---------- */
connectMongoDB();
// connectPostgres();
initEmailService();

/* ---------- Test ---------- */
app.get("/testapp", (req, res) => {
  res.json({ message: "Hello from app.ts" });
});

/* ---------- Server ---------- */
server.listen(PORT, () => {
  console.log(`---✅Server running on port ${PORT}---`);
});
