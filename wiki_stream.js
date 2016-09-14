'use strict';

var io = require( 'socket.io-client' );
var socket = io.connect( 'https://stream.wikimedia.org/rc' );

const net = require('net');

const client = net.connect({port: 13001}, () => {
  // 'connect' listener
  console.log('Connected to server at 13001');
});

socket.on( 'connect', function () {
     console.log('######## Socket connected');
     socket.emit( 'subscribe', '*' );
} );

socket.on( 'change', function ( data ) {
    console.log( data.title );
    const buf = Buffer.from(data.title, 'utf-8');
    client.write(buf);
} );

client.on('data', (data) => {
  console.log(data.toString());
  client.end();
});

client.on('end', () => {
  console.log('disconnected from server');
});
