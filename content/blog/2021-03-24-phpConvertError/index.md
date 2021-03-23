---
title: "Object of class stdClass could not be converted to string エラーの解決方法"
path: blog/phpConvertError
tags: [PHP, Laravel]
cover: ./phpConvertError.png
date: 2021-03-24
excerpt: "Object of class stdClass could not be converted to string エラーの解決方法"
---

## 概要

json_decode関数でJSONデータを連想配列に変換し、Log出力しようとしたところ、<br>
<u style="color: red;">Object of class stdClass could not be converted to string</u> エラーが発生しました。<br>

```php
$obj = json_decode($json);
Log::debug($obj);
```

```shell
local.ERROR: Object of class stdClass could not be converted to string {"exception":"[object] (Error(code: 0): Object of class stdClass could not be converted to string
```

### 解決

エラー文を直訳すると「クラスstdClassのオブジェクトを文字列に変換できませんでした」ですね。<br>
stdClass? オブジェクト? 連想配列に変換されていないのかな...🤔<br>
<br>
[公式ドキュメント](https://www.php.net/manual/ja/function.json-decode.php)を確認したところ、
第2引数を指定しない場合、stdClassオブジェクト型に変換されるようです。<br>
<br>
第2引数を true にすることで、返されるオブジェクトは連想配列形式になります。

```php
$obj = json_decode($json, true);
```

また、Laravelにおいてオブジェクトをログ出力する場合は、print_r関数を使用することで可能となります。

```php
Log::debug(print_r($obj, true));
```