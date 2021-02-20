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
    contactFormUrl: process.env.CONTACT_FORM_ENDPOINT || 'https://getform.io/f/ea56414c-1ebc-4b48-bfe4-7b6d28d1b812',
    googleAnalyticTrackingId: process.env.GA_TRACKING_ID || '',
    tags: {
      javascript: {
        name: 'javascript',
        description: 'JavaScriptは、HTMLやCSSと並んでWebページに機能を持たせるために使われるオブジェクト指向プログラミング言語です。',
        color: '#f0da50',
      },
      reactjs: {
        name: 'reactjs',
        description: 'Reactは、ユーザーインターフェイスの設計に使われるオープンソースのJavaScriptライブラリです。',
        color: '#61dbfa',
      },
      Laravel: {
        name: 'Laravel',
        description: 'Laravelは、MVCのWebアプリケーション開発用の無料・オープンソースのPHPで書かれたWebアプリケーションフレームワークです。',
        color: '#f9c646',
      },
      php: {
        name: 'php',
        description: 'PHPは特にサーバーサイドで動的なウェブページを作成するための機能を多く備えている、オープンソースの汎用スクリプト言語です。',
        color: '#474A8A',
      },
  
    },
  };
