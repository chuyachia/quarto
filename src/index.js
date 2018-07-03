// waitzone click prevent pass id of non existing
// after win lost, propose restart
import Game from './Game.js';
(function(){
    var socket = io.connect('https://quarto-game-ccyqc.c9users.io/');
    var waitzone = document.getElementById('waitzone');
    var messagebox = document.getElementById('messagebox');
    var overlay = document.getElementById('overlay');
    var placezone = document.getElementById('placezone');
    var modal = document.getElementById('modal');
    const instruction= {
        waitforjoin:'Waiting for the other player to join the game',
        roomfull:'The game that you try to join is full. Please try another game',
        notexist:'The game that you try to join does not exist. Please try another game',
        waitformove:'Waiting for the other player to act',
        ready:'Game ready to start! Waiting for the other player to act',
        give:'Click a piece to give it to the other player or click <em id="quarto">Quarto!</em> here if you think you just made a line.',
        place:'Drap the highlighted piece and drop on the desired cell.',
        won:"You won!",
        lost:"The other player just found a Quarto. You lost...",
        wrong:"No Quarto found with the piece that you just placed...",
        left:"The other player just left",
        replay:"<button id='replay'>Play again</button><button id='leave'>Leave</button>"
    };
    

    function start(){
        Game.start();
        waitzone.classList.remove('selectable');
        waitzone.innerHTML = Game.getAllPieces();
        placezone.innerHTML= Game.getAllCells();
    }
    
    function replay(ev){
        var target = ev.target;
        if (target.className=="left") {
            start();
            modal.classList.add('hide');
            modal.removeEventListener('click',replay);
            socket.emit('replay',{room:room});
        } else if (target.className=="right") {
            socket.disconnect();
            modal.classList.add('hide');
            modal.removeEventListener('click',replay);
        }
    }
    
    function select(ev){
        var target = ev.target;
        if (target.nodeName=="FIGURE") {
            target = target.parentElement;
        target.setAttribute('draggable','true');
        waitzone.removeEventListener('click',select);
        waitzone.classList.remove('selectable');
        socket.emit('given',{pieceid:target.id,room:room});
        messagebox.innerHTML = instruction.waitformove;
        overlay.classList.remove('hide');
        }
    }
    
    function makeDraggable(id){
        document.getElementById(id).setAttribute("draggable","true");
    }
    
    function movePiece(pieceid,cellid,classname){
      Game.update(cellid,classname);
      var piece = document.getElementById(pieceid);
      piece.removeAttribute("draggable");
      var cell = document.getElementById(cellid);
      piece.parentElement.removeChild(piece);
      cell.append(piece);
    }
    
    function dragstart(ev) {
        var target = ev.target;
        if (target.nodeName == "FIGURE") {
          target = target.parentElement;
        }
        ev.dataTransfer.setData("text", target.id);
    }
    
    function dragover(ev) {
        ev.preventDefault();
        var target = ev.target;
        if (target.tagName!=="DIV")
          ev.dataTransfer.dropEffect = "none";
        else {
            if (target.className.match("base"))
                target = target.parentElement;
            if (Game.alreadyPlaced(target.id))
                ev.dataTransfer.dropEffect = "none";
        }
    }

    function dragenter(ev) {
        ev.preventDefault();
        if (ev.target.tagName=="DIV") {
            var target = ev.target;
            if (target.className.match("base"))
                target = target.parentElement;
            if (!Game.alreadyPlaced(target.id))
                target.classList.add("shine");
        } 
    }
    
    function dragleave(ev) {
        ev.preventDefault();
        if (ev.target.tagName=="DIV") {
            var target = ev.target;
            if (target.className.match("base"))
              target = target.parentElement;
            if (!Game.alreadyPlaced(target.id))
                target.classList.remove("shine");
        }
    }
    
    function drop(ev) {
        ev.preventDefault();
        if (ev.target.tagName=="DIV") {
            var target = ev.target;
            if (target.className.match("base"))
              target = target.parentElement;
            if (!Game.alreadyPlaced(target.id)){
                target.classList.remove('shine');
                var data = ev.dataTransfer.getData("text");
                var piece = document.getElementById(data);
                piece.removeAttribute("draggable");
                target.append(piece);
                messagebox.innerHTML = instruction.give;
                socket.emit('placed',{pieceid:data,cellid:target.id,classname:piece.className,room:room});
                Game.update(target.id,piece.className);
                waitzone.addEventListener('click',select);
                waitzone.classList.add('selectable');
            }
        }
    }
    
    function showWin(ids){
        ids.forEach(function(id){
            var piece = document.getElementById('cell'+id);
            piece.classList.add('highlight');
        });
    }
    
    function quarto(ev){
        if (ev.target.id=="quarto"){
            var highlights =Game.quarto();
            if (highlights.length>0){
                showWin(highlights);
                messagebox.innerHTML = instruction.won;
                waitzone.removeEventListener('click',select);
                waitzone.classList.remove('selectable');
                socket.emit('won',{pieceid:highlights,room:room});
                window.setTimeout(function(){
                    overlay.classList.remove('hide');
                    modal.classList.remove('hide');
                    modal.addEventListener('click',replay);
                },3000);
            } else {
                messagebox.innerHTML = instruction.wrong;
                window.setTimeout(function(){
                    messagebox.innerHTML = instruction.give;
                },3000);
            }
        }
    }
    
    socket.on('tell room',function(){
        console.log('tell room');
        socket.emit('room name',{room:room});
    });
    socket.on('wait for other',function(){
        console.log('Created a new game');
        messagebox.innerHTML = instruction.waitforjoin;
    });
    socket.on('ready to start',function(){
        console.log('Game ready to start!');
        overlay.classList.add('hide');
        messagebox.innerHTML = instruction.ready;
    });
    socket.on('room full',function(){
        messagebox.innerHTML = instruction.roomfull;
    });
    socket.on('not exist',function(){
        messagebox.innerHTML = instruction.notexist;
    })
    socket.on('pick one',function(){
        console.log('pick one');
        messagebox.innerHTML = instruction.give;
        waitzone.addEventListener('click',select);
        waitzone.classList.add('selectable');
    });
    socket.on('wait',function(){
        messagebox.innerHTML = instruction.waitformove;
    });
    socket.on('toplace',function(data){
        overlay.classList.add('hide');
        makeDraggable(data.pieceid);
        messagebox.innerHTML = instruction.place;
    });
    socket.on('tochange',function(data){
        movePiece(data.pieceid,data.cellid,data.classname);
    });
    socket.on('otherwon',function(data){
        showWin(data.pieceid);
        messagebox.innerHTML = instruction.lost;
        window.setTimeout(function(){
            overlay.classList.remove('hide');
            modal.classList.remove('hide');
            modal.addEventListener('click',replay);
        },3000);
    });
    socket.on('player left',function(){
        messagebox.innerHTML = instruction.left;
        start();
        overlay.classList.remove('hide');
        window.setTimeout(function(){
            messagebox.innerHTML = instruction.waitforjoin;
        },3000);
    });
    
    waitzone.addEventListener('dragstart',dragstart);
    placezone.addEventListener('dragover',dragover);
    placezone.addEventListener('dragenter',dragenter);
    placezone.addEventListener('dragleave',dragleave);
    placezone.addEventListener('drop',drop);
    messagebox.addEventListener('click',quarto);
    start();
    
})();
