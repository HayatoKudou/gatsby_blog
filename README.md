## このソースはGastbyスターターをベースに作成しています。

[参照元](https://github.com/rolwin100/rolwinreevan_gatsby_blog)<br>

Thank you Rolwin!😚

## クイックスタート

1.  プロジェクトを複製し、依存関係パッケージをインストールします。

    ```shell
    
    git clone https://github.com/HayatoKudou/gatsby_blog
    cd gatsby_blog 
    npm install
    ```

2. developモードで開発


    ```shell
    gatsby develop
    ```

## ディレクトリ構成

Gatsbyプロジェクトに表示されるトップレベルのファイルとディレクトリを確認します。

    .
    ├── content
    ├── node_modules
    ├── src
    ├── static
    ├── .eslintrc
    ├── .example.env
    ├── .gitignore
    ├── .prettierrc
    ├── config.js
    ├── gatsby-browser.js
    ├── gatsby-config.js
    ├── gatsby-config.plugins.js
    ├── gatsby-node.js
    ├── gatsby-ssr.js
    ├── LICENSE
    ├── package-lock.json
    ├── package.json
    └── README.md

1.  **`/node_modules`**: このディレクトリには、プロジェクトが依存するコードのすべてのモジュール（npmパッケージ）が自動的にインストールされます。

2.  **`/src`**: このディレクトリには、サイトヘッダーやページテンプレートなど、サイトのフロントに表示されるものに関連するすべてのコードが含まれます。

3.  **`.gitignore`**: このファイルは、バージョン履歴を追跡しない/維持しないファイルをgitに通知します。

4.  **`.prettierrc`**: これは[Prettier](https://prettier.io/)の設定ファイルです。Prettierは、コードのフォーマットの一貫性を保つのに役立つツールです。

5.  **`config.js`**: サイトに必要なすべての構成変数がこのファイルに追加されます。

6.  **`gatsby-config.js`**: これはGatsbyサイトのメイン構成ファイルです。ここで、サイトのタイトルや説明、含めるGatsbyプラグインなど、サイトに関する情報（メタデータ）を指定できます（詳細については、構成[ドキュメント](https://www.gatsbyjs.org/docs/gatsby-config/)を確認してください）。

7.  **`gatsby-config.plugins.js`**: このファイルには、gatsby-config.jsで使用されるプラグイン構成が含まれています。モジュール化の目的でこれを行います。

8.  **`gatsby-node.js`**: このファイルは、GatsbyがGatsby Node APIの使用法を見つけることを期待している場所です。これらにより、サイト構築プロセスの一部に影響を与えるデフォルトのGatsby設定のカスタマイズ/拡張が可能になります。

9.  **`gatsby-ssr.js`**: このファイルは、GatsbyがGatsbyサーバー側レンダリングAPIの使用法を見つけることを期待している場所です。これらにより、サーバー側のレンダリングに影響を与えるデフォルトのGatsby設定をカスタマイズできます。

10.  **`LICENSE`**: GatsbyはMITライセンスの下でライセンスされています。

11. **`package-lock.json`** これは、プロジェクトにインストールされたnpm依存関係の正確なバージョンに基づいて自動的に生成されたファイルです。（このファイルを直接変更することはありません）。

12. **`package.json`**: Node.jsプロジェクトのマニフェストファイル。メタデータ（プロジェクトの名前、作成者など）などが含まれます。このマニフェストは、npmがプロジェクトにインストールするパッケージを確認するファイルです。

13. **`README.md`**: プロジェクトに関する有用な参照情報を含むテキストファイルです。

14. **`content`**: これは、ブログのマークダウンを書き込むフォルダーです。

<!-- AUTO-GENERATED-CONTENT:END -->
