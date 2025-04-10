import { io } from 'socket.io-client';

export const socket = io("https://chatverse-v1.onrender.com");
export default socket;
