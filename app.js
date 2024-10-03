require("dotenv").config();
var createError = require('http-errors');
var express = require('express');
const http = require('http');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const socketIo = require('socket.io');
const TCPService = require('./services/tcp_server.service');
const WebSocketService = require('./services/websocket.service');
const DataController = require("./controllers/data.controller");

var indexRouter = require('./routes/index');

var app = express();
const server = http.createServer(app);
const io = socketIo(server);
const APP_PORT = process.env.APP_PORT || 3000;
const CAMERA_PORT=  process.env.CAMERA_PORT || 8010;
const WEBSOCKET_PORT= process.env.WEB_SOCK_PORT || 9010;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

const tcpService = new TCPService(CAMERA_PORT);
const wsService = new WebSocketService(WEBSOCKET_PORT);
new DataController(tcpService, io, wsService);
tcpService.listen();

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


server.listen(APP_PORT, (error) =>{ 
	if(!error) 
		console.log("Server is Successfully Running, and App is listening on port "+ APP_PORT) 
	else
		console.log("Error occurred, server can't start", error); 
	} 
); 

// module.exports = app;
