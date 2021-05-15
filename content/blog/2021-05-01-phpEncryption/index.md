---
title: "phpで公開鍵暗号方式の検証"
path: blog/phpEncryption
tags: [PHP]
cover: ./phpEncryption.jpeg
date: 2021-05-01
excerpt: phpで秘密鍵・公開鍵を自作し、テキストメッセージを暗号化・複合化する検証
---

## 完成像

```php
$private_key = openssl_pkey_new();  // 秘密鍵作成
$public_key_pem = openssl_pkey_get_details($private_key)['key']; // 公開鍵取得

$msg = "ワレ奇襲ニ成功セリ";
echo "■平文<br>\n";
echo $msg."<br>\n";

openssl_public_encrypt($msg, $crypted, $public_key_pem);  // 公開鍵で暗号化
echo "■暗号化"."<br>\n";
echo base64_encode($crypted)."<br>\n";

$decodeBody = base64_decode(base64_encode($crypted));
openssl_private_decrypt($decodeBody, $decrypted, $private_key);  // 秘密鍵で複合化
echo "■複合化"."<br>\n";
echo $decrypted . PHP_EOL;
```

```shell
■平文
ワレ奇襲ニ成功セリ
■暗号化
KHPCV3oOifcj4zh+VOLt/d7+g40fovxmD/DhZlmzt1E82XC2Y3EKMtWonX6SyQDTLrHnAM12HzQ7r/uBjMH5uesXdN7MiaqqM98uFPhNukDPh+p4hULU7Gis9G6B/K4j4RSADF2Vcm5yBu/Qz1uPSh1AChCl4agOPTVqIumI17oo1gNmTvDyFLSr9dd9PO5GifHnuWjpq4Rpp4lIs6q4UirJWFczkwDhaHdF5J2ObVg4z1EJCQ3T/AbLPy7V5FBY9B0958uCaSmxGgVL2xRtUC6BYNU3Yo21xpo/58keereEnvKCh5LP5tOPUufHLLizeOmVy2KmcHYGDIQzi10KXQ==
■複合化
ワレ奇襲ニ成功セリ
```

## 手順

1. ### 秘密鍵・公開鍵の作成

[openssl_pkey_new](https://www.php.net/manual/ja/function.openssl-pkey-new.php)を使って、
新規に秘密鍵と公開鍵の鍵ペアを作成します。<br>
作成後、[openssl_pkey_get_details](https://www.php.net/manual/ja/function.openssl-pkey-get-details.php)を使い、秘密鍵から公開鍵を取得します。

```php
$private_key = openssl_pkey_new();  // 秘密鍵作成
$public_key_pem = openssl_pkey_get_details($private_key)['key']; // 公開鍵取得
echo $public_key_pem;
```

下記のような形式で出力されればOKです。

```shell
-----BEGIN PUBLIC KEY----- MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuTX9NTyNaSVYtzEHMLr+
pCvqFjDqZcUuyah3VWU1FLosrn4uZ1rwl7w98W8A6Q5Ue5VkE9dNlGB/WtJkagoG
JDpjhWUDnbqMtlan/q5uegA8CQW4kSaWUZq59PBWavibCMPAQJtXZXnV+p6hM1bS
i/V6k6R1+4+9qCF/36q2YAyLsczQXNt+fLHOWBogjr2YisjCL3/qjCfR9u7kvuYl
xANAgDpHMRQxPTu7X4ZNuW7NL8o9Bq+4kePeD42SocdmMnqwIIaQIdCnvJrKXqPB
wr3vcB06nwrQGNpOd6MwKNOBmug6KxXPO2GXYQ06rIV1X0JhdREhPTtby5NkylwB wwIDAQAB -----END PUBLIC KEY-----
```

2. ### 公開鍵で暗号化

[openssl_public_encrypt](https://www.php.net/manual/ja/function.openssl-public-encrypt.php)を使って、
公開鍵でデータを暗号化します。<br>
暗号化されたデータは第二引数($crypted)に格納されます。<br>
また、暗号化されたデータは、base64形式となっているため、[base64_encode](https://www.php.net/manual/ja/function.base64-encode.php)でエンコードします。

```php
openssl_public_encrypt($msg, $crypted, $public_key_pem);  // 公開鍵で暗号化
echo "■暗号化"."<br>\n";
echo base64_encode($crypted)."<br>\n";
```

3. ### 秘密鍵で複合化

[openssl_private_decrypt](https://www.php.net/manual/ja/function.openssl-private-decrypt.php)を使って、
秘密鍵でデータを複合化します。<br>
複合化されたデータは第二引数($decrypted)に格納されます。

```php
$decodeBody = base64_decode(base64_encode($crypted));
openssl_private_decrypt($decodeBody, $decrypted, $private_key);  // 秘密鍵で複合化
echo "■複合化"."<br>\n";
echo $decrypted . PHP_EOL;
```