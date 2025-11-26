# Project Context

## Purpose

このプロジェクトは、Ruby on Railsをバックエンド、Inertia.jsとReactをフロントエンドに採用したモダンなブログアプリケーションのサンプル実装を目的とします。
主なゴールは、Railsの堅牢な機能と、Reactによるリッチなクライアントサイド体験を、Inertia.jsを通じてシームレスに統合するベストプラクティスを確立することです。

## Tech Stack

### Backend

- Ruby
- Ruby on Rails

### Frontend

- TypeScript
- React
- Inertia.js
- Tailwind CSS
- shadcn/ui

## Project Conventions

### Code Style

#### Backend

- RuboCopを使用し、標準的なRubyスタイルガイドに準拠

#### Frontend

- PrettierとESLintを使用し、標準的なTypeScriptのスタイルルールに準拠

### Architecture Patterns

#### Backend

- MVC (Model-View-Controller)パターンを厳守し、ビジネスロジックはModelにカプセル化
- コントローラーはJSONレスポンスではなく、inertia_renderを使用してReactコンポーネント（ページ）を返すこと

#### Frontend

- ページコンポーネントはInertiaの仕様に従い、RailsからPropsを受け取り
- 状態管理は主にReact Hooks（useState, useContext, useReducer）を使用

### Testing Strategy

#### Backend

- RSpecを使用し、モデル（ビジネスロジック）にはユニットテストを、コントローラーおよび統合レイヤーにはリクエストスペックまたはフィーチャスペックを記述
- カバレッジ目標は80%以上

#### Frontend

- VitestとReact Testing Libraryを使用し、主要なカスタムフックと複雑なUIコンポーネントに対してユニットテストを実施

### Git Workflow

#### Branching Strategy

- GitHub Flowを採用し、mainブランチは常にデプロイ可能な状態を維持
- 新機能や修正はfeature/xxxxまたはfix/xxxxから切ったブランチで行い、完了後にPull Requestを作成してレビューとマージを実施

#### Commit Conventions

- Conventional Commitsを採用
  - 例: `feat: add post creation functionality` `fix: correct post date formatting`

## Domain Context

### Article

- 記事コンテンツを表す主要なエンティティ。タイトル、本文、下書き/公開、公開日時の状態を持つ
- 作成者やアカウントシステムはこのサンプルでは省略

### Inertia Shared Data

- フラッシュメッセージ、アプリ設定などのグローバルデータは、InertiaのShared DataとしてRailsから全ページに提供

## Important Constraints

### Technical Constraints

- Inertia.jsを利用するため、従来のViewテンプレート（ERBなど）は使用せず、全てのページレンダリングはReactコンポーネント経由で行う

### Performance Constraints

- ブログ用途であるため、初期ロードの体感速度を重要視し、バンドルサイズの最適化に努める

### Design Constraints

- UIはshadcn/uiのコンポーネントとTailwind CSSをベースに構築し、カスタムCSSの使用は最小限に抑える

## External Dependencies

### Database

- ローカル開発環境を含め、PostgreSQLを使用

### Deployment

- VPS (Virtual Private Server) へのデプロイを想定
- バックエンドのRailsサーバー、フロントエンドのビルド、Nginxなどのウェブサーバー設定、およびアセット配信の全てをVPS環境下で構築・管理することを前提
