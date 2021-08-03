---
title: "【Kali】slowhttptestを使ってDoS攻撃"
path: blog/kaliSlowhttptest
tags: [Linux]
cover: ./kalilinux.png
date: 2021-08-01
excerpt: 'slowhttptestを使ってSlow HTTP DoS攻撃をしてみる'
---

SlowHTTPTestは、一部のアプリケーション層のサービス拒否攻撃をシミュレートする高度に構成可能なツールで、
slowloris(Slow HTTP DoS攻撃)攻撃が容易にできるツールです。<br>
slowlorisとは、ターゲットを絞って行うDoS攻撃の1種であり、HTTPリクエストとレスポンスの仕組みを悪用し、攻撃対象のウェブサーバーをダウンさせる攻撃方法です。<br>
UDPフラッドのような攻撃とは異なり、大量のボットを使わずに攻撃を行うことが可能なので、DDoS攻撃をより手軽なものにしています。

## 使用環境
- slowhttptest (攻撃ツール)
- KaliLinux (Dos攻撃元)
- Apache (Dos攻撃先)

### 注意
<span style="color: red; ">
SlowHTTPTestは、独自のサーバーの1つで実行する必要があることに注意してください。<br>
同意なしにサードパーティのサーバーで実行しないでください（違法です）<br>
</span>

### 1. slowhttptestインストール

```
sudo apt install slowhttptest
```

### 2. slowhttptest実行

今回の攻撃対象は、Apacheサーバーで稼働している自サイトです。<br>
<!-- ローカルサーバでもいいですが、折角なので公開しているサーバーに対して攻撃してみます。<br> -->

■オプション詳細<br>
**-c**: テスト中に確立する接続の目標数を指定します。(**-c 1000**)<br>
**-H**: SlowLorisモードを指定。<br>
**-g**: 有効なカスタムファイル名を指定します。(出力ファイル名を(**-o slowhttp**)で指定しています。)<br>
**-o**: ファイル名<br>
**-i**: slowroisテストとSlowPOSTテストのフォローアップデータ間の間隔を指定します。(**-i 10**)<br>
**-r**: 接続速度を指定します。(**-r 200**)<br>
**-t**: HTTPリクエストで使用する動詞を指定します。(**-t GET**)<br>
**-u**: 攻撃先URL(__-u 攻撃先URL__)<br>


```
slowhttptest -c 1000 -H -g -o slowhttp -i 10 -r 200 -t GET -u 攻撃先URL -x 24 -p 3
```

コマンドを実行すると、出力ファイルが表示されます。<br>
**service available**はターゲットに到達できるかを意味しますが、常に信頼できるわけではありません。<br>
service availableが**NO**になったら実際にページにアクセスしてみてください。

<video autoplay="" loop="" muted="" playsinline="" controls="" title="Launch your first VS Code extension video" style="width: 100%;">
  <!-- <source src="http://localhost:8000/kali_dos.mp4" type="video/mp4">  -->
  <source src="https://kudohayatoblog.com/kali_dos.mp4" type="video/mp4"> 
</video>

<br>
<br>
攻撃を受けているApacheサーバーの様子を見てみます。<br>
/var/log/httpd 配下にアクセスログファイルがあるので、**tail -f ログファイル名**でログの監視をしてみます。<br>
<br>
コマンドを実行ししばらくすると、大量のHTTPリクエストを受信していることが確認できます。

<video autoplay="" loop="" muted="" playsinline="" controls="" title="Launch your first VS Code extension video" style="width: 100%;">
  <!-- <source src="http://localhost:8000/kali_dos_log.mov" type="video/mp4">  -->
  <source src="https://kudohayatoblog.com/kali_dos_log.mp4" type="video/mp4"> 
</video>

### 検証結果 / 対策

検証したところ、攻撃がされていることは確認できましたが、実際にサービスがダウンすることはありませんでした。<br>
<!-- 大抵のwebサーバーにはデフォルトでDos対策のモジュールやタイムアウト設定が入っており、それによって防御された可能性があります。 -->

今回はAWS上で動いているApacheへ攻撃しましたが、AWSには[aws shield](https://docs.aws.amazon.com/ja_jp/waf/latest/developerguide/ddos-overview.html)というサービスがデフォルトで導入されており、<br>
これにより今回のような悪意のあるリクエストのフィルタリングがされた可能性があります。<br>

とはいえ、webサーバーにも対策をするに越したことはないので、Apache v2.2.15 からデフォルトで入っている、[mod_reqtimeout](http://itdoc.hitachi.co.jp/manuals/link/has_v101000/0342020D/0129.HTM)モジュールを使用し、
HTTPリクエストのタイムアウト設定をしてみます。<br>
<br>
**バージョン 2.3.15 以降のデフォルト値 ： header=20-40,MinRate=500,MinRate=500**

```
構文 ： RequestReadTimeout [header=timeout[-maxtimeout][,MinRate=rate] [body=timeout[-maxtimeout][,MinRate=rate]
```

```
<IfModule mod_reqtimeout.c>  
  RequestReadTimeout header=20-40,MinRate=500,MinRate=500
</IfModule>
```

デフォルト値では、20秒で受信が終わらないとタイムアウトになります、
ヘッダーは maxtimeout が付いているので、500バイト/秒以上のデータを受信している間は、40秒まで延長されます。