module.exports = function(io,activeRooms){
  var express = require('express');
  var routes = express.Router();
  var querystring = require('querystring');
  
  function validateRoomName(str){
    if (str.match(/[A-Za-z0-9]+/)[0]==str){
      return str;
    } else {
      return null;
    }
  }


  routes.get('/', function(req, res) {
    res.render('index');
  });
  
  routes.get('/game/:room', function(req, res) {
    if (req.params.room in activeRooms)
      res.render('game',{room:req.params.room});
    else
      res.redirect('/');
  });
  
  routes.post('/join',(req,res)=>{
    var roomname = validateRoomName(req.body.roomname);
    if (roomname) {
      io.in(roomname).clients((err, clients) =>{
        if (clients.length===0) {
          res.render('index',{joinerror:'No game found with the given name'});
        } else if (clients.length===1) {
          res.redirect('/game/'+roomname);
        } else {
            res.render('index',{joinerror:'The game that you tried to join is already full'});
        }
      });
    } else {
      res.render('index',{joinerror:'Please enter a valid game name with only English letters and numbers without whitespace'});
    }
  });
  
  routes.post('/create',(req,res)=>{
    var roomname = validateRoomName(req.body.roomname);
    if (roomname) {
      io.in(roomname).clients((err, clients) =>{
        if (clients.length===0) {
          activeRooms[roomname] = [];
          res.redirect('/game/'+roomname);
        } else {
          res.render('index',{createerror:'The game name is already used'});
        }
      });
    } else {
      res.render('index',{createerror:'Please enter a valid game name with only English letters and numbers without whitespace'});
    }
  });
  return routes;
    
};