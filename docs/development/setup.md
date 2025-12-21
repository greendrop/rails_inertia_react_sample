# 開発環境

## 事前準備

以下のツールをインストールしてください。

- [Docker Desktop](https://www.docker.com/ja-jp/products/docker-desktop/)
- [Visual Studio Code](https://azure.microsoft.com/ja-jp/products/visual-studio-code/) (VSCode)

## 開発環境の構築

### 1. リポジトリをクローン

以下のコマンドを実行して、リポジトリをクローンします。

```
git clone git@github.com:greendrop/rails_inertia_react_sample.git
```

### 2. リポジトリのディレクトリをVSCode - Remote Containersで開く

リポジトリのディレクトリを VSCode で開き、画面右下の「><」をクリックして「Reopen in Container」を選択します。

### 3. VSCodeのターミナルでRailsサーバー等を起動

VSCode のターミナルで以下のコマンドを実行して、Rails サーバー等を起動します。

```
bin/dev
```

### 4. ブラウザでアクセス

ブラウザで以下の URL にアクセスします。

```
http://localhost:3000
```
