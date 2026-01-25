# 設計（管理画面で記事を編集する）

## 方針
- 既存の管理画面（AdminSite）の構成に沿い、Rails + Inertia + React で記事編集機能を追加する。
- 一覧・詳細・新規作成と整合性のあるURL/コンポーネント構成にする。
- フォームのUI/バリデーション挙動は「記事作成」とできる限り共通化し、差分は初期値と送信先のみとする。

## ルーティング設計
- 定義ファイル: `config/routes/admin_site.rb`
- `resources :articles` に `:edit, :update` を追加する。
  - 例: `resources :articles, only: %i[index show new create edit update]`
- 主なパス
  - 編集フォーム表示: `GET /admin/articles/:id/edit`
  - 更新処理: `PATCH /admin/articles/:id`

## コントローラ設計
- クラス: `AdminSite::ArticlesController`
- アクション追加/仕様
  - `#edit`
    - `article = Article.find(params[:id])`
    - Inertiaレスポンスで編集ページコンポーネントを返す。
    - propsにはフォーム初期値・バリデーションエラー（初回は空）・補助情報（カテゴリやステータス候補など必要に応じて）を含める。
  - `#update`
    - `article = Article.find(params[:id])`
    - Strong Parameters で受け取った値を `article.update` する。
    - 成功時
      - フラッシュ: 「記事を更新しました」（仮: `flash[:notice]`）。
      - 遷移先: 一覧 `/admin/articles` または 詳細 `/admin/articles/:id`（プロジェクト方針に合わせて選択）。
    - 失敗時
      - ステータス: `422 Unprocessable Entity`。
      - 同じ編集コンポーネントをInertiaで再表示し、エラー内容と直前入力値をpropsとして渡す。
- Strong Parameters
  - 許可する属性: `:title, :body, :status, :published_at, :slug, :tags, :category_id, :thumbnail_url`（実際のスキーマ/型に合わせて調整）。
- 認証・認可
  - 既存の `before_action`（例: `authenticate_admin!`）に従う。

## バリデーション/ビジネスルール
- モデル `Article` のバリデーションに依存しつつ、要件を満たすように実装する。
  - タイトル: 必須、最大255文字。
  - 本文: 必須。
  - ステータス: enum `draft` / `published`。
  - スラッグ: 入力されている場合は一意制約。
  - 公開日時とステータスの関係: `published` のときにのみ公開日時を持つ運用ポリシーと整合するようにする（必要であればカスタムバリデーションを利用）。

## フロントエンド設計
- ページコンポーネント
  - パス: `app/frontend/pages/admin_site/articles/edit.tsx`（例）
  - 役割: 記事編集フォームを表示し、Inertia経由で `PATCH /admin/articles/:id` を呼び出す。
- 受け取るprops（例）
  - `SharedProps`（レイアウト共通: フラッシュ、サイドバーなど）。
  - `article`: `{ id, title, body, status, publishedAt, slug, tags, categoryId, thumbnailUrl }`
  - `validationErrors`: フィールドごとのエラー（サーバーから渡される）。
  - 必要に応じて: ステータス選択肢、カテゴリ一覧などのマスターデータ。
- UI構成
  - ページヘッダ: 「記事編集」。
  - フォームフィールド: タイトル・本文・ステータス・公開日時・スラッグ・タグ・カテゴリ・サムネイルURL。
  - ボタン: 「更新」ボタンと「キャンセル」（一覧/詳細へ戻るためのリンク）。
  - エラー表示: 各フィールドの直下にエラーメッセージを表示し、フォーム上部に共通エラーがあればまとめて表示する。
- フォームロジック
  - Inertiaの `useForm` など既存のフォームヘルパを利用し、新規作成フォームと同様のバリデーション表示フローを採用する。
  - 送信時は `form.patch(route("admin_site.articles.update", article.id))` のようにルートヘルパに従う。

## 型定義
- TypeScriptの型ファイルを追加/再利用する。
  - 例: `app/frontend/types/admin_site/articles/edit.ts` に以下を定義。
    - `ArticleEditForm` 型（フォーム用のshape）。
    - `ArticleEditPageProps` 型（SharedProps + フォームprops）。
  - 既に `new` や `show` 用の型が存在する場合は、共通の `ArticleFormFields` 型に切り出し、`new` / `edit` で再利用する。

## エラーハンドリング
- 存在しないID
  - `Article.find(params[:id])` が `ActiveRecord::RecordNotFound` を投げた場合は既存の404ハンドリングに委ねる。
- バリデーションエラー
  - モデルエラーをそのままJSON/propsにマップし、フロントでフィールドに紐づけて表示する。

## ログ/監査（任意）
- 記事更新時に、誰がいつどの記事をどのように変更したかを監査ログに記録できるようにする。
- 既存の監査仕組み（PaperTrailなど）があればそれを利用し、新しく導入する場合は別Specで詳細を定義する。

## テスト設計（概要）
- リクエストスペック
  - `GET /admin/articles/:id/edit` が認可済み管理者に対して200を返し、Inertiaペイロードに編集用propsが含まれること。
  - `PATCH /admin/articles/:id` 正常系: 入力が正しい場合に記事が更新され、リダイレクト＋フラッシュが設定されること。
  - `PATCH /admin/articles/:id` 異常系: バリデーションエラー時に422となり、エラー情報とともに編集画面が再表示されること。
- フロントエンドテスト
  - 編集ページコンポーネントのスナップショットテスト（期待propsで正しくレンダリングされること）。
  - 必須項目未入力時や不正値入力時のエラー表示が期待どおりであること（必要に応じて）。

## 影響範囲
- 記事一覧・詳細・新規作成とのナビゲーション整合性を確認する必要がある。
- 既存のArticleモデルと管理画面レイアウトを流用するため、大きなアーキテクチャ変更は発生しない想定。
