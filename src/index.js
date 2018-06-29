import Game from './Game.js';
(function(){
    var socket = io.connect('https://quarto-game-ccyqc.c9users.io/');
    var waitzone = document.getElementById('waitzone');
    var messagebox = document.getElementById('messagebox');
    var overlay = document.getElementById('overlay');
    var placezone = document.getElementById('placezone');
    const instruction= {
        waitforjoin:'Waiting for another player to join the game',
        waitformove:'Waiting for the other player to act',
        ready:'Game ready to start! Waiting for the other player to act',
        give:'Click a piece to give it to the other player or click <em class="quarto">Quarto!</em> if you think you just made a line.',
        place:'Drap the highlighted piece and drop on the desired cell.'
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
    
    function movePiece(pieceid,cellid){
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
        if (ev.target.tagName!=="DIV"||ev.target.children.length !== 1) {
          ev.dataTransfer.dropEffect = "none";
        }
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
                document.getElementById(data).removeAttribute("draggable");
                target.append(document.getElementById(data));
                messagebox.innerHTML = instruction.give;
                socket.emit('placed',{pieceid:data,cellid:target.id,roomname:room});
                waitzone.addEventListener('click',click);
                waitzone.classList.add('selectable');
              }
            }
        }
    }
    socket.on('tell room',function(){
        console.log('tell room');
        socket.emit('room name',{room:room});
    });
    socket.on('new room created',function(){
        console.log('Created a new game');
    });
    socket.on('new player joined',function(){
        console.log('Game ready to start!');
        overlay.classList.add('hide');
        messagebox.innerHTML = instruction.ready;
    });
    socket.on('pick one',function(){
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
        movePiece(data.pieceid,data.cellid)
        //place data.pieceid on the board
    })
    waitzone.innerHTML = Game.getAllPieces();
    waitzone.addEventListener('dragstart',dragstart);
    placezone.addEventListener('dragover',dragover);
    placezone.addEventListener('dragenter',dragenter);
    placezone.addEventListener('dragleave',dragleave);
    placezone.addEventListener('drop',drop);
    messagebox.innerHTML = instruction.waitforjoin;

})();
