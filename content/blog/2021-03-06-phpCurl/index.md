---
title: "同じサーバー内でCURLリクエストをする方法"
path: blog/ApacheCurlEroor
tags: [Linux, Apache, PHP]
cover: ./Apache.png
date: 2021-03-06
excerpt: 同じサーバー内でCURLリクエストをする方法
---

Apacheで開発環境を構築していたところ、なぜかAPI認証が通らない。<br>
APIサーバーを確認しても認証で弾かれている様子でもない...なんでだろう🤔

うーん...本番環境では正常に動作しているし、環境の問題かな。<br>
一旦コマンドで通信してみよう。<br>
ん? 何かエラーが出るな。<br>

```shell
curl: (6) Couldn't resolve host
```

なになに、直訳すると「ホストを解決できませんでした。」か、<br>
DNS周りのエラーかな? 調べてみましょう...

どうやら。パブリックIPを使ってローカルサーバーにリクエストした際、<br>
Apacheがローカルドメインの名前解決できなかったことが原因のようです。
 > 参考: [同じサーバーにCURLリクエストを実行できますか？](https://www.it-swarm.jp.net/ja/php/%E5%90%8C%E3%81%98%E3%82%B5%E3%83%BC%E3%83%90%E3%83%BC%E3%81%ABcurl%E3%83%AA%E3%82%AF%E3%82%A8%E3%82%B9%E3%83%88%E3%82%92%E5%AE%9F%E8%A1%8C%E3%81%A7%E3%81%8D%E3%81%BE%E3%81%99%E3%81%8B%EF%BC%9F/971634825/)

つまり、ドメインとローカルIPの紐付けが必要ってことですね。<br>
/etc/hosts ファイルに設定を追加します。
( 例: ローカルIP = 172.190.1.80、ドメイン = yourdomain.com )

```shell
172.190.1.80 yourdomain.com
```

これでローカルIPとドメインの紐付けができたはずです。<br>
設定したらApacheを再起動して...<br>
お！curlが通りました！