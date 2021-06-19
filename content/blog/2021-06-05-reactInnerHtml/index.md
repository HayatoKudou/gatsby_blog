---
title: "【React】メソッド内でHTMLをレンダリングさせる方法"
path: blog/reactInnerHtml
tags: [JavaScript, React]
cover: ./react.png
date: 2021-06-04
excerpt: 「ReactDOM.render()」「dangerouslySetInnerHTML」 でReactメソッド内でHTMLをレンダリングさせる方法
---

Reactメソッド内でHTMLをレンダリングさせる方法の解説です。
別クラスコンポーネントにHTMLを追加する処理を実装したく、詰まっため備忘録として書きました。

本記事の詳細な内容は、[公式:要素のレンダー](https://ja.reactjs.org/docs/rendering-elements.html)をご参照ください。

## 方法1: ReactDOM.render

### 完成図

[DEMO](/verification/reactInnerHtml/ReactDOMRender)

```javascript
import React from 'react';
import ReactDOM from 'react-dom';

function renderAddDom(){
    const elm = <p>child</p>
    ReactDOM.render(elm, document.getElementById('parent'));
}

function renderDeleteDom(){
    ReactDOM.render('', document.getElementById('parent'));
}

const App = () => {
    return (
        <div>
            <button onClick={() => renderAddDom()}>追加</button>
            <button onClick={() => renderDeleteDom()}>削除</button>
            <div id="parent"></div>
        </div>
    );
}

export default App;
```

### 解説

reactメソッドでhtmlを返した場合、下記のようなオブジェクトを返します(一部省略)。<br>
このオブジェクトを React element と呼びます。

```javascript
{
    $$typeof: Symbol(react.element)
    key: null
    props: {children: "child"}
    ref: null
    type: "p"
}
```

この React element をそのまま返してもレンダリングされないため、
[ReactDOM.render](https://ja.reactjs.org/docs/react-dom.html)で React element をレンダリングさせます。<br>
react-dom を未インストールの場合は、[Install React and react-dom - npm](https://www.npmjs.com/package/react-dom)からインストールできます。

renderAddDom() では elm変数に React element を格納し、#parent にレンダリングさせています。

```javascript
function renderAddDom(){
    const elm = <p>child</p>
    ReactDOM.render(elm, document.getElementById('parent'));
}
```

renderDeleteDom() では、空の要素で上書きすることで、HTML要素を削除しています。

```javascript
function renderDeleteDom(){
    ReactDOM.render('', document.getElementById('parent'));
}
```

## 方法2: dangerouslySetInnerHTML

※注意: [dangerouslySetInnerHTML](https://ja.reactjs.org/docs/dom-elements.html)は、jsにおける[innerHTML](https://developer.mozilla.org/ja/docs/Web/API/Element/innerHTML)のReactでの代替です。<br>
一般的にコードからHTMLを設定することは XSS攻撃に晒してしまいやすいため注意が必要です。<br>
<br>
利用する場合はエスケープ処理を併せて実装することをお勧めします。<br>
([DOMPurify](https://github.com/cure53/DOMPurify) などのライブラリを利用することで簡単に実装できます。)

### 完成図

[DEMO](/verification/reactInnerHtml/dangerouslySetInnerHTML)

```javascript
function App() {
    const [html, setHtml] = useState('');

    function renderAddDom(value) {
        setHtml(value);
    };

    return (
        <div>
            <button onClick={() => renderAddDom('<p>child</p>')}>追加</button>
            <button onClick={() => renderAddDom('')}>削除</button>
            <div dangerouslySetInnerHTML={{__html: html}}></div>
        </div>
    )
};

export default App;
```

### 解説

ReactDOM.render ではメソッド内でHTMLを設定していますが、dangerouslySetInnerHTML ではrender時にHTMLを設定しています。<br>
render時にステートに設定していたHTML文字列を、__html というキーを持つオブジェクトを渡すことで機能します。

```javascript
<div dangerouslySetInnerHTML={{__html: html}}></div>
```