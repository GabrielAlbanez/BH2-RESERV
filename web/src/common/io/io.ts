import { io } from 'socket.io-client';

const sockett = io('http://localhost:8080'); // Substitua pela URL do seu servidor Socket.IO

export default sockett;











// const socket = io('http://localhost:8080');
//     socket.emit('authenticate', User[0]?.cpf);