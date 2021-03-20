---
title: "React Hookでバリデーション付きのフォームを実装"
path: blog/reactHookForm
tags: [JavaScript, React]
cover: ./reactHookForm.jpg
date: 2021-02-16
excerpt: react-hook-formライブラリを用いて、バリデーション付きのフォームを実装してみた！
---

## 目的

react-hook-formライブラリを用いて、バリデーション付きのフォームを実装する。

## react-hook-formとは

[公式ドキュメント](https://react-hook-form.com/jp/)によると、【高性能で柔軟かつ拡張可能な使いやすいフォームバリデーションライブラリ】とあります。 <br>
ライブラリを導入するメリットとして、個人的には下記あたりが大きいと思います。
- バリデーション処理をシンプルに書ける
- レンダリングを削減できる(onChangeで逐一レンダリングする必要がない)
- 高速なマウント

## 使用環境

- React (17.0.1)
- react-hook-form (6.15)

## 手順

1. ### react-hook-formインストール

    ```
    npm install react-hook-form
    ```

    ```
    yarn add react-hook-form
    ```

2. ### 完成図の確認

    下記を例とし、解説します。

    ```javascript
    import React from "react";
    import { useForm } from "react-hook-form";

    export default function App() {
        const { register, handleSubmit, errors } = useForm();
        const onSubmit = data => alert(data);

        return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input name="example" defaultValue="test" ref={register} />
            <input name="exampleRequired" ref={register({ required: true })} />
            {errors.exampleRequired && <span>This field is required</span>}

            <input type="submit" />
        </form>
        );
    }
    ```

3. ### register

    registerメソッドは、Refとバリデーションルールを登録することができます。<br>
    提供されているバリデーションルールは[公式](https://react-hook-form.com/jp/api/#register)を確認してください。

    ```javascript
    <input name="example" defaultValue="test" ref={register} />
    <input name="exampleRequired" ref={register({ required: true })} />
    ```

    バリデーションのエラーメッセージも設定できます。<br>
    例のrequiredのエラーメッセージを「入力必須です」に設定してみます。<br>
    (エラーメッセージはerrorsオブジェクトのmessageに入ります。)

    ```javascript
    <input name="exampleRequired" ref={register({ required: '入力必須です' })} />
    {errors.exampleRequired && <span>{errors.exampleRequired.message}</span>}
    ```

4. ### errors
    errorsオブジェクトは、各inputフォームのエラーまたはエラーメッセージが含まれています。<br>
    例ではrequireのみ設定しているため、エラーが発生した場合はrequireのエラーメッセージを返せばいいです。

    ```javascript
    {errors.exampleRequired && <span>This field is required</span>}
    ```

    しかし、単一のフィールドで複数のルールを設定している場合、エラー内容によってエラーメッセージを変える必要があります。
    その場合は、typesを使用してエラー内容を特定します。<br>
    ルールをrequiredとmaxLengthを指定して試してみます。

    ```javascript
    <input name="exampleRequired" ref={register({ required: true, maxLength: 5 })} />
    {errors.exampleRequired?.type === "required" && "入力必須です。"}
    {errors.exampleRequired?.type === "maxLength" && "5文字以内で入力してください。"}
    ```

5. ### handleSubmit
    handleSubmit関数は、フォームバリデーションに成功するとフォームデータを渡します。<br>
    例では onSubmit にフォームデータを渡し、アラート表示しています。

    ```javascript
    const onSubmit = data => alert(data);
    <form onSubmit={handleSubmit(onSubmit)}>
    ```

## 終わり

ここまでお疲れ様でした。<br>
react-hook-formはいかがだったでしょうか？<br>
私はこれまでフォームの実装はReduxで実装することが多かったため、レンダリングの少なさに驚きました。<br>
早くて、簡単で、個人的にはフォームライブラリの決定版です。