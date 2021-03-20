---
title: "Linux OSにphp-gmp拡張モジュールをインストールする方法"
path: blog/phpGmp
tags: [Linux]
cover: ./Linux.png
date: 2021-02-21
excerpt: Linux OSにphp-gmp拡張モジュールをインストールする方法
---

## gmp extension is not loaded but is required for sending push notifications with payload or for VAPID authentication. You can fix this in your php.ini.

とあるライブラリを使っていたところ、このようなエラーが発生。<br>
エラーメッセージを見たところgmpという拡張モジュールがインストールされていないようなので、インストールしてみます。

## 使用環境
- AmazonLinux 2
- PHP 7.3.12

## 手順

1. ### php-gmpインストール

    ```
    yum -y install php-gmp
    ```

    基本的には、このコマンドでインストールできるそうですが、私の環境ではインストール時に依存関係のエラーが発生してしまいました。
    remiリポジトリを確認したところ、php73-php-gmpというパッケージがあったためこちらを使います。

    ```
    yum -y install php73-php-gmp
    ```

    正しくインストールされたかコマンドで確認してみましょう。
    ```
    yum list installed
    ```

2. ### モジュールパスを通す

    php-gmpの保存場所を確認します。

    ```
    find / -name gmp.so -print
    ```

    確認できたら、php.ini の extension という項目に、確認したphp-gmpのパスを記載しモジュールを追加します。

    ```
    extension=/opt/remi/php73/root/usr/lib64/php/modules/gmp.so
    ```

3. ### 確認
    phpinofoでphp-gmpが入っているか確認してみます。<br>
    「GMP version」の記載がされていれば成功です。

    ```
    php -r 'phpinfo();'
    ```

## 終わり

ここまでお疲れ様でした。<br>
インストール時の依存関係にだいぶ悩まされたため記事にしました。<br>
他の環境では php-gmp がデフォルトでインストールされていたのですが、これはPHPのインストール方法の違いなんですかね🤔<br>
分かる方がいればコメントいただけると嬉しいです！