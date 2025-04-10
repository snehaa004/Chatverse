import { io } from "socket.io-client";

// ✅ Connect to deployed backend
const socket = io("https://chatverse-v1.onrender.com", {
  transports: ["websocket"], // Forces WebSocket over polling (good for Render)
  withCredentials: true // Needed if server uses credentials or cookies
});

// ✅ Log on connection
socket.on('connect', () => {
  console.log('✅ Socket connected:', socket.id);
});

// Optional: Log connection errors
socket.on('connect_error', (err) => {
  console.error('❌ Socket connection error:', err.message);
});

export default socket;
