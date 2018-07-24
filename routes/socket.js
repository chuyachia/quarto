// what if both left
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
                        socket.broadcast.to(data.room).emit('pick one');
                
                } else {
                    socket.emit('room full');
                }
            } else {
                socket.emit('not exist');
            }
        });
        
        socket.on('given',function(data){
            socket.emit('wait');
            socket.broadcast.to(data.room).emit('toplace',{pieceid:data.pieceid});
        });
        socket.on('placed',function(data){
            socket.broadcast.to(data.room).emit('tochange',{pieceid:data.pieceid,cellid:data.cellid,classname:data.classname});
        });
        socket.on('won',function(data){
            socket.broadcast.to(data.room).emit('otherwon',{pieceid:data.pieceid});
        });
        socket.on('replay',function(data){
            if (data.room in replay) {
                if (data.replay&&replay[data.room]['res1']) {
                    io.in(data.room).emit('ready to start');
                    var starter =Math.random();
                    if (starter >0.5)
                        socket.emit('pick one');
                    else 
                        socket.broadcast.to(data.room).emit('pick one');
                }
                delete replay[data.room];
            } else {
                if (data.replay&&activeRooms[data.room].length==2){
                    replay[data.room] = {res1:true};
                    socket.emit('wait for replay');
                }
                else
                    replay[data.room] = {res1:false};
                
            }
        });
        
        socket.on('message',function(data){
            socket.broadcast.to(data.room).emit('new message',{message:data.message});
        });
        
        socket.on('gif',function(data){
            socket.broadcast.to(data.room).emit('new gif',{url:data.url,width:data.width,height:data.height});
        });        
        socket.on('disconnect', function () {
            Object.keys(activeRooms).forEach(function(k){
                var ind = activeRooms[k].indexOf(socket.id);
                if (ind!==-1){
                    if (activeRooms[k].length==2){
                        activeRooms[k].splice(ind,1);
                        io.in(k).emit('player left');
                    } else if (activeRooms[k].length==1) {
                        delete activeRooms[k];
                    }
                }
            });
        });
    });
};