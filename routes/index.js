// record existing room and prevent user from creating room from url and clean rooms regularly
module.exports = function(io,activeRooms){
  var express = require('express');
  var routes = express.Router();
  var querystring = require('querystring');

  routes.get('/', function(req, res) {
    res.render('index');
  });
  
  routes.get('/game/:room', function(req, res) {
    console.log(activeRooms);
    if (req.params.room in activeRooms)
      res.render('game',{room:req.params.room});
    else
      res.send('error');
  });
  
  routes.post('/join',(req,res)=>{
    io.in(req.body.roomname).clients((err, clients) =>{
      if (clients.length===0) {
        res.render('index',{joinerror:'No game found with the given name'});
      } else if (clients.length===1) {
        res.redirect('/game/'+req.body.roomname);
      } else {
          res.render('index',{joinerror:'The game that you tried to join is already full'});
      }
    });
  });
  
  routes.post('/create',(req,res)=>{
    io.in(req.body.roomname).clients((err, clients) =>{
      if (clients.length===0) {
        activeRooms[req.body.roomname] = [];
        res.redirect('/game/'+req.body.roomname);
      } else {
        res.render('index',{createerror:'The game name is already used'});
      }
    });
  });
  return routes;
    
};