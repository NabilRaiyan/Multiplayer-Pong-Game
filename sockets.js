function listen(io){
    let readyPlyaerCount = 0;

    // tracing if a user is connected with on() function
    
    io.on('connection', (socket)=>{
        let room;
        console.log('a user connected...with id: ', socket.id);

        socket.on('ready', ()=>{
            room = 'room' + Math.floor(readyPlyaerCount / 2);
            socket.join(room);
            console.log(`Player ready: ${socket.id} ${room}`);

            readyPlyaerCount++;

            // Searching if there is an even ammount of player
            if (readyPlyaerCount % 2 === 0){
                // broadcast start game event
                // io.emit('startGame', socket.id);
                io.in(room).emit('startGame', socket.id); // broadcasting in a single room

            }
        });
        socket.on('paddleMove', (paddleData)=>{
            // socket.broadcast.emit('paddleMove', paddleData);
            socket.to(room).emit('paddleMove', paddleData);

        });

        socket.on('ballMove', (ballData)=>{
            // socket.broadcast.emit('ballMove', ballData);
            socket.to(room).emit('ballMove', ballData);

        });

        socket.on('disconnect', (reason)=>{
            console.log(`Client ${socket.id} is diconnected: ${reason}...`);
            socket.leave(room);
        });
    });
}

module.exports = {listen};