## Synopsis

This is a project to produce music by using the wikipedia live edit stream at: stream.wikimedia.org. To access the stream **Socket.IO 0.9** protocol is used by installing it with npm. For the music I am using [Matt Davey pure data abstractions](https://github.com/derekxkwan/pure-data-abstractions) and creating different sounds depending on the first ascii character of 'title' received from the real-time Wikipedia edits stream. To communicate and control Pd (Pure Data) [thisconnect/port](https://github.com/thisconnect/port) is used for [netsend] and [netreceive].

For the pd (aka pure data) part i have to thank [Derek Holzer](http://macumbista.net/) for helping me to understand what pd is all about in a very short amount of time. Also thanking Matt Davey for the [DIY patches](https://github.com/derekxkwan/pure-data-abstractions) that help out in pd to create sounds.

In the beginning of the project sonification of the data was the target, but i didn't as of yet reach that level. I will have to learn more about pd to be able to accomplish this.

Information about the wikipedia stream can be found [here](https://www.mediawiki.org/wiki/API:Recent_changes_stream)

## Running

Requirements: That you have an older version (5) of [node](https://nodejs.org/en/) installed! **Don't install the newest one!**

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
