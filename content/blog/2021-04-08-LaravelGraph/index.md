---
title: "【Laravel】Graph APIでOutlookカレンダーの変更を監視"
path: blog/LaravelGraphApi
tags: [PHP, Laravel, Azure]
cover: ./Azure.png
date: 2021-04-08
excerpt: Graph APIを使用し、LaravelでOutlookカレンダーの変更をwebhookで監視
---

### 目的

Graph APIを使用し、LaravelでOutlookカレンダーの変更をwebhookで監視する。

前提として Azure AD 認証ができる状態になっている体で進めていきます。<br>
まだ済んでいない場合は、下記チュートリアルを完了させてください。<br>
[Microsoft Graph を使って PHP アプリを構築する](https://docs.microsoft.com/ja-jp/graph/tutorials/php)

### 使用環境

- Laravel
- Httpsサーバー (自己証明書不可)

### パッケージ
- [microsoft/microsoft-graph](https://packagist.org/packages/microsoft/microsoft-graph)
- [league/oauth2-client](https://packagist.org/packages/league/oauth2-client)

### 手順

1. #### Graphクライアントの作成

[Microsoft Graph を使って PHP アプリを構築する](https://docs.microsoft.com/ja-jp/graph/tutorials/php)をベースに実装しています。<br>
<br>
ここではアクセストークンの有効期限をチェックし、切れていた場合はリフレッシュトークンからアクセストークンを再発行、
切れていない場合はDB(ログイン中のユーザーモデル)から取得します。<br>
そして、取得したアクセストークンからGraphクライアントを作成し返しています。

```php
use Microsoft\Graph\Graph;

private function getGraph()
{
    // 有効期限チェック
    $now = time();
    if ($this->user->azure_token_expires <= $now) {
        $oauthClient = new \League\OAuth2\Client\Provider\GenericProvider([
            'clientId'                => Config::get('azure.appId'),
            'clientSecret'            => Config::get('azure.appSecret'),
            'redirectUri'             => Config::get('azure.redirectUri'),
            'urlAuthorize'            => Config::get('azure.authority') . Config::get('azure.authorizeEndpoint'),
            'urlAccessToken'          => Config::get('azure.authority') . Config::get('azure.tokenEndpoint'),
            'urlResourceOwnerDetails' => '',
            'scopes'                  => Config::get('azure.scopes')
        ]);
        try {
            // リフレッシュトークンからトークン再発行
            $accessToken = $oauthClient->getAccessToken('refresh_token', [
                'refresh_token' => $this->user->azure_refresh_token
            ]);

            // トークンをDBに保存
            $user = User::find($this->user->id);
            $user->fill([
                'azure_access_token' => $accessToken,
                'azure_refresh_token' => $accessToken->getRefreshToken(),
                'azure_token_expires' => $accessToken->getExpires(),
            ])->save();

        } catch (League\OAuth2\Client\Provider\Exception\IdentityProviderException $e) {
            Log::debug($e->getMessage());
            return;
        }
    } else {
        // アクセストークン取得
        $accessToken = $this->user->azure_access_token;
    }

    $graph = new Graph();
    $graph->setAccessToken($accessToken);
    return $graph;
}
```

2. #### サブスクリプション作成

リソースに発生したときに変更通知を受信するため、リスナーアプリケーションに登録します。<br>
詳しいオプションについては
[公式ドキュメント](https://docs.microsoft.com/ja-jp/graph/api/subscription-post-subscriptions?view=graph-rest-1.0&tabs=http)
をご参照ください。
<br>
※サブスクリプションの有効期限は最大3日(4320分)です。そのため延長する処理も必要です。

```php
use Carbon\Carbon;

public function create_subscribe()
{
    $graph = $this->getGraph();

    $dateTime = new Carbon();
    $dateTime->addDays(3);

    $queryParams = [
        "changeType" => "created, updated, deleted",
        "notificationUrl" => "webhookを受信するURI",
        "resource" => "me/events",
        "expirationDateTime" => $dateTime,
        "clientState" => "SecretClientState",
    ];

    $results = $graph->createRequest('POST', '/subscriptions')
        ->attachBody($queryParams)
        ->execute();
}
```

1. #### webhook受信

リソースが変更された際に受信するリクエストデータから、変更されたイベントデータを取得します。<br>
リクエストデータに含まれる resourceData に変更されたイベントのURIが入っているため、そのURIからイベントデータを取得します。

```php
public function webhook(Request $request)
{
    $request_data = $request['value'][0];
    $graph = $this->getGraph();

    $event = $graph->createRequest('GET', '/' . $request_data['resourceData']['@odata.id'])
        ->setReturnType(Model\Event::class)
        ->execute();

    $event_properties = $event->getProperties();
}
```