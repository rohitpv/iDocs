import { io } from 'socket.io-client';

const socket = io('https://idocs.onrender.com', {
  withCredentials: true,
  transports: ['websocket', 'polling'],
  extraHeaders: {
    "my-custom-header": "abcd"
  }
});

export default socket;
