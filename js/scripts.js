(function() {
  // See http://socket.io/
  var socket = io.connect('https://stream.wikimedia.org/rc');

  var feedNode = document.getElementById('feed'); //where the feed is printed
  var rateMinNode = document.getElementById('rate-min'); //rate of feed edits/min
  var rateAvgNode = document.getElementById('rate-avg'); //the average rate over time
  var errorNode = document.createElement('div'); //if there is an error we see it
  errorNode.className = 'alert alert-danger';
  var updateBuffer = makeDisplayBuffer(10);
  var freq;
  printEvent({
    type: 'info',
    'message': 'Subscribed! Waiting...'
  });
  socket.on('connect', function() {
    freq = new Frequency(1000, function (count, average) {
      rateMinNode.textContent = count;
      rateAvgNode.textContent = average;
    });
    // Subscribe to one or more wikis
    // See https://wikitech.wikimedia.org/wiki/RCStream
    socket.emit('subscribe', '*');
  });

  socket.on('change', function(rc) {
    if (freq) {
      freq.add(1);
    }
    // See https://www.mediawiki.org/wiki/Manual:RCFeed#Properties
    if (rc.type == 'edit') {
      printEvent({
        type: 'rc',
        data: rc
      });
    }
  });

  socket.on('error', function(data) {
    printEvent({
      type: 'error',
      data: data
    });
  });

  function printEvent(event) {
    var node;
    if (event.type === 'rc') {
      var node = document.createTextNode(JSON.stringify(event.data) + '\n\n');
      $(feedNode).prepend(node);
      updateBuffer(node);
    } else if (event.type === 'error') {
      $(errorNode).empty().text(JSON.stringify(event.data));
      if (!errorNode.parentNode) {
        $(feedNode).before(errorNode);
      }
    } else if (event.type === 'info') {
      node = $('<div>').addClass('alert alert-info').text(event.message).get(0);
      $(feedNode).prepend(node);
      updateBuffer(node);
    }
  }

  function makeDisplayBuffer(size) {
    var buffer = [];
    return function (element) {
      buffer.push(element);
      if (buffer.length > size) {
        var popped = buffer.shift();
        popped.parentNode.removeChild(popped);
      }
    }
  }

}());



function Frequency(interval, callback) {
  this.interval = interval;
  this.callback = callback;
  this.count = 0;
  this.total = 0;
  this.since = this.start = this.now();
}
Frequency.prototype.now = ( function () {
  var perf = window.performance;
  return perf.now ?
    function () { return perf.now(); } :
    function () { return +new Date(); };
}() );
Frequency.prototype.add = function (count) {
  this.count += count;
  this.total += count;
  this.check();
};
Frequency.prototype.check = function () {
  var count, avg, ellapsedTotal;
  var ellapsed = this.now() - this.since;
  if (ellapsed >= this.interval) {
    ellapsedTotal = this.now() - this.start;
    count = this.count;
    avg = Math.round(this.total / (ellapsedTotal / this.interval));
    this.since = this.now();
    this.count = 0;
    this.callback(count, avg);
  }
};
