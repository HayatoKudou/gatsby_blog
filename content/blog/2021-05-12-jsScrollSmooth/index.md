---
title: "【React】ライブラリを使わずにスムーズスクロールの実装"
path: blog/jsScrollSmooth
tags: [JavaScript, React]
cover: ./react.png
date: 2021-05-12
excerpt: ライブラリを使わずにスムーズスクロールの実装
---

### 完成図

```javascript
import React, { useRef } from 'react';

const App = () => {

    const box1 = useRef(null);
    const box2 = useRef(null);
    const box3 = useRef(null);

    function scroll(box) {
        box.current.scrollIntoView('smooth');
    }

    return (
        <div>
            <div>
                <ul>
                    <li><button onClick={() => scroll(box1)}>ボックス1へ</button></li>
                    <li><button onClick={() => scroll(box2)}>ボックス2へ</button></li>
                    <li><button onClick={() => scroll(box3)}>ボックス3へ</button></li>
                </ul>
                <div ref={box1}>ボックス1</div>
                <div ref={box2}>ボックス2</div>
                <div ref={box3}>ボックス3</div>
            </div>
        </div>
    );
}

export default App;
```

### 解説

```javascript
const box1 = useRef(null);
const box2 = useRef(null);
const box3 = useRef(null);
```

Hooksの場合は、[useref](https://ja.reactjs.org/docs/hooks-reference.html#useref)でrefオブジェクトを作成します。<br>
refとはrenderで作成されたDOMを操作するために使用するオブジェクトです。<br>
(クラスコンポーネントの場合は、[createRef](https://ja.reactjs.org/docs/refs-and-the-dom.html)で作成できます。)

```javascript
function scroll(box) {
    box.current.scrollIntoView('smooth');
}
```

[Element.scrollIntoView()](https://developer.mozilla.org/ja/docs/Web/API/Element/scrollIntoView)で
引数で指定した Element までスクロールします。<br>
今回はスムーズスクロールの実装のため、scrollIntoView の引数に 文字列で smooth を渡しています。<br>

scrollIntoView の規定値は、下記のようになっています。<br><br>
behavior(推移のアニメーション): auto<br>
block(垂直方向の配置): start<br>
inline(水平方法の配置): nearest<br>