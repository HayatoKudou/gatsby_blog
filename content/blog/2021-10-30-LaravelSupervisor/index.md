---
title: "【Laravel】Supervisor × Queueを使った並列処理のすゝめ"
path: blog/LaravelSupervisor
tags: [Laravel, PHP]
cover: ./Laravel.png
date: 2021-10-30
excerpt: 'Supervisorを使ってマルチプロセス化し、Job/Queue処理の並列化'
---

### はじめに

Laravelの定期バッチが遅すぎてツライ。という問題がありました。<br>
バッチ処理をキューに投入することでバックグラウンドで実行できるようにはなりますが、1キューでの処理速度はたかが知れていました。
そこでワーカープロセス数を増やすことで、キュー数を増やし、並列処理をできるようにしました。<br>
<br>
PHPでの並列処理に明るいわけはないため、記事に間違いがあればご指摘ください(o_ _)o

## 環境

### 環境情報

- Docker
- Nginx
- Laravel
- MySql
- Supervisor

### 環境構築

```properties
$ git clone https://github.com/HayatoKudou/Laravel_Docker_Supervisor
$ cd Laravel_Docker_Supervisor
$ make init
```

.env の  **QUEUE_CONNECTION**, **REDIS_HOST** を変更

```properties
- QUEUE_CONNECTION=sync
+ QUEUE_CONNECTION=redis

- REDIS_HOST=127.0.0.1
+ REDIS_HOST=redis
```

```properties
# appコンテナに入る
$ make app
```

## シングルプロセスで実行

Supervisor を入れていない状態でQueueにJobを投入してみます。<br>
テスト用に下記ファイルを用意しています。<br>
- Jobを呼び出すコマンドファイル(app/Console/Commands/TestCommand.php)
- １秒毎にプロセスIDをログ出力するJobファイル(app/Jobs/TestJob.php)

```php
use App\Jobs\TestJob;

class TestCommand extends Command
{
    ~~ 中略 ~~
    public function handle()
    {
        for ($i = 1; $i <= 10; $i++) {
            TestJob::dispatch(); // Jobを投入
        }
    }
```

```php
class TestJob implements ShouldQueue
{
    ~~ 中略 ~~
    public function handle()
    {
        Log::debug(getmypid()); // プロセスID
        sleep(1);
    }
```

```properties
# ログファイルを監視
$ tail -f storage/logs/laravel.log

# Jobを10件Queue投入
$ php artisan Test

# Queue内のJobを実行
$ php artisan queue:work
```

１秒毎にプロセスIDが出力されることが確認できると思います。<br>
これがシングルプロセスです。

```properties
$ tail -f storage/logs/laravel.log
[2021-10-30 14:05:50] local.DEBUG: 154  
[2021-10-30 14:05:51] local.DEBUG: 154  
[2021-10-30 14:05:52] local.DEBUG: 154  
[2021-10-30 14:05:53] local.DEBUG: 154  
[2021-10-30 14:05:54] local.DEBUG: 154  
[2021-10-30 14:05:55] local.DEBUG: 154  
[2021-10-30 14:05:57] local.DEBUG: 154  
[2021-10-30 14:05:58] local.DEBUG: 154  
[2021-10-30 14:05:59] local.DEBUG: 154  
[2021-10-30 14:06:00] local.DEBUG: 154 
```

## マルチプロセスで実行

マルチプロセスにするため、Supervisorを導入しプロセス数を増やしていきます。<br>
といっても環境構築はDockerファイルで完結しているため、とりあえず動かしてみましょう。

### 準備

1. supervisor起動

```properties
$ make supervisor-start
```

2. supervisorステータス確認

**supervisord is running**と表示されていればOKです。

```properties
$ make supervisor-status
docker-compose exec app service supervisor status
supervisord is running
```

ついでにsupervisorで管理しているプロセスIDの確認をしてみます。<br>
下で解説しますが、8個のプロセス数を起動するよう指定しているので、8個のプロセスが確認できるはずです。

```properties
$ make supervisor-pid-status
docker-compose exec app supervisorctl status
laravel-worker:laravel-worker_00   RUNNING   pid 186, uptime 0:07:01
laravel-worker:laravel-worker_01   RUNNING   pid 187, uptime 0:07:01
laravel-worker:laravel-worker_02   RUNNING   pid 188, uptime 0:07:01
laravel-worker:laravel-worker_03   RUNNING   pid 189, uptime 0:07:01
laravel-worker:laravel-worker_04   RUNNING   pid 190, uptime 0:07:01
laravel-worker:laravel-worker_05   RUNNING   pid 191, uptime 0:07:01
laravel-worker:laravel-worker_06   RUNNING   pid 192, uptime 0:07:01
laravel-worker:laravel-worker_07   RUNNING   pid 193, uptime 0:07:01
```

### 実行

コマンドを実行し、JobをQueueへ投入します。<br>
投入されたJobは supervisorのデーモンプロセスによって即時実行されていきます。

```properties
$ php artisan Test
```

実行結果をログファイルで確認すると、シングルプロセスでは同じプロセスIDだったところが、**make supervisor-pid-status**で確認した、8種類のプロセスIDになっていることが確認でき、
これは supervisor で管理しているプロセスで実行されたことを意味しています。<br>
<br>
また、1件１秒で計10秒かかっていた処理が、2秒で完了するようになっているはずです。(論理上)<br>
これは、8プロセスが8件のJobを並列で処理し、その後、残った2件を先に終わったプロセスが処理したため、1プロセスあたりの最大処理数が2となったためです。

```properties
$ tail -f storage/logs/laravel.log
[2021-10-30 14:37:44] local.DEBUG: 192  
[2021-10-30 14:37:44] local.DEBUG: 189  
[2021-10-30 14:37:44] local.DEBUG: 193  
[2021-10-30 14:37:44] local.DEBUG: 187  
[2021-10-30 14:37:44] local.DEBUG: 188  
[2021-10-30 14:37:44] local.DEBUG: 186  
[2021-10-30 14:37:44] local.DEBUG: 190  
[2021-10-30 14:37:44] local.DEBUG: 191  
[2021-10-30 14:37:45] local.DEBUG: 192  
[2021-10-30 14:37:45] local.DEBUG: 193
```

### supervisor設定周り

Dockerファイルで supervisor のインストールと .conf の設定をしています。

```properties
RUN apt-get -y install supervisor
RUN touch /etc/supervisor/conf.d/laravel-worker.conf
COPY ./infra/docker/php/laravel-worker.conf /etc/supervisor/conf.d/laravel-worker.conf
```

```Properties
[program:laravel-worker]
process_name=%(program_name)s_%(process_num)02d
command=php /work/backend/artisan queue:work redis
autostart=true
autorestart=true
user=root
numprocs=8
redirect_stderr=true
stdout_logfile=/work/backend/storage/logs/worker.log
```

- command: プロセスで実行するコマンド(redis以外でも可)
- user: プロセスを実行するユーザー
- numprocs: 非同期で実行するプロセス数
- stdout_logfil: stdoutの出力先ファイルパス