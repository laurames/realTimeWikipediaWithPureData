var net = require('net');
var port = require('port');

// port setup
var pd = port({
	'read': 8005, // [netsend]
	'write': 8006, // [netreceive]
	'flags': {
		'noprefs': true, // '-stderr', '-nogui',
		'open': 'wikiConnect.pd'
	}
})
.on('stderr', function(buffer){
	console.log(buffer.toString());
})
.create();

var HOST = '127.0.0.1';
var PORT = 3000;

// Create a server instance, and chain the listen function to it
// The function passed to net.createServer() becomes the event handler for the 'connection' event
// The sock object the callback function receives UNIQUE for each connection
net.createServer(function(sock) {

  // We have a connection - a socket object is assigned to the connection automatically
  console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);

  // Add a 'data' event handler to this instance of socket
  sock.on('data', function(data) {
    console.log(data.toString('utf-8'));
    pd.write('a message to pd;\n');
  });

  // Add a 'close' event handler to this instance of socket
  sock.on('close', function(data) {
    console.log('CLOSED: ' + sock.remoteAddress +' '+ sock.remotePort);
  });

  sock.on('error', function(data) {
    console.log('error has accured');
  });

}).listen(PORT, HOST);

console.log('Server listening on ' + HOST +':'+ PORT);
