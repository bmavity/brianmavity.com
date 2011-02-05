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

var openTag = function(name, attributes, buffer) {
  buffer.push('<');
  buffer.push(name);
  addAttributes(attributes, buffer);
  buffer.push('>');
};

var closeTag = function(name, buffer) {
  buffer.push('</');
  buffer.push(name);
  buffer.push('>');
};

var tag = function(name, attributes) {
  var output = [],
      children;
  if(typeof attributes !== 'object') {
    children = Array.prototype.slice.call(arguments, 1) || []; 
    attributes = {};
  } else {
    children = Array.prototype.slice.call(arguments, 2) || []; 
  }
  openTag(name, attributes, output);
  children.forEach(function(child) {
    output.push(child);
  });
  closeTag(name, output);
  return output.join('');
};

var createTags = function(tagNames) {
  var tags = {};
  tagNames.forEach(function(tagName) {
    tags[tagName] = tag.bind({}, tagName);
  });
  return tags;
};


module.exports.createTags = createTags;
