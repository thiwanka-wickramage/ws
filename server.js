var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(8080);
// WARNING: app.listen(80) will NOT work here!

app.get('/', function (req, res) {
    res.status(200).send('Welcome to the Socket Server!');
});

app.get('/client', function (req, res) {
    res.sendFile(__dirname + '/client.html');
});

io.on('connection', function (socket) {
    // console.log(socket.id);
    io.sockets.emit('news', {
        data: 'connected :' + socket.id
    });
    io.sockets.emit('other', {
        data: 'connected :' + socket.id
    });
    socket.on('my other event', function (data) {
        console.log(data);
    });

    socket.on('news', function (data) {
        console.log(data);
        io.sockets.emit('news', {
            data: data.val
        });
    });

    socket.on('other', function (data) {
        console.log(data);
        io.sockets.emit('other', {
            data: data.val
        });
    });

    socket.on('disconnect', function () {
        console.log('disconnected : ' + socket.id);
        socket.disconnect();
        io.sockets.emit('disconnect', {
            data: socket.id
        });
    });
});