import Game from './Game.js';
import {polyfill} from "mobile-drag-drop";

// optional import of scroll behaviour
import {scrollBehaviourDragImageTranslateOverride} from "mobile-drag-drop/scroll-behaviour";

// options are optional ;)

(function(){
    var socket = io.connect(window.location.hostname);
    var waitzone = document.getElementById('waitzone');
    var messagebox = document.getElementById('messagebox');
    var info = document.getElementById('info');
    var gameinfo = document.getElementById('gameinfo');
    var overlay = document.getElementById('overlay');
    var placezone = document.getElementById('placezone');
    var askreplay = document.getElementById('askreplay');
    const instruction= {
        waitforjoin:'Waiting for a new player to join the game',
        waitforreplay:'Waiting for the other player to join the game',
        roomfull:'The game that you try to join is full. Please try another game',
        notexist:'The game that you try to join does not exist. Please try another game',
        waitformove:'Waiting for the other player to act',
        ready:'Game ready to start! Waiting for the other player to act',
        give:'Click a piece to give it to the other player or click <em id="quarto">Quarto!</em> here if you think you just made a line',
        place:'Drap the highlighted piece and drop on the desired cell',
        won:"You won!",
        lost:"You lost. The other player just found a Quarto",
        wrong:"No Quarto found with the piece that you just placed...",
        left:"The other player just left"
    };
    var timeouts = [];
    
    function start(){
        Game.start();
        waitzone.classList.remove('selectable');
        waitzone.innerHTML = Game.getAllPieces();
        placezone.innerHTML= Game.getAllCells();
    }
    
    function showgameinfo(){
        gameinfo.classList.remove('hide');
    }
    
    function closegameinfo(ev){
        if(ev.target.className=="close"){
            gameinfo.classList.add('hide');
        }
    }
    
    function showreplay(){
        overlay.classList.remove('hide');
        askreplay.classList.remove('hide');
        askreplay.addEventListener('click',replay);
    }
    
    function replay(ev){
        var target = ev.target;
        if (target.className=="left") {
            start();
            askreplay.classList.add('hide');
            askreplay.removeEventListener('click',replay);
            socket.emit('replay',{room:room,replay:true});
        } else if (target.className=="right") {
            socket.emit('replay',{room:room,replay:false});
            socket.disconnect();
            askreplay.classList.add('hide');
            askreplay.removeEventListener('click',replay);
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
        if (document.title.indexOf("*")===0)
            document.title = document.title.slice(1);
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
        if (target.nodeName == "FIGURE")
          target = target.parentElement;
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
            timeouts.push(window.setTimeout(function(){
                piece.classList.remove('highlight');
            },1000))
            timeouts.push(window.setTimeout(function(){
                piece.classList.add('highlight');
            },2000))
        });
    }
    
    function quarto(ev){
        if (ev.target.id=="quarto"){
            var highlights =Game.quarto();
            if (highlights.length>0){
                if (document.title.indexOf("*")===0)
                    document.title = document.title.slice(1);
                showWin(highlights);
                messagebox.innerHTML = instruction.won;
                waitzone.removeEventListener('click',select);
                waitzone.classList.remove('selectable');
                socket.emit('won',{pieceid:highlights,room:room});
                timeouts.push(window.setTimeout(function(){
                    showreplay();
                },3000));
            } else {
                messagebox.innerHTML = instruction.wrong;
                timeouts.push(window.setTimeout(function(){
                    messagebox.innerHTML = instruction.give;
                },3000));
            }
        }
    }
    
    socket.on('tell room',function(){
        socket.emit('room name',{room:room});
    });
    socket.on('wait for other',function(){
        overlay.classList.remove('hide');
        messagebox.innerHTML = instruction.waitforjoin;
    });
    socket.on('wait for replay',function(){
        timeouts.forEach(clearTimeout);
        messagebox.innerHTML = instruction.waitforreplay;
    });
    socket.on('ready to start',function(){
        start();
        messagebox.innerHTML = instruction.ready;
    });
    socket.on('room full',function(){
        messagebox.innerHTML = instruction.roomfull;
    });
    socket.on('not exist',function(){
        messagebox.innerHTML = instruction.notexist;
    });
    socket.on('pick one',function(){
        if (document.title.indexOf("*")!==0)
            document.title = '*'+document.title;
        overlay.classList.add('hide');
        messagebox.innerHTML = instruction.give;
        waitzone.addEventListener('click',select);
        waitzone.classList.add('selectable');
    });
    socket.on('wait',function(){
        overlay.classList.remove('hide');
        messagebox.innerHTML = instruction.waitformove;
    });
    socket.on('toplace',function(data){
        if (document.title.indexOf("*")!==0)
            document.title = '*'+document.title;
        overlay.classList.add('hide');
        makeDraggable(data.pieceid);
        messagebox.innerHTML = instruction.place;
    });
    socket.on('tochange',function(data){
        movePiece(data.pieceid,data.cellid,data.classname);
    });
    socket.on('otherwon',function(data){
        showWin(data.pieceid);
        if (document.title.indexOf("*")!==0)
            document.title = '*'+document.title;
        messagebox.innerHTML = instruction.lost;
        timeouts.push(window.setTimeout(function(){
            showreplay();
            document.title = document.title.slice(1);
        },3000));
    });
    
    socket.on('player left',function(){
        if (document.title.indexOf("*")!==0)
            document.title = '*'+document.title;
        timeouts.forEach(clearTimeout);
        timeouts=[];
        messagebox.innerHTML = instruction.left;
        overlay.classList.remove('hide');
        timeouts.push(window.setTimeout(function(){
            messagebox.innerHTML = instruction.waitforjoin;
            document.title = document.title.slice(1);
        },3000));
    });
    
    polyfill({
        dragImageTranslateOverride: scrollBehaviourDragImageTranslateOverride
    });
    waitzone.addEventListener('dragstart',dragstart);
    placezone.addEventListener('dragover',dragover);
    placezone.addEventListener('dragenter',dragenter);
    placezone.addEventListener('dragleave',dragleave);
    placezone.addEventListener('drop',drop);
    messagebox.addEventListener('click',quarto);
    info.addEventListener('click',showgameinfo);
    gameinfo.addEventListener('click',closegameinfo);
    start();
    
})();
