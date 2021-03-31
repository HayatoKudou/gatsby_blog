---
title: "【React】Uncaught TypeError: map is not a function"
path: blog/mapIsNotFunc
tags: [JavaScript, React]
cover: ./React.jpeg
date: 2021-03-31
excerpt: 【React】map is not a function
---

## Uncaught TypeError: map is not a function

Reactでmapメソッドを使おうとしたところ、エラーが発生しました。<br>
改めて[Array.prototype.map()](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/map)を確認したところ、
mapメソッドは配列のみに有効なメソッドのようで、今回のエラーは「配列以外のデータに対してmapメソッドを呼び出した」ことが原因のようです。<br>
<br>
ということでオブジェクトを配列に変換する処理を紹介します。

```javascript
var obj = {"1": "data1", "2": "data2", "3": "data3"};
```

### 方法1: オブジェクトのvalueを配列に代入する

```javascript
var array = Object.keys(obj).map(function (key) {
    return obj[key];
});
```

### 方法2: Object.entriesメソッドを使用する
[Object.entries](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object/entries)メソッドは、引数に与えたオブジェクトが所有する、文字列をキーとした列挙可能なプロパティの組 [key, value] からなる配列を返します。
```javascript
var array = Object.entries(obj);
```

### 方法3: オブジェクトを配列に入れる

```javascript
var array = [obj];
```