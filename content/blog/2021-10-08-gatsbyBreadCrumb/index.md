---
title: "【Gatsby】gatsby-plugin-breadcrumbを使ったパンくず自動生成"
path: blog/gatsbyBreadCrumb
tags: [React, JavaScript]
cover: ./gatsby.png
date: 2021-10-08
excerpt: 'gatsby-plugin-breadcrumb AutoGen（Auto Generated）を使ったパンくず自動生成'
---

### インストール

```bash
yarn add gatsby-plugin-breadcrumb
```

もしくは

```bash
npm install gatsby-plugin-breadcrumb
```

### プラグイン追加

gatsby-config.js に gatsby-plugin-breadcrumb プラグインを追加します。<br>
下記は最小構成で、さらにオプションを追加したい場合は、[公式ページ](https://www.gatsbyjs.com/plugins/gatsby-plugin-breadcrumb/)を参照してください。

```javascript
  {
    resolve: 'gatsby-plugin-breadcrumb',
    options: {
      useAutoGen: true, // 今回使用するモード
      autoGenHomeLabel: 'Home', // トップページ
      exclude: ['**/404/**'], // 除外ファイル
    },
  },
```

### 実装

ここでは Breadcrumb をインポートし、引数に crumbs(context)と、crumbLabel(パンくず名)を渡しています。<br>
(contextは gatsby-node.js ファイルの中でページを動的に作成する際に渡しているデータです)

```javascript
import { Breadcrumb } from 'gatsby-plugin-breadcrumb'

const Blog = ({ pageContext, location, data }) => {
    const { breadcrumb: { crumbs } } = pageContext
    return (
        ~~
          <Breadcrumb
            crumbs={crumbs}
            crumbLabel={'Blog'}
          />
        ~~
    )
};
```

デフォルトのスタイルを適用するには、gatsby-plugin-breadcrumb.cssファイルをインポートしてください。

```javascript
import 'gatsby-plugin-breadcrumb/gatsby-plugin-breadcrumb.css'
```