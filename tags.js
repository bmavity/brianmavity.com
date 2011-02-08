var fs = require('fs'),
    vm = require('vm');

var it = function(obj, callback) {
  Object.keys(obj).forEach(function(key, i) {
    callback(key, obj[key], i);
  });
};

var merge = function(target, additional) {
  it(additional, function(key, val) {
    target[key] = val;
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
  buffer.push('>\n');
};

var createTags = function(tagNames) {
  var tags = {};
  tagNames.forEach(function(tagName) {
    tags[tagName] = tag.bind({}, tagName);
  });
  return tags;
};

var doc = function() {
  return Array.prototype.slice.call(arguments, 0).map(function(arg) {
    if(Array.isArray(arg)) {
      return arg.join('');
    }
    return arg;
  }).join('');
};

var htmlEncode = function(html) {
  return html.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
};

var openTag = function(name, attributes, buffer) {
  buffer.push('\n<');
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

module.exports.atom = function(fileName, locals, callback) {
  fs.readFile(fileName, function(err, file) {
    var atomTags = createTags(['entry', 'feed', 'link', 'id', 'title', 'subtitle', 'updated', 'author', 'name', 'published', 'content']);
    atomTags.doc = doc;
    atomTags.htmlEncode = htmlEncode;
    merge(atomTags, locals);
    try {
      callback(null, vm.runInNewContext(file, atomTags));
    }
    catch(ex) {
      callback(ex);
    }
  });
};


var html5 = function(fileName, locals, callback) {
  fs.readFile(fileName, function(err, file) {
    var html5Tags = createTags(['a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdo', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'cite', 'code', 'col', 'colgroup', 'command', 'datalist', 'dd', 'del', 'details', 'dfn', 'div', 'dl', 'dt', 'em', 'embed', 'eventsource', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'keygen', 'label', 'legend', 'li', 'link', 'mark', 'map', 'menu', 'meta', 'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'pre', 'progress', 'q', 'ruby', 'rp', 'rt', 'samp', 'script', 'section', 'select', 'small', 'source', 'span', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'ul', 'var', 'video', 'wbr']),
        content,
        placeholder;
    if(typeof locals === 'function') {
      callback = locals;
      locals = {};
    }
    html5Tags.doc = doc;
    html5Tags.htmlEncode = htmlEncode;
    merge(html5Tags, locals);
    try {
      content = vm.runInNewContext(file, html5Tags);
      if(fileName !== __dirname + '/views/layout.js') {
        placeholder = { placeholder: content, cssFiles: [] };
        merge(placeholder, locals);
        html5(__dirname + '/views/layout.js', placeholder, function(err, layout) {
          if(err) {
            callback(err);
            throw err;
          } else {
            callback(null, layout);
          }
        });
      } else {
        callback(null, content);
      }
    }
    catch(ex) {
      callback(ex);
      throw ex;
    }
  });
};

module.exports.html5 = html5;
