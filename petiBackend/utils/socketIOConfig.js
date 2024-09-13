const socketIo = require('socket.io');

// to store io instance
let io; 

const setupSocket = (server) => {
    // io to socketIo(server)
    io = socketIo(server);
    
    // once connected console log
    io.on('connection', (socket) => {
        console.log('A user connected');

        // Listen for a user joining a specific chatId
        socket.on('join room', (chatId) => {
            // Join the user to the room (chatId)
            socket.join(chatId);
        });
        
        // if disconnected pass a message
        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
    });
};

// emitMessage handles the message 
// io.emit sends both user the message in real time
const emitMessage = (chatId, data) => {
    // message is on and a user connects with another user
    if (io) {
        io.to(chatId).emit('chat message', data); // Broadcast to all clients
    }
};

module.exports = {
  setupSocket,
  emitMessage
};
