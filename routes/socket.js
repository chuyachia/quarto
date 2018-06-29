module.exports = function(io){
     io.on('connection', function (socket) {
         console.log('new connection');
         socket.emit('tell room');
         socket.on('room name',function(data){
             io.in(data.room).clients(function(err, clients){
                if(clients.length===0) {
                    socket.join(data.room);
                    socket.emit('new room created');
                } else if (clients.length===1) {
                    socket.join(data.room);
                    io.in(data.room).emit('new player joined');
                    socket.broadcast.to(clients[0]).emit('pick one');
                } else {
                    socket.emit('room full');
                }
             });
         });
         socket.on('given',function(data){
             socket.broadcast.to(data.roomname).emit('toplace',{pieceid:data.pieceid});
         });
         socket.on('placed',function(data){
             socket.broadcast.to(data.roomname).emit('tochange',{pieceid:data.pieceid,cellid:data.cellid});
         })
     });

};