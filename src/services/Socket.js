import io from "socket.io-client";
const url = "http://localhost:3000";
console.log(process.env.REACT_BACKEND_APP_API_URL);
const socket = io(url);

export default socket;