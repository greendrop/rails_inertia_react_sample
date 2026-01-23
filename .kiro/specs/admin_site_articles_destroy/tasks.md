---
spec: admin_site_articles_destroy_spec
created: 2026-01-22T22:17:30.282Z
language: ja
---

# タスク: 管理画面で記事を削除する（admin_site_articles_destroy）

## 概要
- 要件・設計に基づき、管理画面から単一記事を物理削除できるようにする。
- 既存の管理画面（一覧・詳細・認証/認可・Inertia + React）の構成を尊重し、最小限の変更で実装する。

## タスク一覧（優先度順）

1. ルーティングに destroy を追加する
   - ファイル: `config/routes.rb`
   - 内容: 管理用ネームスペース（例: `namespace :admin_site do`）配下の `resources :articles` に `:destroy` を追加する。
   - 目的: `DELETE /admin_site/articles/:id`（または既存パス）で destroy アクションを呼び出せるようにする。

2. コントローラに destroy アクションを実装する
   - ファイル: `app/controllers/admin_site/articles_controller.rb`（または既存の管理用 ArticlesController）
   - 内容:
     - `before_action :set_article, only: %i[show destroy]` を追加（既にあれば再利用）。
     - `destroy` アクションで `@article.destroy` を実行し、成功時は一覧へリダイレクト + フラッシュ（"記事を削除しました"）。
     - 失敗時は一覧へリダイレクトしつつエラーフラッシュを設定する。
   - 目的: サーバーサイドでの削除処理と遷移・メッセージ制御を行う。

3. 認証・認可フィルタの確認・補強
   - ファイル: 同上コントローラ／認可周りの設定ファイル
   - 内容:
     - destroy アクションが既存の `before_action`（例: `authenticate_admin!` やポリシー）対象になっていることを確認。
     - 必要に応じて Pundit / CanCanCan のポリシーに `destroy?` / `:destroy` 権限を追加する。
   - 目的: 管理者以外が削除できないようにする。

4. i18n メッセージを追加する
   - ファイル: `config/locales/ja.yml` など
   - 内容:
     - `admin.articles.destroyed: "記事を削除しました"`
     - `admin.articles.destroy_failed: "記事の削除に失敗しました"`
   - 目的: フラッシュメッセージを既存の i18n 方針に合わせる。

5. 一覧画面に削除ボタンを追加する
   - ファイル: `app/frontend/pages/admin_site/articles/index.tsx`（または既存の一覧コンポーネント）
   - 内容:
     - 各記事行に「削除」ボタン（またはリンク）を追加する。
     - クリック時に `window.confirm('この記事を削除しますか？')` を表示し、承認された場合に Inertia の `router.delete` で destroy ルートへリクエストを送信する。
   - 目的: 管理者が一覧から直接削除操作できるようにする。

6. 詳細画面に削除ボタンを追加する（任意だが推奨）
   - ファイル: `app/frontend/pages/admin_site/articles/show.tsx`（または既存の詳細コンポーネント）
   - 内容:
     - 記事情報付近に「削除」ボタンを配置し、一覧と同じ削除ハンドラを利用する。
     - 削除後の遷移先は一覧ページとする。
   - 目的: 詳細閲覧中からも削除操作を行えるようにする。

7. リクエストスペックを追加する
   - ファイル: `spec/requests/admin_site/articles/destroy_spec.rb`（パスは既存規約に合わせる）
   - 内容:
     - 正常系: 管理者ユーザーで `DELETE /admin_site/articles/:id` を呼び出すと、Article 件数が 1 減り、一覧へリダイレクトし、フラッシュに成功メッセージが設定されることを検証。
     - 異常系: 存在しない ID で 404 となること、未ログイン/権限なしユーザーの場合は既存ポリシーどおりのレスポンスになることを検証。
   - 目的: 受け入れ基準を自動テストで担保する。

8. フロントエンドの簡易テストまたは動作確認
   - ファイル: フロントエンドのテストファイル（存在する場合）または手動確認手順
   - 内容:
     - 削除ボタン押下時に confirm が表示されること。
     - キャンセル時にはリクエストが送信されないこと、OK 時に記事が一覧から消えることを確認。
   - 目的: UX/挙動が設計どおりであることを確認する。

9. 既存機能との統合確認
   - 内容:
     - 既存の記事一覧・詳細・作成・ページネーション機能の画面遷移とテストを実行し、削除機能追加による副作用がないことを確認する。
   - 目的: 既存機能への影響を最小化し、回帰を防ぐ。