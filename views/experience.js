function highlight(header, description) {
  return [
    h3(header),
    p(description)
  ];
}

function position(positionData) {
  return div({ 'class': 'position' },
    h3(positionData.name),
    p({ 'class': 'date-range' }, positionData.dateRange),
    positionData.activities.map(function(activity) {
      return p({ 'class': 'activity' }, activity.activity)
      + p({ 'class': 'activity-detail' }, activity.detail);
    })
  );
}

doc(
  css('/css/experience.css'),

  div({ 'class': 'experience' },
    h1('Experience'),
    
    p([
      'Come on in and take a peek. If you need an energetic software developer, see what I\'ve done in the past',
      ' find out what will be possible in the future.'
    ]),
      
    div({ id: 'highlights' },
      h2('Highlights'),
      
      highlight(
        'Microsoft .NET Technologies',
        'Developed applications in C# with .NET Framework versions 1.1 - 3.5, ASP.NET, WCF and .asmx web services,'
      + ' the ASP.NET Ajax JavaScript library, Linq to SQL, and ADO.NET.'
      ),
      
      highlight(
        'Leadership',
        'Mentored teammates and gave periodic presentations to introduce the team to more effective techniques and'
      + ' technologies. Organized team book club, fostering a learning environment and resulting in improved code'
      + ' quality. Created an internal team blog to help spread knowledge across the company.'
      ),
      
      highlight(
        'JavaScript',
        'Developed rich, browser based experiences using jQuery, MochiKit, and script.aculo.us libraries, ajax,'
      + ' object oriented JavaScript, and unobtrusive JavaScript techniques.'
      ),
      
      highlight(
        'Object Oriented Design',
        'Designed maintainable solutions, focusing on encapsulation, adhering to the SOLID principles, and'
      + ' favoring composition over inheritance. Incorporated design patterns and Domain Driven Design when'
      + ' applicable. Effectively used tools, including StructureMap Inversion of Control container to implement'
      + ' design and AutoMapper to eliminate repetitive code and reduce the size of the code base.'
      ),
      
      highlight(
        'Agile Environment',
        'Pioneered agile adoption with grassroots effort to introduce iterative development, behavior driven'
      + ' development, test driven development, and continuous integration. Was included on pilot scrum'
      + ' team and assisted in creation and prioritization of user stories.'
      ),
      
      highlight(
        'Interaction Design',
        'Created powerful and satisfying products using user goals to drive functionality and behavior.'
      + ' Turned user interface complexity into simplicity by distilling essential information gathered'
      + ' from extensive interviews with customers, customer proxies, and business analysts.'
      ),
      
      highlight(
        'Web Design',
        'Designed and implemented cross browser compatible web layouts using html and css.'
      ),
      
      highlight(
        'Healthcare',
        'Knowledge of hospital revenue cycle including access, billing, claims processing, managed care'
      + ' contracts, OPPS and DRGs. Also familiar with core compliance concepts encompassing CDM and service costing.'
      )
    ),

    div({ id: 'details' },
      h2('Details'),

      position({
        name: 'Senior Software Engineer',
        dateRange: 'Jul 2008 - Feb 2010',
        activities: [{
          activity: 'Designed maintainable architecture of code base',
          detail: 'and collaborated with teammates to ensure that there was full understanding of architectural decisions and to receive real time feedback on potential design faults.'
        }, {
          activity: 'Architected and implemented a JavaScript composite user interface',
          detail: 'coordinating the interactions of multiple autonomous components while simultaneously retaining the maintainability of the source code.'
        }]
      }),

      position({
        name: 'Senior Software Developer',
        dateRange: 'Apr 2007 - Jun 2008',
        activities: [{
          activity: 'Designed, architected, developed, and deployed product',
          detail: 'meeting an aggressive, trade show driven deadline by collaborating closely with product owner to distill product to essential functionality while also maintaining high code quality with unit tests written using test driven deveopment.'
        }, {
          activity: 'Used NHibernate O/RM for data access',
          detail: 'gaining improved productivity, quality and maintainability over using raw ADO.NET.'
        }, {
          activity: 'Incorporated the Passive View design pattern',
          detail: 'to improve the quality and maintainability of user interface code and to overcome the lack of testability inherent in WebForms.'
        }, {
          activity: 'Architected solution for pluggable framework',
          detail: 'using the StructureMap Inversion of Control Container to configure client specific implementations of algorithms.'
        }]
      }),

      position({
        name: 'Software Developer',
        dateRange: 'Sep 2004 - Mar 2007',
        activities: [{
          activity: 'Wrote stored procedures and queries and designed database schemas',
          detail: 'for SQL Servers 2005 and 2000.'
        }, {
          activity: 'Used Ajax.NET component',
          detail: 'to enable ajax functionality in products before ASP.NET Ajax or WCF json endpoints were available.'
        }, {
          activity: 'Wrote C# code to interop',
          detail: 'with legacy COBOL application'
        }]
      })
    )
  )
)
