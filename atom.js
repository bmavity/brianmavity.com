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
    feed({ xmlns: 'http://www.w3.org/2005/Atom' },
      link({ rel: 'self', href: 'http://blog.brianmavity.com/blog/atom' }),
      id('tag:brianmavity.com,2008:/blog'),
      title('brianmavity.com'),
      subtitle('Learn with me'),
      link({ href: 'http://blog.brianmavity.com/' }),
      updated(posts[0].publishDate),
      author(
        name('Brian Mavity')
      ),
      posts.map(function(post) {
        return entry(
          title(post.title),
          link({ href: 'http://blog.brianmavity.com/' + post.slug }),
          id(generateUniqueId(post)),
          published(post.publishDate),
          updated(post.publishDate),
          content({ type: 'html' }, post.content.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')),
          author(
            name(post.author)
          )
        )
      }).join('')
    )
  ].join('');
};
