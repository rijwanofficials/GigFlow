import { Server, Socket } from "socket.io";
import http from "http";

let io: Server | null = null;

export const initSocket = (server: http.Server) => {
  try {
    io = new Server(server, {
      cors: {
        origin: "http://localhost:5173",
        credentials: true,
      },
    });

    io.on("connection", (socket: Socket) => {
      console.log("🔌 Socket connected:", socket.id);

      // Join user room
      socket.on("join", (userId: unknown) => {
        try {
          if (!userId || typeof userId !== "string") {
            console.warn(
              `⚠️ Invalid userId on join from socket ${socket.id}`,
              userId
            );
            return;
          }

          socket.join(userId);
          console.log(`👤 User joined room: ${userId}`);
        } catch (error) {
          console.error("❌ Error while joining room:", error);
        }
      });

      socket.on("error", (error) => {
        console.error(`❌ Socket error (${socket.id}):`, error);
      });

      socket.on("disconnect", (reason) => {
        console.log(`🔌 Socket disconnected (${socket.id}):`, reason);
      });
    });

    console.log("---✅Socket.io initialized successfully---");
  } catch (error) {
    console.error("❌ Failed to initialize Socket.io:", error);
  }
};

export const getIO = (): Server => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};
