---
title: "hydraを使ってブルートフォース攻撃をする方法"
path: blog/hydraPHP
tags: [Linux, PHP]
cover: ./Security.png
date: 2021-03-07
excerpt: hydraを使ってブルートフォース攻撃をする方法
---

## 目的

hydraを使ってローカル環境のログインフォームにブルートフォース攻撃をし、脆弱性を確認する。

## 使用環境

- MAC
- MAMP
- hydra
- Homebrew

## hydraとは

hydraはパスワードクラック用のライブラリです。<br>
パスワードリストからブルートフォース攻撃をする際に用いられます。<br>
[公式GitHub](https://github.com/vanhauser-thc/thc-hydra)

## 手順

1. ### hydraのインストール

    hydraの依存関係をbrewコマンドで確認します。

    ```
    brew info hydra
    ```

    ![](./hydra1.png)

    Requiredを確認すると、「libssh」「mysql-client」「openssh」が必須のようです。
    × マークがついていたらインストールしておきましょう。

    ```
    brew install libssh
    brew install mysql-client
    brew install openssh
    ```

    全てにチェックがついたらhydraをインストールします。
    ![](./hydra2.png)

    ```
    brew install hydra
    ```

2. ### PHPでログインフォームの実装

    NAMEとPASSで認証をする、Basic認証のログインフォームをPHPで実装していきます。<br>
    例として、NAMEは「test」、PASSは「test」でMySqlに登録します。
    IDとPASSが一致すると「ログイン成功です」と表示されます。

    ```html
    <html>
        <head>
            <title>ログイン</title>
        </head>
        <body>
            <form action="login_sql.php" method="POST">
                ID: <input type="text" name="name">
                PASS: <input type="text" name="password">
                <input type="submit" value="login">
            </form>
        </body>
    </html>
    ```

    ```php
    <?php
    session_start();
    header('Content-Type: text/html; charset=UTF-8');
    $name = @$_POST['name'];
    $password = @$_POST['password'];

    try {
        $pdo = new PDO('mysql:dbname=hydra;host=localhost;charset=utf8','root','root');
        echo "接続成功\n";
        $sql = 'SELECT * FROM users WHERE name = :name and password = :password';
        // PDOStatementクラスのインスタンスを生成
        $prepare = $pdo->prepare($sql);
        $prepare->bindValue(':name', $name, PDO::PARAM_STR);
        $prepare->bindValue(':password', $password, PDO::PARAM_STR);
        // プリペアドステートメントを実行する
        $prepare->execute();
        // PDO::FETCH_ASSOCは、対応するカラム名にふられているものと同じキーを付けた 連想配列として取得します。
        $result = $prepare->fetchAll(PDO::FETCH_ASSOC);
    } catch (PDOException $e) {
        echo "接続失敗: " . $e->getMessage() . "\n";
        exit();
    }
    ?>

    <html>
    <body>
        <?php
            if(count($result) > 0){
                $_SESSION['id'] = $id;
                echo 'ログイン成功';
            } else {
                echo 'ログイン失敗';
            }
        ?>
    </body>
    </html>
    ```

3. ### hydraでデモ

    hydraで使うパスワードリストをcrunchコマンドで作っていきます。<br>
    デモなので桁数がわかっている体で、4文字の"aaaa"から"zzzz"のパスワードリストを生成しましょう。

    ```
    crunch 4 4 -o password.txt
    ```

    パスワードファイルが作られたら、それを使いhydraでブルートフォース攻撃をしかけます。

    ■hydraの基本構文

    ```
    hydra -l [ユーザ名] -P [パスワード辞書ファイル] [対象サーバ名/対象サーバIPアドレス] [http-get or ssh]
    ```

    今回はPOST通信でlocalhostに向けて攻撃しますので、それに合わせてコマンドを作り実行します。<br>
    詳しいオプションについては[hydra GitHub](https://github.com/vanhauser-thc/thc-hydra)を参考にしてください。

    ```
    hydra -l test -P password.txt 127.0.0.1 http-post-form '/login_sql.php:name=^USER^&password=^PASS^:ログイン失敗です'
    ```

    コマンドを実行するとパスワードリストの全てのパターンを先頭から実行していきます。
    パスワードが一致するとキャプチャのようにパスワードが出力されます。<br>
    「login: test password: test」成功ですね。

    ![](./hydra3.png)
    

## ブルートフォース攻撃への対策

1. ### パスワードの桁数を増やす

    仮に数字のみで4桁のパスワードを設定した場合、10の4乗個で1万通りの組み合わせができます。
    1万通りというのは一見多そうに見えますが、実際ブルートフォース攻撃を仕掛けると、1分前後で全てのパターンが試せてしまいます。<br>
    <br>
    ではどのくらいの桁数にすれば良いかというと、<u style="color: red;">理想は8桁以上です。</u><br>
    また数字のみではなく、英数字を用いることで組み合わせは200兆通りを超え、ブルートフォース攻撃の対策として非常に効果的です。<br>
    パスワードの設定は、ユーザー側の問題でもありますが、システム側でもバリデーションをかけるなどの対策が必要です。

    ```php
    if (mb_strlen(@$_POST['password']) < 8) {
        $_SESSION['flash'] = "8文字以上で入力してください";
        header('Location: http://localhost/');
        exit;
    }
    ```

2. ### ログイン試行回数を制限する
    *回パスワード入力に失敗すると一定時間ロックされるなど、
    ログイン試行回数に制限をかけることでブルートゥース攻撃の効率を下げることができます。<br>
    (ユーザーの打ち間違いを考慮して、私は5回以降を制限していることが多いです。)

    ここで注意が必要なことは、パスワードを総当たりするブルートフォース攻撃とは別に、
    ユーザーIDを総当たりする[リバースブルートフォース攻撃](https://cybersecurity-jp.com/column/40622)という攻撃手法が存在するということです。<br>

    リバースブルートフォース攻撃では、パスワードの入力は失敗しないわけですから、アカウントロックが機能しません。<br>
    リバースブルートフォース攻撃の対策として、アクセスログを監視し、同じIPアドレスから多くのログイン失敗ログがあればブロックする機能も必要となってきます。<br>
    (さらにアクセスログ改ざん対策へと続く...)

3. ### 多要素認証(二段階認証)にする
    IDとパスワードを用いるbasic認証とは別に、秘密の質問やSMSなどを用いることで、セキュリティレベルを高められます。<br>
    また、[Web Authentication](https://developer.mozilla.org/ja/docs/Web/API/Web_Authentication_API) を用いて指紋認証などを導入することも、
    ブルートフォース攻撃への対策となります。