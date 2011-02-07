var fs = require('fs'),
    vm = require('vm');

var it = function(obj, callback) {
  Object.keys(obj).forEach(function(key, i) {
    callback(key, obj[key], i);
  });
};

var addAttributes = function(attributes, buffer) {
  it(attributes, function(name, val) {
    buffer.push(' ');
    buffer.push(name);
    buffer.push('="');
    buffer.push(val);
    buffer.push('"');
  });
};

var closeTag = function(name, buffer) {
  buffer.push('</');
  buffer.push(name);
  buffer.push('>');
};

var createTags = function(tagNames) {
  var tags = {};
  tagNames.forEach(function(tagName) {
    tags[tagName] = tag.bind({}, tagName);
  });
  return tags;
};

var doc = function() {
  return Array.prototype.slice.call(arguments, 0).join('');
};

var htmlEncode = function(html) {
  return html.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
};

var openTag = function(name, attributes, buffer) {
  buffer.push('<');
  buffer.push(name);
  addAttributes(attributes, buffer);
  buffer.push('>');
};

var tag = function(name, attributes) {
  var output = [],
      children;
  if(typeof attributes !== 'object' || Array.isArray(attributes)) {
    children = Array.prototype.slice.call(arguments, 1) || []; 
    attributes = {};
  } else {
    children = Array.prototype.slice.call(arguments, 2) || []; 
  }
  openTag(name, attributes, output);
  children.forEach(function(child) {
    if(Array.isArray(child)) {
      output.push(child.join(''));
    } else {
      output.push(child);
    }
  });
  closeTag(name, output);
  return output.join('');
};

module.exports.atom = function(fileName, posts, callback) {
  fs.readFile(fileName, function(err, file) {
    var atomTags = createTags(['entry', 'feed', 'link', 'id', 'title', 'subtitle', 'updated', 'author', 'name', 'published', 'content']);
    atomTags.doc = doc;
    atomTags.htmlEncode = htmlEncode;
    atomTags.posts = posts;
    try {
      callback(null, vm.runInNewContext(file.toString(), atomTags));
    }
    catch(ex) {
      callback(ex);
    }
  });
};
