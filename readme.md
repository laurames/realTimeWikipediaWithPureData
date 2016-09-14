## Synopsis

This is a project to produce music by using the wikipedia live edit stream at: stream.wikimedia.org. To access the stream **Socket.IO 0.9** protocol is used by installing it with npm. For the music I am using [Matt Davey pure data abstractions](https://github.com/derekxkwan/pure-data-abstractions) and creating different sounds depending on the first ascii character of 'title' received from the real-time Wikipedia edits stream. To communicate and control Pd (Pure Data) [thisconnect/port](https://github.com/thisconnect/port) is used for [netsend] and [netreceive].

## Running

To get all the packet dependencies navigate to project root and white in console:

```javascript
npm install
```

Then run firs the server.js then the wiki_stream.js:
```javascript
node server.js
node wiki_stream.js
```

## License

Not yet licensed
