var Game = function(){
    const type = [
    "cylinder hole light",
    "cylinder hole dark",
    "cube hole light",
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
    
    var cubeTemplate = Handlebars.compile(document.getElementById('cubeTemplate').innerHTML);
    var cylinderTemplate = Handlebars.compile(document.getElementById('cylinderTemplate').innerHTML);
    
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
    
    return {
        getAllPieces:getAllPieces
    };
};

export default Game();