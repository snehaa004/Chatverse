import { io } from "socket.io-client";

const socket = io("https://chatverse-v1.onrender.com", {
  transports: ["websocket"],
  withCredentials: true,
});

socket.on('connect', () => {
    console.log('Socket connected with ID:', socket.id);
  });

export default socket;