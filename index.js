var io = require('socket.io').listen(3000);
var os = require('os');

function getMemoryUsage() {
	return {'total': os.totalmem(), 'free': os.freemem()}
}

// hopefully, every second this sends some memory
// telemetry every second to the dashboard
io.sockets.on('connection', function onConnection(socket) {
	setInterval(function sendMemoryUsage() {
		console.log('sending data');
		io.sockets.emit('ping', getMemoryUsage());
	}, 1000);
});
