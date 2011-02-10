doc(
  css('/css/blog.css'),
 
  h1(post.title),

  div({ 'class': 'post' },
    p(post.publishDate + ' by ' + post.author),
    div({ 'class': 'content' }, post.content),
    div({ 'class': 'comments' },
      div({ id: 'disqus_thread' }),
      script(function() {
        (function() {
          var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
          dsq.src = 'http://brianmavity.disqus.com/embed.js';
          (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
        })();
        }.toString().replace(/^.*\{/, '').replace(/\}\s*$/, '')
      ),
      noscript(
        'Please enable JavaScript to view the',
        a({ href: 'http://disqus.com/?ref_noscript=brianmavity' }),
        'comments powered by Disqus.'
      ),
        
      a({ 'class': 'dsq-brlink', href: 'http://disqus.com' },
        'blog comments powered by',
        span({ 'class': 'logo-disqus' }, 'Disqus')
      )
    )
  )
)
