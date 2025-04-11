import { io } from 'socket.io-client';

const socket = io('https://chatverse-v1.onrender.com', {
  withCredentials: true,
});

export default socket;
