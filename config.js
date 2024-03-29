/* eslint-disable */
module.exports = {
    pathPrefix: '',
    siteUrl: 'https://kudohayatoblog.com',
    siteTitle: 'エンジニアの開発ブログ',
    siteDescription: 'WEBエンジニアのブログ',
    author: 'Hayato Kudo',
    postsForArchivePage: 3,
    defaultLanguage: 'ja',
    disqusScript: 'https://https-kudohayatoblog-com.disqus.com/embed.js' || process.env.DISQUS_SCRIPT,
    pages: {
        home: '/',
        blog: 'blog',
        contact: 'contact',
        resume: 'resume',
        tag: 'tags',
        tools: 'tools',
        yukari: '/other/yukari',
    },
    social: {
        github: 'https://github.com/HayatoKudou',
        twitter: 'https://twitter.com/metalic_kudo_h',
        qiita: 'https://qiita.com/metal_kentucky',
        rss: '/rss.xml',
    },
    contactFormUrl: process.env.CONTACT_FORM_ENDPOINT || 'https://getform.io/f/ea56414c-1ebc-4b48-bfe4-7b6d28d1b812',
    googleAnalyticTrackingId: process.env.GA_TRACKING_ID || 'UA-190311961-1',
    tags: {
        JavaScript: {
            name: 'JavaScript',
            description: 'JavaScriptは、HTMLやCSSと並んでWebページに機能を持たせるために使われるオブジェクト指向プログラミング言語です。',
            color: '#f0da50',
        },
        TypeScript: {
            name: 'TypeScript',
            description: 'TypeScriptは、JavaScriptの機能を拡張し、開発されたオープンソースのプログラミング言語です。',
            color: '#f0da50',
        },
        Laravel: {
            name: 'Laravel',
            description: 'Laravelは、MVCのWebアプリケーション開発用の無料・オープンソースのPHPで書かれたWebアプリケーションフレームワークです。',
            color: '#f9c646',
        },
        PHP: {
            name: 'PHP',
            description: 'PHPは特にサーバーサイドで動的なウェブページを作成するための機能を多く備えている、オープンソースの汎用スクリプト言語です。',
            color: '#474A8A',
        },
        React: {
            name: 'React',
            description: 'Reactは、ユーザーインターフェイスの設計に使われるオープンソースのJavaScriptライブラリです。',
            color: '#61dbfa',
        },
        Unity: {
            name: 'Unity',
            description: 'Unity（Unity3D）は、IDEを内蔵するゲームエンジンです。',
            color: '#000000',
        },
        Linux: {
            name: 'Linux',
            description: 'Linuxは、オープンソースのオペレーティングシステム (OS) および IT インフラ基盤です。',
            color: '#000000',
        },
        AWS: {
            name: 'AWS',
            description: 'AWS(Amazon Web Services)は、Amazon.comが提供しているクラウドコンピューティングサービスです。',
            color: '#FF9900',
        },
        GCP: {
            name: 'GCP',
            description: 'GCP (Google Cloud Platform) は、Googleが提供しているクラウドコンピューティングサービスです。',
            color: '#45a2e6',
        },
        Azure: {
            name: 'Azure',
            description: 'Azureは、マイクロソフトが提供しているクラウドコンピューティングサービスです。',
            color: '#007FFF',
        },
        Apache: {
            name: 'Apache',
            description: 'Apacheは、世界中で使用されているWebサーバーソフトウェア(HTTPサーバー)です。',
            color: '#cc2336',
        },
        NodeJs: {
            name: 'NodeJs',
            description: 'Node.jsは、スケーラブルなネットワークアプリケーションを構築するために設計された非同期型のイベント駆動の JavaScript 環境です。',
            color: '#43853d',
        },
        Python: {
            name: 'Python',
            description: 'Pythonはインタープリタ型の高水準汎用プログラミング言語です。',
            color: '#cc2336',
        },
    },
};
