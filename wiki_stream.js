'use strict';

var io = require( 'socket.io-client' );
var socket = io.connect( 'https://stream.wikimedia.org/rc' ); //, {'sync disconnect on unload': true }
console.log('check if connected to stream: ', socket.connected);

const net = require('net');

const client = net.connect({port: 3000}, () => {
  // 'connect' listener
  console.log('Connected to server at 3000');
});

socket.on( 'connect', function () {
  console.log('######## Socket connected');
  //socket.emit( 'subscribe', '*' );
  socket.emit( 'subscribe', 'en.wikipedia.org' );
} );

//full RCFeed properties can be found at: https://www.mediawiki.org/wiki/Manual:RCFeed#Properties
socket.on( 'change', function ( data ) {
  console.log( data.title ); // this is the edited title
  //console.log( data.length.new ); // this is the edited length
  const buf = Buffer.from(data.title, 'utf-8');
  client.write(buf);
} );

socket.on('error',function ( data ) {
  console.log('we have an error: ' + error)
} );

socket.on('disconnect', function(){
  console.log('disconnected from stream.wikimedia.org/rc')
});

client.on('data', (data) => {
  console.log(data.toString());
  socket.disconnect();
  client.end();
});

client.on('end', () => {
  console.log('disconnected from server');
});
