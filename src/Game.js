import cubeTemplate from './templates/cube.hbs';
import cylinderTemplate from './templates/cylinder.hbs';
import cellTemplate from './templates/cell.hbs';

var Game = function(){
    const type = [
    "cylinder hole",
    "cylinder hole dark",
    "cube hole",
    "cube hole dark",
    "cylinder hole short",
    "cylinder hole short dark",
    "cube hole short",
    "cube hole short dark",
    "cylinder",
    "cylinder dark",
    "cube",
    "cube dark",
    "cylinder short",
    "cylinder short dark",
    "cube short",
    "cube short dark"];
    
    var lastPosition;
    var placed;
    var cylinder;
    var hole;
    var dark;
    var short;
    
    function flatten(arr) {
        return arr = [].concat.apply([], arr);
    }
    function idToPosition(id){
      var position={};
      position['row'] =Math.floor(id/4);
      position['col'] = id%4;
      return position;
    }
    
    function positionToId(position){
      return position[0]*4+position[1];
    }
    
    
    function getAllPieces(){
        var pieces = type.reduce(function(acc,cur, i) {
            if (cur.match("cube")) {
                return acc+cubeTemplate({class:cur,id:i});
            } else {
                return acc+cylinderTemplate({class:cur,id:i});
            }
        },'');
        return pieces;
    }
    
    function getAllCells(){
        var rows='';
        for (var i = 0;i<4;i++){
            var cells='';
            for (var j = 0;j<4;j++){
                cells+=cellTemplate({id:i*4+j});
            }
            rows+='<tr>'+cells+'</tr>';
        }
        return rows;
    }
    
    function update(cellid,classname){
        var id = Number(cellid.slice(4));
        var position = idToPosition(id);
        lastPosition = position;
        placed[position.row][position.col] = 1;
        if (classname.match('cylinder')) 
            cylinder[position.row][position.col] = 1;
        if (classname.match('hole'))
            hole[position.row][position.col] = 1;
        if (classname.match('dark')) 
            dark[position.row][position.col] = 1;
        if (classname.match('short')) 
            short[position.row][position.col] = 1;
    }
    
    function alreadyPlaced(cellid){
        var id = Number(cellid.slice(4));
        var position = idToPosition(id);
        return placed[position.row][position.col] ==1;
    }
    
    function checkQuarto(position,matrix){
        return position.filter(function(indx){
            var sum = indx.reduce(function(acc,cur){return acc+matrix[cur[0]][cur[1]]},0);//[[],[],[],[]]
            return sum==0||sum==4;
        });
    }
    
    function quarto(){
        if (lastPosition) {
            var quarto=[];
            var horizindx = [[lastPosition['row'],0],[lastPosition['row'],1],[lastPosition['row'],2],[lastPosition['row'],3]];
            var horizsum = horizindx.reduce(function(acc,cur){return acc+placed[cur[0]][cur[1]]},0);
            if (horizsum===4)
                quarto.push(horizindx);
            var vertindx = [[0,lastPosition['col']],[1,lastPosition['col']],[2,lastPosition['col']],[3,lastPosition['col']]];
            var vertsum = vertindx.reduce(function(acc,cur){return acc+placed[cur[0]][cur[1]]},0);
            if (vertsum===4)
                quarto.push(vertindx);
            if (lastPosition['col']===lastPosition['row']){
                var diagindx = [[0,0],[1,1],[2,2],[3,3]];
                var diagsum = diagindx.reduce(function(acc,cur){return acc+placed[cur[0]][cur[1]]},0);
                if (diagsum===4)
                  quarto.push(diagindx);
            }
            if (lastPosition['col']+lastPosition['row']===3){
                var offdiagindx = [[0,3],[1,2],[2,1],[3,0]];
                var offdiagsum = offdiagindx.reduce(function(acc,cur){return acc+placed[cur[0]][cur[1]]},0);
                if (offdiagsum===4)
                  quarto.push(offdiagindx);
            }
    
            var highlights =  [cylinder,hole,dark,short].map(function(m){
                return checkQuarto.apply(null,[quarto,m]);
            });
            
            highlights = highlights.filter(function(t){return t.length>0});
            highlights = flatten(flatten(highlights));
            highlights = highlights.map(function(pos){return positionToId(pos)}).filter(function(val,ind,arr){
                return arr.indexOf(val) ===ind;
            });
            
            return highlights;
        } else {
            return [];
        }
    }
    
    function start(){
        lastPosition=null;
        placed = Array.apply(null, Array(4)).map(function(){return [0,0,0,0]});
        cylinder = Array.apply(null, Array(4)).map(function(){return [0,0,0,0]});
        hole = Array.apply(null, Array(4)).map(function(){return [0,0,0,0]});
        dark = Array.apply(null, Array(4)).map(function(){return [0,0,0,0]});
        short = Array.apply(null, Array(4)).map(function(){return [0,0,0,0]});
        
    }

    return {
        start:start,
        getAllPieces:getAllPieces,
        getAllCells:getAllCells,
        update:update,
        alreadyPlaced:alreadyPlaced,
        quarto:quarto
    };
};

export default Game();