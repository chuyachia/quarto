var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var server = require('http').Server(app);
var io = require('socket.io')(server);
var indexRoutes = require('./routes/index.js');
var socket = require('./routes/socket.js');
var path = require('path');
var exphbs = require('express-handlebars');

app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({defaultLayout: 'main', extname: '.hbs',helpers: {
  section: function(name, options){
  if(!this._sections) this._sections = {};
  this._sections[name] = options.fn(this);
  return null;
}}}));
app.set('view engine', '.hbs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/',express.static(path.join(__dirname,"client")));
app.use('/',indexRoutes(io));
socket(io);



server.listen(process.env.PORT || 3000, ()=>{
  var addr = server.address();
  console.log("App listening at port " + addr.port);
});
