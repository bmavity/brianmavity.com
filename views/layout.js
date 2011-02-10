doc(
  '<!DOCTYPE html>',
  html(
    head(
      meta({ name: 'google-site-verification', content: 'UzvX9X28PSiCcEEZD0ZThXnqibBtUgae7EVaTzwuWPk' }),

      title('Software Development, Interaction Design'),

      link({ rel: 'alternate', href: 'http://feeds.feedburner.com/brianmavitycomblog', type:'application/atom+xml', title: 'brianmavity.com - Atom' }),
    
      css('/css/reset.css'),
      css('/css/vertical-rhythm.css'),
      css('/css/site-layout.css'),
      css('/css/brown.css'),

      cssFiles.map(function(cssFile) {
        return css(cssFile);
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
