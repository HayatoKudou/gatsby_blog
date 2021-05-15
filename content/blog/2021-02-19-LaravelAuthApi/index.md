---
title: "LaravelでトークンベースのAPI認証"
path: blog/LaravelAuthApi
tags: [PHP, Laravel]
cover: ./Laravel.png
date: 2021-02-11
excerpt: Laravel標準のapi guardを使用しトークンベースのAPI認証を実装してみた！
---

## 目的

Laravel標準のapi guardを使用しトークンベースのAPI認証をする。

## 使用環境

- Laravel (8.25.0)

## 手順

1. ### DBの準備

    ユーザー管理用のテーブルを作成します。<br>
    /database/migrationsディレクトリに標準で、***_create_users_table.php というmigrationファイルがあると思います。<br>
    このファイルにapi_tokenのカラムを追加します。 api_tokenはユニークでNULLを許容しないカラムとします。

    ```php
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
            $table->string('api_token',60)->unique()->nullable();  //追加
        });
    }
    ```
    migrationファイルができたら、migrateしテーブルを作成します。<br>
    usersテーブルが作成されたことを確認してください。

    ```shell
    php artisan migrate
    ```

2. ### Guardの変更

    config/auth.phpのの中にguardsという項目があり、web guardとapi guardの２つが記載されていると思います。<br>
    詳細な解説は割愛しますが、web guardはセッション、api guardはトークンを使った認証方式で、今回はapi guardを使用します。<br>

    defaultsのguardをwebからapiに変更してください。<br>
    ※configを修正しますので、変更後にキャッシュクリアをしておきましょう。

    ```php
    'defaults' => [
        'guard' => 'api',
        'passwords' => 'users',
    ],
    ```

3. ### 認証テスト

    routes/api.phpにデフォルトで定義されているルーティングで確認してみます。

    ```php
    Route::middleware('auth:api')->get('/user', function (Request $request) {
        return $request->user();
    });
    ```

    今回はfetchを使い、Authorization: Bearer でトークン渡してみます。<br>
    トークンの渡し方は他にも、GETパラメータで渡す方法などもあります。

    ```javascript
    fetch(serverUrl + '/api/user', {
        method: 'POST',
        headers: {'Authorization': 'Bearer:' + APIトークン},   //ここでトークンを渡します
    })
    .then(response => {
        if (!response.ok) {
            console.log(response);
        } else {
            return response.json().then(data => {
                if('errors' in data){
                    console.log(data.errors);
                } else {
                    console.log(data);  //認証が通るとここでデータが返されます。
                }
            });
        }
    }).catch(error => {
        console.log(error);
    })
    ```

## 終わり

ここまでお疲れ様でした。<br>
今回の記事はLaravel標準のAPI認証処理を実装してみようという内容でした。<br>
今回は標準のGuardを使用しましたが、自作もできるみたいですね。<br>
ただ、セキュリティ周りの処理はセキュリティホールが怖いので、自作はちょっと怖いです（笑）<br>

Passportやjwt-authなどの外部ライブラリを使えばもっと簡単に強固な認証ができそうです。<br>
機会があればそちらも記事にしたいと思います。<br>