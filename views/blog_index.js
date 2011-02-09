doc(
  posts.map(function(post) {
    return h2(
      a({ href: '/' + post.slug }, post.title)
    )
    +
    div({ 'class': 'post' },
      p(post.publishDate + ' by ' + post.author),
      div({ 'class': 'content' }, post.content),
      div({ 'class': 'comments' }, 
        a({ href: 'http://blog.brianmavity.com/' + post.slug + '#disqus_thread' }, 'Comments')
      )
    )
    +
    script(
      function() {
        var disqus_shortname = 'brianmavity';
        (function() {
          var s = document.createElement('script');
          s.async = true;
          s.src = 'http://disqus.com/forums/brianmavity/count.js';
          s.addEventListener('load', function() {
            var links = document.getElementsByTagName("A");
            for(var i = 0; i < links.length; i += 1) {
              if(links[i].href.indexOf("#disqus_thread") >= 0) {
                links[i].href = links[i].href.replace('#disqus_thread', '');
              }
            }
          }, false);
          (document.getElementsByTagName('HEAD')[0] || document.getElementsByTagName('BODY')[0]).appendChild(s);
        }());
      }.toString().replace(/^.*\{/, '').replace(/\}\s*$/, '')     
    )
  })
)
