doc(
  '<!DOCTYPE html>',
  html(
    head(
      title('Software Development, Interaction Design'),

      link({ rel: 'alternate', href: 'http://feeds.feedburner.com/brianmavitycomblog', type:'application/atom+xml', title: 'brianmavity.com - Atom' }),
    
      link({ rel: 'stylesheet', href: '/css/reset.css', type: 'text/css', media: 'screen' }),
      link({ rel: 'stylesheet', href: '/css/vertical-rhythm.css', type: 'text/css', media: 'screen' }),
      link({ rel: 'stylesheet', href: '/css/site-layout.css', type: 'text/css', media: 'screen' }),
      link({ rel: 'stylesheet', href: '/css/brown.css', type: 'text/css', media: 'screen' }),

      cssFiles.map(function(cssFile) {
        return link({ rel: 'stylesheet', href: cssFile, type: 'text/css', media: 'screen' });
      }),

      body(
        div({ id: 'content' },
          div({ id: 'header' },
            div({ id: 'logo' },
              a({ href: context.main + '/' }, 'brianmavity.com'),
              p('software development'),
              p('interaction design')
            ),
            div({ id: 'links' },
              ul(
                li(a({ href: context.main + '/'}, 'home')),
                li(a({ href: context.blog + '/'}, 'blog')),
                li(a({ href: context.main + '/experience'}, 'experience')),
                li(a({ href: context.main + '/contact'}, 'contact'))
              )
            ),
            div({ id: 'swooshie' }, div())
          ),
          div({ id: 'main' }, placeholder),
          div({ id: 'footer' }, '&copy;2008-2011 Brian Mavity')
        ),
        script(
          function() {
            var _gaq = [
              ['_setAccount', 'UA-5334833-1'],
              ['_setDomainName', '.brianmavity.com'],
              ['_setAllowHash', false],
              ['_trackPageview']
            ];
            (function(d, t) {
              var g = d.createElement(t),
              s = d.getElementsByTagName(t)[0];
              g.async = true;
              g.src = '//www.google-analytics.com/ga.js';
              s.parentNode.insertBefore(g, s);
            })(document, 'script');
          }.toString().replace(/^.*\{/, '').replace(/\}\s*$/, '')
        )
      )
    )
  )
)
