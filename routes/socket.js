// global array keep track of socket id, room name and last activity time to be able to broadcast to room when a socket leaves and clean empty room

module.exports = function(io,activeRooms){
    var replay = {};
    
    io.on('connection', function (socket) {
        console.log('new connection');
        socket.emit('tell room');
        socket.on('room name',function(data){
            var socketsInRoom = activeRooms[data.room];
            if (socketsInRoom){
                if (socketsInRoom.length===0) {
                    socket.join(data.room);
                    socket.emit('wait for other');
                    activeRooms[data.room].push(socket.id);
                } else if (socketsInRoom.length===1) {
                    socket.join(data.room);
                    io.in(data.room).emit('ready to start');
                    activeRooms[data.room].push(socket.id);
                    var starter =Math.random();
                    if (starter >0.5)
                        socket.emit('pick one');
                    else 
                        socket.broadcast.to(activeRooms[data.room][0]).emit('pick one');
                
                } else {
                    socket.emit('room full');
                }
            } else {
                socket.emit('not exist');
            }
        });
        
        socket.on('given',function(data){
            socket.broadcast.to(data.room).emit('toplace',{pieceid:data.pieceid});
        });
        socket.on('placed',function(data){
            socket.broadcast.to(data.room).emit('tochange',{pieceid:data.pieceid,cellid:data.cellid,classname:data.classname});
        });
        socket.on('won',function(data){
            socket.broadcast.to(data.room).emit('otherwon',{pieceid:data.pieceid});
        });
        socket.on('replay',function(data){
            if (data.room in replay&&replay[data.room]==1) {
                replay[data.room] = 0;
                io.in(data.room).emit('ready to start');
                var starter =Math.random();
                //if (starter >0.5)
                    socket.emit('pick one');
                //else 
                //    socket.broadcast.to(activeRooms[data.room]).emit('pick one');
            } else {
                replay[data.room] = 1;
                socket.emit('wait for other');
            }
        })
        
        
        socket.on('disconnect', function () {
            console.log('hey');
            Object.keys(activeRooms).forEach(function(k){
                var ind = activeRooms[k].indexOf(socket.id);
                console.log(socket.id);
                console.log(activeRooms[k]);
                console.log(ind);
                if (ind!==-1){
                    if (activeRooms[k].length==2){
                        activeRooms[k].splice(ind,1);
                        io.in(k).emit('player left');
                        console.log(activeRooms);
                    } else if (activeRooms[k].length==1) {
                        delete activeRooms[k];
                        console.log(activeRooms);
                    }
                }
            });
        });
    });
};