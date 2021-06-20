---
title: "【npm】sh: cross-env: command not found"
path: blog/crossEnvNotFound
tags: [Laravel, NodeJs]
cover: ./NodeJs.png
date: 2021-06-20
excerpt: Laravel Mix で npm run watch エラー
---

Laravelプロジェクトで npm run watch したところ、
「sh: cross-env: command not found」というエラーが出るようになった。<br>
根本的なエラー原因は突き止めていないですが、要は cross-env までのPATHの問題なので、一時的な対処法についてご紹介します。

```shell
$ npm run watch

> @ watch /var/www/laravel
> npm run development -- --watch


> @ development /var/www/laravel
> cross-env NODE_ENV=development node_modules/webpack/bin/webpack.js --progress --hide-modules --config=node_modules/laravel-mix/setup/webpack.config.js "--watch"

sh: cross-env: command not found ← ここ
npm ERR! code ELIFECYCLE
npm ERR! syscall spawn
npm ERR! file sh
npm ERR! errno ENOENT
npm ERR! @ development: `cross-env NODE_ENV=development node_modules/webpack/bin/webpack.js --progress --hide-modules --config=node_modules/laravel-mix/setup/webpack.config.js "--watch"`
npm ERR! spawn ENOENT
npm ERR!
npm ERR! Failed at the @ development script.
npm ERR! This is probably not a problem with npm. There is likely additional logging output above.
```

### 1. cross-env.js ファイルの場所を確認

```
$ find node_modules -name cross-env.js
node_modules/cross-env/dist/bin/cross-env.js
```
### 2. package.json の cross-env パスを書き換え

package.json内にある cross-env を 先程確認したパスに置き換えてください。<br>
私の環境では「development」「serve」「hot」「production」「storybook」で使用されていました。

```
"development": "cross-env NODE_ENV=development node_modules/webpack/bin/webpack.js --progress --hide-modules --config=node_modules/laravel-mix/setup/webpack.config.js",
 ↓
"development": "node_modules/cross-env/dist/bin/cross-env.js NODE_ENV=development node_modules/webpack/bin/webpack.js --progress --hide-modules --config=node_modules/laravel-mix/setup/webpack.config.js",
```