var express = require('express'),
	app = express(),
	http = require("http").Server(app),
	io = require('socket.io')(http),
	fs = require('fs');

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket){

	socket.on('join', function(username, room){

		socket.username = username;
		
		socket.join(room);
		socket.room = room;

		socket.emit('joined', socket.username);

	});

	socket.on("enter chat", function(){
		io.to(socket.room).emit('entered chat', socket.username, socket.room);
	});

	socket.on('chat message', function(msg){
		io.to(socket.room).emit('chat message', [socket.avatar, socket.username, msg]);
	});

	socket.on('get avatars', function(){

		fs.readdir(__dirname + '/public/img/avatars', function(err, files){

			if(!err){
				socket.emit('avatar list', files);
			}

		});

	});

	socket.on('avatar selected', function(fileName){

		socket.avatar = fileName;

		socket.emit("set avatar", socket.avatar);

	});

});

http.listen(8080, function(){
	console.log('listening on *:8080');
});