---
title: "【Gatsby】objc[9611]: Class GNotificationCenterDelegate is implemented in both"
path: blog/gatsbyError
tags: [JavaScript, NodeJs]
cover: ./gatsby.png
date: 2021-07-29
excerpt: 'objc[9611]: Class GNotificationCenterDelegate is implemented in both'
---

gatsbyで gatsby develop を実行したところ、下記エラーが出力されました。<br>
google検索してもダイレクトな解決方法が無かったため備忘録として残しておきます。

```white
$ gatsby develop
success open and validate gatsby-configs - 0.116s
⠋ load plugins
objc[9611]: Class GNotificationCenterDelegate is implemented in both /Users/kudouhayato/Desktop/project/gatsby_blog/node_modules/gatsby-plugin-sharp/node_modules/sharp/vendor/8.10.6/lib/libvips-cpp.42.dylib (0x141753eb0) and /Users/kudouhayato/Desktop/project/gatsby_blog/node_modules/gatsby-transformer-sharp/node_modules/sharp/vendor/8.10.5/lib/libvips.42.dylib (0x144fc4ce0). One of the two will be usedsuccess load plugins - 4.320s
success onPreInit - 0.035s
success initialize cache - 0.013s
success copy gatsby files - 0.099s
success onPreBootstrap - 0.021s
success createSchemaCustomization - 0.135s
success Checking for changed pages - 0.002s
success source and transform nodes - 0.310s
success building schema - 0.394s
info Total nodes: 332, SitePage nodes: 38 (use --verbose for breakdown)
success createPages - 0.067s
success Checking for changed pages - 0.000s
success createPagesStatefully - 0.086s
success update schema - 0.054s
success write out redirect data - 0.002s
⠋ onPostBootstrap
⠋ Build manifest and related icons
**
ERROR:/Users/runner/work/sharp/sharp/vendor/8.10.5/include/vips/VImage8.h:125:vips::VObject &vips::VObject::operator=(const vips::VObject &): assertion failed: (!a.vobject || VIPS_IS_OBJECT( a.vobject ))
not finished onPostBootstrap - 0.006snot finished Build manifest and related icons - 0.012s

Abort trap: 6
```

この中で怪しい部分は下記2点です。<br>
エラー分を読むと sharpパッケージをダブルインストールしようとし、ロードに失敗しているようです。

```
objc[9611]: Class GNotificationCenterDelegate is implemented in both /Users/kudouhayato/Desktop/project/gatsby_blog/node_modules/gatsby-plugin-sharp/node_modules/sharp/vendor/8.10.6/lib/libvips-cpp.42.dylib (0x141753eb0) and /Users/kudouhayato/Desktop/project/gatsby_blog/node_modules/gatsby-transformer-sharp/node_modules/sharp/vendor/8.10.5/lib/libvips.42.dylib (0x144fc4ce0). One of the two will be usedsuccess load plugins - 4.320s
```

```
ERROR:/Users/runner/work/sharp/sharp/vendor/8.10.5/include/vips/VImage8.h:125:vips::VObject &vips::VObject::operator=(const vips::VObject &): assertion failed: (!a.vobject || VIPS_IS_OBJECT( a.vobject ))
not finished onPostBootstrap - 0.006snot finished Build manifest and related icons - 0.012s
```

google検索していると、
> ・__gatsby-plugin-sharp__   __gatsby-transformer-sharp__ のバージョンアップ<br>
> ・__/node_modules/sharp/vendor/lib/****.dylib__ を削除する

などが出てきましたが、私の環境では解決しなかったため、他の対策を紹介します。

## ncuコマンドを使ってバージョンを一括変更

インストールが済んでいない場合は、npm-check-updatesをグローバルにインストールしてください。

```
$ npm install -g npm-check-updates
```

### 変更前に確認

変更前に、どう書き変わるのかを確認することができます。<br>
ncuコマンドだけだと、変更前と変更後のリストが表示されるだけで、package.jsonはまだ書き替わらないので安心です。<br>
(一部省略)

```white
$ ncu
Checking /Users/kudouhayato/Desktop/project/gatsby_blog/package.json
[====================] 45/45 100%

 eslint                           ^7.23.0  →   ^7.31.0     
 eslint-plugin-import             ^2.22.1  →   ^2.23.4     
 eslint-plugin-react              ^7.23.1  →   ^7.24.0     
 prettier                          ^2.2.1  →    ^2.3.2      
 antd                             ^4.15.0  →   ^4.16.9     
 gatsby                            ^3.2.1  →   ^3.10.2     
 gatsby-image                      ^3.2.0  →   ^3.10.0      
 gatsby-transformer-sharp          ^3.2.0  →   ^3.10.0     

Run ncu -u to upgrade package.json
```

### package.json書き換え

-uオプションをつけることで、実際にpackage.jsonが書き変えることができます。<br>
コマンド実行後、package.jsonが書き変わっていることを確認してください。

```
$ ncu -u
```

### インストール

書き換えたpackage.jsonを元にインストールします。<br>
念のため node_modules を削除し、再インストールすることをオススメします。

```
$ rm -r node_modules
$ npm install
```

gatsby develop を再実行したところ上手くいきました。<br>
やはりパッケージのバージョンが原因だったようです。

```white
$ gatsby develop
success open and validate gatsby-configs, load plugins - 9.856s
success onPreInit - 0.035s
success initialize cache - 0.065s
success copy gatsby files - 0.377s
success Compiling Gatsby Functions - 1.570s
success onPreBootstrap - 1.601s
success createSchemaCustomization - 0.577s
success Checking for changed pages - 0.001s
success source and transform nodes - 0.810s

~~省略~~
```