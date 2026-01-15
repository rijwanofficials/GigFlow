import { io, type Socket } from "socket.io-client";


let socket: Socket | null = null;

export const connectSocket = (userId: string) => {
  if (!socket) {
    socket = io("https://gigflow-42g0.onrender.com", {
      withCredentials: true,
    });

    socket.on("connect", () => {
      console.log("🔌 Socket connected:", socket?.id);
      socket?.emit("join", userId);
    });

    socket.on("disconnect", () => {
      console.log("❌ Socket disconnected");
    });
  }
};

export const getSocket = () => socket;
