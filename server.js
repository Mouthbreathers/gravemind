var app = require('express')(),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    listener = io.of('/listener'),
    gravemind = io.of('/gravemind');

app.get('/listener', function(req, res){
    res.sendFile(__dirname + '/app/public/listener.html');
});

app.get('/', function(req, res){
    res.sendFile(__dirname + '/app/public/mirror.html');
});

listener.on('connection', function(socket){
    console.log('connected!');
    socket.on('voiceCommand', function(command){
        console.log('voice command logged from client: ' + command);
        emitBack(command);
    });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});

function emitBack(msg){
    console.log('sending voice command to the gravemind...');
    gravemind.emit('voiceCommand', msg);
}