var fs = require('fs');
var db = require('./handlers/db.js');
// var handlers = require('./handlers/handle.js');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');

var login = [];
var map = {};

app.use(express.static(__dirname + "/static/"));
app.use(express.static(__dirname + "/static/template/"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/register', function(req, res) {
	req.body.password = req.body.password[0];
	db.add_account(req.body, function(result) {
		if (result) {
			console.log('register successfully');
		} else {
			console.log('register failed');
		}
	});
	res.redirect('/');
});
app.post('/login', function(req, res) {
	db.login(req.body, function(result) {
		if (result) {
			console.log('login successfully');
			login.push(req.body.account);
			fs.readFile(__dirname + '/private/chat.html',function(err, data) {
				if (err) {
					console.log(err);
				} else {
					data = data.toString();
					data = data.replace('<%=account%>', req.body.account);
					res.end(data);
				}
			});
		} else {
			console.log('login failed');
			res.redirect('/');
		}
	})
});
app.get('/',function(req, res) {
	res.writeHead(200, {'contentType': "text/plain"});
	res.end('hello world');
});
io.on('connection', function(socket) {
	console.log('a user connected');
	socket.broadcast.emit('online', JSON.stringify(login));
	socket.emit('online', JSON.stringify(login));
	socket.on('declare', function(account) {
		map[socket.id] = account;
	});

	socket.on('message', function(msg) {
		console.log('message: ' + msg);
		socket.broadcast.emit('message', msg);
	});

	socket.on('disconnect', function() {
		console.log('user disconnected');
		var i = login.indexOf(map[socket.id]);
		login.splice(i, 1);
		delete map[socket.id];
		socket.broadcast.emit('online', JSON.stringify(login));
	});

});
db.init(function(err) {
	if (err) {
		console.log('serve fail');
	} else {
		console.log('open db successfully');
		http.listen(8080, function(){
		  console.log('listening on *:8080');
		});
	}
});