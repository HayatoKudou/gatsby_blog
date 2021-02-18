module.exports = {
    pathPrefix: '',
    siteUrl: 'https://kudohayatoblog.com',
    siteTitle: '駆け出しエンジニアの開発ブログ',
    siteDescription: 'WEBエンジニアのブログ',
    author: 'Hayato Kudo',
    postsForArchivePage: 3,
    defaultLanguage: 'en',
    disqusScript: process.env.DISQUS_SCRIPT || 'https://rolwinreevan.disqus.com/embed.js',
    pages: {
      home: '/',
      blog: 'blog',
      contact: 'contact',
      resume: 'resume',
      tag: 'tags',
    },
    social: {
      github: 'https://github.com/HayatoKudou',
      twitter: 'https://twitter.com/metalic_kudo_h',
      qiita: 'https://qiita.com/metal_kentucky',
      rss: '/rss.xml',
    },
    contactFormUrl: process.env.CONTACT_FORM_ENDPOINT || 'https://getform.io/f/09a3066f-c638-40db-ad59-05e4ed71e451',
    googleAnalyticTrackingId: process.env.GA_TRACKING_ID || '',
    tags: {
      javascript: {
        name: 'javascript',
        description: 'JavaScript is an object-oriented programming language used alongside HTML and CSS to give functionality to web pages.',
        color: '#f0da50',
      },
      reactjs: {
        name: 'reactjs',
        description: 'React is an open source JavaScript library used for designing user interfaces.',
        color: '#61dbfa',
      },
      Laravel: {
        name: 'Laravel',
        description: 'A general purpose programming language that is widely used for developing various applications.',
        color: '#f9c646',
      },
  
    },
  };
