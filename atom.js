var it = function(obj, callback) {
  Object.keys(obj).forEach(function(key, i) {
    callback(key, obj[key], i);
  });
};

var tag = function(name, attributes, content) {
  var output = [],
      children = Array.prototype.slice.call(arguments, 2) || [];
  output.push('<');
  output.push(name);
  it(attributes, function(name, val) {
    output.push(' ');
    output.push(name);
    output.push('="');
    output.push(val);
    output.push('"');
  });
  output.push('>');
  children.forEach(function(child) {
    output.push(child);
  });
  output.push('</');
  output.push(name);
  output.push('>');
  return output.join('');
};

var generateUniqueId = function(post) {
  return [
    'tag:brianmavity.com,',
    post.publishDate.slice(0, 10),
    ':/blog/',
    post.publishDate.replace(/T|Z|\.|:|-/g, '')
  ].join('');
};

var createFeed = function(posts) {
  return [
    '<?xml version="1.0" encoding="utf-8"?>',
    tag('feed', { xmlns: 'http://www.w3.org/2005/Atom' },
      tag('link', { rel: 'self', href: 'http://blog.brianmavity.com/atom' }),
      tag('id', {}, 'tag:brianmavity.com,2008:/blog'),
      tag('title', {}, 'brianmavity.com'),
      tag('subtitle', {}, 'Learn with me'),
      tag('link', { href: 'http://blog.brianmavity.com/' }),
      tag('updated', {}, posts[0].publishDate),
      tag('author', {},
        tag('name', {}, 'Brian Mavity')
      ),
      posts.map(function(post) {
        return tag('entry', {},
          tag('title', {}, post.title),
          tag('link', { href: 'http://blog.brianmavity.com/' + post.slug }),
          tag('id', {}, generateUniqueId(post)),
          tag('published', {}, post.publishDate),
          tag('updated', {}, post.publishDate),
          tag('content', { type: 'html' }, post.content.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'))
        )
      }).join('')
    )
  ].join('');
};


module.exports.createFeed = createFeed;
