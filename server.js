var express = require('express');
var app = express();
var dotenv= require('dotenv');
var bodyParser = require('body-parser');
var server = require('http').Server(app);
var io = require('socket.io')(server);
var indexRoutes = require('./routes/index.js');
var gifRoutes = require('./routes/gif.js');
var socket = require('./routes/socket.js');
var path = require('path');
var exphbs = require('express-handlebars');

dotenv.config();

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
var activeRooms = {};
app.use('/',indexRoutes(io,activeRooms));
app.use('/gif',gifRoutes);
socket(io,activeRooms);



server.listen(process.env.PORT || 3000, ()=>{
  var addr = server.address();
  console.log("App listening at port " + addr.port);
});
