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

const allowedOrigins = [
  "http://localhost:5173",
  "https://https://gig-flow-eh6325em5-rijwanofficials-projects.vercel.app/",
  "https://gig-flow-hazel.vercel.app/",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // allow server-to-server or Postman
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
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
