// use Game.checkPlaced to decide whether base shine and allow drop
import Game from './Game.js';
(function(){
    var socket = io.connect('https://quarto-game-ccyqc.c9users.io/');
    var waitzone = document.getElementById('waitzone');
    var messagebox = document.getElementById('messagebox');
    var overlay = document.getElementById('overlay');
    var placezone = document.getElementById('placezone');
    const instruction= {
        waitforjoin:'Waiting for another player to join the game',
        roomfull:'The game that you try to join is full. Please try another game',
        notexist:'The game that you try to join does not exist. Please try another game',
        waitformove:'Waiting for the other player to act',
        ready:'Game ready to start! Waiting for the other player to act',
        give:'Click a piece to give it to the other player or click <em id="quarto">Quarto!</em> if you think you just made a line.',
        place:'Drap the highlighted piece and drop on the desired cell.',
        won:"You won!",
        lost:"The other player just found a quarto. You lost...",
        wrong:"No Quarto found with the piece that you just placed..."
    };
    function click(ev){
        var target = ev.target;
        if (target.nodeName=="FIGURE")
            target = target.parentElement;
        target.setAttribute('draggable','true');
        waitzone.removeEventListener('click',click);
        waitzone.classList.remove('selectable');
        socket.emit('given',{pieceid:target.id,roomname:room});
        messagebox.innerHTML = instruction.waitformove;
        overlay.classList.remove('hide');
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
        if (target.tagName!=="DIV"||(target.className.match("stage")&&target.children.length > 1))
          ev.dataTransfer.dropEffect = "none";
    }

    function dragenter(ev) {
        ev.preventDefault();
        if (ev.target.tagName=="DIV") {
          var target = ev.target;
          if (!target.className.match("base"))
            target = target.children[0];
            if (target.parentElement.children.length === 1) {
                target.classList.add("shine");
            }
        } 
    }
    
    function dragleave(ev) {
        ev.preventDefault();
        if (ev.target.tagName=="DIV") {
            var target = ev.target;
            if (!target.className.match("base"))
              target = target.children[0];
            if (target.parentElement.children.length === 1) {
                target.classList.remove("shine");
            }
        }
    }
    
    function drop(ev) {
        ev.preventDefault();
        if (ev.target.tagName=="DIV") {
            if (ev.target.children.length <= 1) {
              var target = ev.target;
              if (!target.className.match("stage")) {
                target = target.parentElement;
              }
              target.children[0].classList.remove('shine');
              var data = ev.dataTransfer.getData("text");
              if (document.getElementById(data)) {
                var piece = document.getElementById(data);
                piece.removeAttribute("draggable");
                target.append(piece);
                messagebox.innerHTML = instruction.give;
                socket.emit('placed',{pieceid:data,cellid:target.id,classname:piece.className,roomname:room});
                Game.update(target.id,piece.className);
                waitzone.addEventListener('click',click);
                waitzone.classList.add('selectable');
              }
            }
        }
    }
    
    function showWin(ids){
        ids.forEach(function(id){
            var piece = document.getElementById('cell'+id);
            piece.classList.add('highlight');
        });
        socket.emit('won',{pieceid:ids,roomname:room});
    }
    
    function quarto(ev){
        if (ev.target.id=="quarto"){
            var highlights =Game.quarto();
            console.log(highlights);
            if (highlights.length>0){
                showWin(highlights);
                messagebox.innerHTML = instruction.won;
            } else {
                messagebox.innerHTML = instruction.wrong;
            }
        }
    }
    
    socket.on('tell room',function(){
        console.log('tell room');
        socket.emit('room name',{room:room});
    });
    socket.on('new room created',function(){
        console.log('Created a new game');
        messagebox.innerHTML = instruction.waitforjoin;
    });
    socket.on('new player joined',function(){
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
        waitzone.addEventListener('click',click);
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
        showWin(data.piece.id);
        messagebox.innerHTML = instruction.lost;
    });
    socket.on('player left',function(){
        console.log('the other user just left');
    });
    waitzone.innerHTML = Game.getAllPieces();
    waitzone.addEventListener('dragstart',dragstart);
    placezone.addEventListener('dragover',dragover);
    placezone.addEventListener('dragenter',dragenter);
    placezone.addEventListener('dragleave',dragleave);
    placezone.addEventListener('drop',drop);
    messagebox.addEventListener('click',quarto);
    

})();
