const apiServer = require('./api');
const httpServer = require('http').createServer(apiServer);
const sockets = require('./sockets');
const socketServer = require('socket.io')(httpServer, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
}); // attaching server to the socket

const PORT = 3000;

httpServer.listen(PORT);
console.log(`Server is running on port: ${PORT}....`);
sockets.listen(socketServer);
