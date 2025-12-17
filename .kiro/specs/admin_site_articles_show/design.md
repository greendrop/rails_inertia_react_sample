# 設計（管理画面で記事詳細を表示する）

## 方針
- Inertia + Rails + React の既存構成に沿って、記事詳細ページを追加する。
- 既存の `AdminSite::ApplicationController` の共有props（flash, sidebar）を活用。
- props生成は一覧と同様の責務分離のため、専用Generatorを用意する。

## バックエンド設計
- ルーティング
  - `config/routes/admin_site.rb`
  - `resources :articles, only: [:index, :show]`
- コントローラ
  - `app/controllers/admin_site/articles_controller.rb`
  - `#show`
    - `article = Article.find(params[:id])`
    - 404: ActiveRecord::RecordNotFound をそのまま発生させ、Rails標準の404応答（もしくは必要なら rescue_from で対応）
    - props生成: `AdminSite::Articles::ShowPropsGenerator.call(article:)`
    - `render inertia: props`（componentは generator 側で `admin_site/articles/show` を返すか、controllerで指定）
- Props Generator
  - `app/models/admin_site/articles/show_props_generator.rb`
  - 入力: `article: Article`
  - 出力: `{ article: { id, title, status, body, createdAt, updatedAt }, articleFieldNames: {...} }`
  - フィールド名（日本語ラベル）: `ID`, `タイトル`, `ステータス`, `本文`, `作成日時`, `更新日時`

## フロントエンド設計
- ページ
  - `app/frontend/pages/admin_site/articles/show.tsx`
  - 受け取るprops
    - `SharedProps`（既存）
    - `article: { id, title, status, body, createdAt, updatedAt }`
    - `articleFieldNames: { id, title, status, body, createdAt, updatedAt }`
  - レイアウト: 既存 `Layout` を利用し、サイドバー表示。
  - 表示
    - タイトル行: ページ見出し「記事詳細」
    - フィールド表示: ラベルと値をテーブルや定義リストで表示
    - 本文表示: 改行保持（`white-space: pre-wrap` などのCSS、または`<pre>`）
    - 日付表示: `new Date(...).toLocaleString()` でローカルタイム。
- 型定義
  - `app/frontend/types/admin_site/articles/show.ts` を作成（`ArticleDetail`, `ArticleFieldNames`）

## 例外・エラー表示
- 404時は既定の404応答。必要に応じてフラッシュに「記事が見つかりません」を設定可能（今回は必須ではない）。

## テスト設計
- リクエストスペック
  - `spec/requests/admin_site/articles/show_spec.rb`
  - 正常系: 作成済み記事に対して200、Inertiaペイロードに期待項目が含まれる
  - 異常系: 存在しないIDで404
- フロントスナップショット
  - `spec/frontend/pages/admin_site/articles/show.spec.tsx`
  - 期待propsでレンダリングし、スナップショット一致を確認

## 影響範囲
- 既存の一覧・ページネーションには非影響。
- 追加ルーティングによる衝突はなし（`show`のみ追加）。

## 実装タスク概要（参考）
- ルーティングへ `:show` 追加
- Controller `#show` 追加
- ShowPropsGenerator 追加
- Front Page `show.tsx` 追加＋型定義
- Request/Frontend テスト追加
