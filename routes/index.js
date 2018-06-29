module.exports = function(io){
  var express = require('express');
  var routes = express.Router();
  var querystring = require('querystring');
  
  routes.get('/', function(req, res) {
    res.render('index');
  });
  routes.get('/game/:room', function(req, res) {
    res.render('game',{room:req.params.room});
  });
  
  routes.post('/join',(req,res)=>{
    io.in(req.body.roomname).clients((err, clients) =>{
      if (clients.length===0) {
        res.render('index',{error:'No game found with the given name'});
      } else if (clients.length===1) {
        res.redirect('/game/'+req.body.roomname);
      } else {
          res.render('index',{error:'The game that you are looking for is already full'});
      }
    });
  });
  
  routes.post('/create',(req,res)=>{
    io.in(req.body.roomname).clients((err, clients) =>{
      if (clients.length===0) {
        res.redirect('/game/'+req.body.roomname);
      } else {
        res.render('index',{error:'The game name is already used'});
      }
    });
  });
  return routes;
    
};