var vows = require('vows'),
    assert = require('assert'),
    fs = require('fs'),
    http = require('http');

var getFeed = function(callback) {
  http.get({ host: 'localhost', port: '8000', path: '/blog/atom' }, function(res) {
    var body = [];
    res.setEncoding('utf8');
    res.on('data', function(chunk) {
      body.push(chunk);
    });
    res.on('end', function() {
      callback(null, body.join(''));
    });
  });
};

vows.describe('Atom Feed').addBatch({
  'when generated': {
    topic: function() {
      getFeed(this.callback);
    },

    'should match results feed': function(err, feed) {
      var expectedFeed = fs.readFileSync(__dirname + '/feedResults.xml');
      assert.equal(expectedFeed, feed);
    }
  }
}).run();
