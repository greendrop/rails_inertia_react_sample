---
spec: admin_site_articles_destroy_spec
created: 2026-01-22T22:15:32.707Z
language: ja
---

# 設計: 管理画面で記事を削除する（admin_site_articles_destroy）

## 全体方針
- スタック: Rails（コントローラ） + Inertia + React を前提とし、既存の管理画面構成に合わせる。
- 記事削除は **物理削除（hard delete）** とし、論理削除が必要な場合は別specで拡張する。
- 削除操作は一覧・詳細画面から行い、削除後は記事一覧にリダイレクトしてフラッシュメッセージを表示する。

## ルーティング設計
- 既存の管理用ネームスペースに destroy アクションを追加する。
- 例（ネームスペース名は実装時に既存コードに合わせて調整する）:

```ruby
# config/routes.rb（例）
namespace :admin_site do
  resources :articles, only: %i[index show new create destroy]
end
```

- HTTP メソッド: `DELETE /admin_site/articles/:id`（または既存の /admin/articles/:id など）。

## コントローラ設計
- 対象クラス: 既存の管理用 Articles コントローラ（例: `AdminSite::ArticlesController` または `Admin::ArticlesController`）。
- 認証・認可: 既存の before_action（例: `authenticate_admin!` や Pundit/CanCanCan）を利用する。

```ruby
# app/controllers/admin_site/articles_controller.rb（例）
class AdminSite::ArticlesController < AdminSite::BaseController
  before_action :set_article, only: %i[show destroy]

  def destroy
    if @article.destroy
      flash[:notice] = t("admin.articles.destroyed", default: "記事を削除しました")
      redirect_to admin_site_articles_path
    else
      flash[:alert] = t("admin.articles.destroy_failed", default: "記事の削除に失敗しました")
      redirect_to admin_site_articles_path, status: :see_other
    end
  end

  private

  def set_article
    @article = Article.find(params[:id]) # 404 は既存ハンドラに委譲
  end
end
```

- 例外ハンドリング: `ActiveRecord::RecordNotFound` は既存の 404 ハンドリングに従う。
- Strong Parameters: destroy では不要のため追加しない。

## フロントエンド / UI 設計
- 技術スタック: Inertia + React を前提とし、既存の管理レイアウトコンポーネントを利用する。
- 削除トリガーは一覧と詳細の双方に配置する。

### 一覧画面（例）
- 各記事行に「削除」ボタンを追加する。
- 確認ダイアログを表示したうえで、Inertia の `router.delete` で DELETE リクエストを送信する。

```tsx
// app/frontend/pages/admin_site/articles/index.tsx（例）
import { router } from '@inertiajs/react'

function handleDelete(id: number) {
  if (!window.confirm('この記事を削除しますか？')) return
  router.delete(route('admin_site.articles.destroy', id))
}
```

### 詳細画面（例）
- 記事詳細情報の近くに「削除」ボタンを配置し、一覧と同様のハンドラを利用する。
- 削除後の遷移先は常に一覧ページとする（詳細ページに戻らない）。

## UX / メッセージ
- 成功時メッセージ: 「記事を削除しました」（`flash[:notice]`）。
- 失敗時メッセージ: 「記事の削除に失敗しました」（`flash[:alert]`）。
- 削除ボタンは視認性の高いスタイル（例: 危険操作用の赤系ボタン）を使用し、編集ボタンとの差別化を行う。

## セキュリティ・認可設計
- 削除アクションは認証済みかつ管理権限のあるユーザーのみ実行可能とする。
- UI上も、権限のないユーザーには削除ボタンを表示しない（サーバー側の認可チェックは必須）。
- CSRF トークンは既存の Inertia + Rails の仕組みを利用し、DELETE リクエストにも適用されることを確認する。

## エラー・境界ケース
- 対象記事が存在しない場合: 404（`ActiveRecord::RecordNotFound`）を返却し、既存のエラーページを利用する。
- 関連制約などで destroy が false を返した場合: 一覧へリダイレクトしつつエラーフラッシュを表示し、原因調査のためログに詳細を出力する。
- 直接 URL / API クライアントからの DELETE アクセスも同じ認証・認可ロジックを通す。

## テスト設計（概要）
- リクエストスペック
  - 管理者ユーザーで DELETE /admin_site/articles/:id を叩くと、記事件数が 1 減り、一覧へリダイレクト & フラッシュが設定されること。
  - 存在しない ID の場合に 404 となること。
  - 非管理ユーザー / 未ログイン時には既存ポリシーに従って 403 やログインページへリダイレクトされること。
- フロントエンドテスト（任意）
  - 削除ボタン押下時に confirm が表示され、キャンセルするとリクエストが送信されないこと。
  - 成功後に一覧へ遷移し、成功メッセージが表示されること（スナップショットまたは E2E）。

## 実装時の注意
- 既存の管理画面の名前空間（`AdminSite` / `Admin` 等）・ルート名・ Inertia コンポーネント配置に合わせてクラス名・ファイルパスを調整すること。
- 今後の「一括削除」や「論理削除」対応を見据え、destroy ロジックを別メソッドに切り出すなど拡張しやすい構造を心がける。