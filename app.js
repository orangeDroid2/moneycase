var server = require('http').Server(require('express')()),
    io = require('socket.io')(server),
    redis = require('redis'), redisClient = redis.createClient();


server.listen(7777);

redisClient.subscribe('new.winner');
redisClient.setMaxListeners(0);
redisClient.on("message", function (channel, message) {
    if (channel == 'new.winner') {
        io.sockets.emit(channel, message);
    }
});