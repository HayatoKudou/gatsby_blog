---
title: "【Composer】array_merge() does not accept unknown named parameters エラーの解決方法"
path: blog/composerError
tags: [PHP]
cover: ./composer.png
date: 2021-04-01
excerpt: "PHP Fatal error:  Uncaught ArgumentCountError: array_merge() does not accept unknown named parameters エラーの解決方法"
---

## array_merge() does not accept unknown named parameters

```
composer global require laravel/installer
```
![](./composerError.png)
Laravelのインストーラーをcomposerでインストールしようとしたところ、このようなエラーが発生。<br>
調べてみたところ、PHP8系 + Composer1系で発生している問題のようです。<br>
<br>
ということでPHPのバージョンを下げるか、Composerのバージョンを上げると解決されます。<br>
PHPのバージョンは依存関係が面倒なので、今回はComposerのバージョンを上げてみます。

```
composer self-update
```

インストールできました✌️
![](./composerError2.png)