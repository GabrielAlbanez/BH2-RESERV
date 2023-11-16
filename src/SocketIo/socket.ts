import { Server as SocketIOServer, Socket } from 'socket.io';

const connectedUsers: { [socketId: string]: string } = {}; // Mapeia socketId para identificador único do usuário

const configureSocketIO = (httpServer) => {
  const io = new SocketIOServer(httpServer, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true
    }
  });

  io.on('connection', (socket: Socket) => {
    console.log(`Usuário conectado: ${socket.id}`);

    socket.on('authenticate', (cpf: string) => {
      // Autenticação do usuário
      // Aqui, você verifica o CPF no seu sistema e associa o ID do socket ao usuário autenticado
      connectedUsers[socket.id] = cpf;
      io.emit('userConnected', { cpf });
      console.log(connectedUsers);
    });

    socket.on('disconnect', () => {
      const cpf = connectedUsers[socket.id];
      console.log(`Usuário CPF ${cpf} desconectado`);
      delete connectedUsers[socket.id];
      io.emit('userDisconnected', { cpf });
    });
  });





  return io;
};

export { configureSocketIO, connectedUsers };
