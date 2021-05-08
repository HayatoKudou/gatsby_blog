---
title: "【JavaScript】window.close が動作しない件"
path: blog/jsWindowClose
tags: [JavaScript]
cover: ./javascript.jpeg
date: 2021-05-07
excerpt: window.open() メソッド以外で開いたタブも閉じる方法
---

[window.close](https://developer.mozilla.org/ja/docs/Web/API/Window/close)メソッドは、下記のようにスクリプトによって開かれたウィンドウ以外を閉じることができないとありますが、
window.open 以外で開かれた場合もウィンドウを閉じる方法があるので紹介します。

> このメソッドが許可されるのは、[window.open()](https://developer.mozilla.org/ja/docs/Web/API/Window/open) メソッドを用いたスクリプトにより開かれたウィンドウに対する呼び出しのみです。
> ウィンドウがスクリプトにより開かれたものでない場合、次のようなエラーがコンソールに表示されます: スクリプトはスクリプトによって開かれたウィンドウ以外を閉じることができません。

### 履歴が１件のみの場合、window.closeできる

[https://html.spec.whatwg.org/multipage/window-object.html#dom-window-close](https://html.spec.whatwg.org/multipage/window-object.html#dom-window-close)によると、
履歴が1つしかない場合、window.closeで閉じることが可能なようです。<br>
<br>
履歴数は [window.history.length](https://developer.mozilla.org/ja/docs/Web/API/History_API) で履歴スタック中のページの数を取得できるため、1の場合のみ閉じる、という処理ができます。

```javaScript
if(window.history.length === 1){
    window.close();
}
```

使用例として、URIに乱数を追加することで、常に履歴数を1にすることができます。<br>
(乱数だと重複する可能性があるため、タイムスタンプの方が良いかもしれません。)