---
title: "【Laravel】APNsプッシュ通知をCurlで送信"
path: blog/LaravelSendPushNotificationsApns
tags: [PHP, Laravel]
cover: ./Laravel.png
date: 2021-05-03
excerpt: APNsプッシュ通知をCurlで送信
---

## 前提条件
・デバイストークンを取得済<br>
→ 未取得の場合は[こちら](http://kudohayatoblog.com/blog/LaravelPushNotificationsApns)を参考にしてください。<br>
・証明書ファイル作成済み(.pem)

## 手順

1. ### コマンドで送信できるか検証

curlコマンドで送信できるか確認してみます。<br>
ここで気を付けるべきは、APNsは HTTP/2 で通信する必要があるということと、url-args オプションが必須ということです。<br>

url-args は、リクエストパラメーターのことです。<br>
必須パラメーターですので、必要がない場合は、空の配列を入力する必要があります。<br>
詳細は[公式ドキュメント](https://developer.apple.com/library/archive/documentation/NetworkingInternet/Conceptual/NotificationProgrammingGuideForWebsites/PushNotifications/PushNotifications.html)を参照してください。

```
curl -v 
-d '{"aps":{"alert":{"title":"Flight A998 Now Boarding","body":"Flight A998 Now Boarding"},"url-args":[]}}' 
-H "apns-topic: <bundleId>" 
--http2 
--cert <pemPath>
https://api.push.apple.com/3/device/<deviceToken>
```

2. ### phpで実装

```php
public function sendPush($deviceToken, $message, $url_args)
{
    $pem_path = <pemPath>;

    if (!defined('CURL_HTTP_VERSION_2_0')) {
        define('CURL_HTTP_VERSION_2_0', CURL_HTTP_VERSION_1_1 + 1);
    }

    //PUSH内容設定
    $body['aps']['alert'] = $message;
    $body['aps']['url-args'] = $url_args;
    $payload = json_encode($body);  //PUSH内容をJSON化

    $device_Token_array = [<deviceToken>];

    foreach ($device_Token_array as $deviceToken) {

        $url = "https://api.push.apple.com/3/device/".$deviceToken;
        $headers = ["apns-topic: <bundleId>"];
        $post_data = $payload;

        $curl = curl_init();
        curl_setopt_array($curl, [
            CURLOPT_URL            => $url,
            CURLOPT_HEADER         => true,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POSTFIELDS     => $post_data,
            CURLOPT_HTTP_VERSION   => CURL_HTTP_VERSION_2_0,
            CURLOPT_HTTPHEADER     => $headers,
            CURLOPT_SSLCERT        => $pem_path,
        ]);
        $response = curl_exec($curl);
        $header_size = curl_getinfo($curl, CURLINFO_HEADER_SIZE);
        $header = substr($response, 0, $header_size);
        $body = substr($response, $header_size);
        $result = json_decode($body, true);
        curl_close($curl);
    }
}
```