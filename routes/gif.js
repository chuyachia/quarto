var express = require('express');
var axios = require('axios');
var routes = express.Router();

routes.get("/trending", function(req,res){
    var apiurl = "https://api.tenor.com/v1/trending";
    var params = {
        key:process.env.TENOR_KEY,
        locale:"en_US"        
    };
    if (req.query.pos>0)
        params['pos'] = req.query.pos;
    axios.get(apiurl,{
        params:params
    }).then(function(results){
        res.json(results.data);
    }).catch(function(err){
        res.json('Gif search error');
    });
});

routes.get("/search", function(req,res){
    var apiurl = "https://api.tenor.com/v1/search";
    var params = {
        q:req.query.term,
        key:process.env.TENOR_KEY,
        locale:"en_US"        
    };
    if (req.query.pos>0)
        params['pos'] = req.query.pos;
    axios.get(apiurl,{
        params:params
    }).then(function(results){
        res.json(results.data);
    }).catch(function(err){
        res.json('Gif search error');
    });
});

module.exports= routes;