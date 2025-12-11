# 設計: 管理画面の記事一覧にページネーションを追加

作成日時: 2025-12-11T07:18:21.444Z

概要
- 管理画面の一覧にサーバーサイドページネーションを実装し、Inertia + React 側でページナビゲーションを表示する。

採用方針
- サーバーサイド: Kaminari を利用する（既存プロジェクトへの導入が容易で、Inertia と組み合わせたレスポンスのページ情報取得が簡単）。
- フロントエンド: 既存の管理画面 React コンポーネントに Pagination コンポーネントを追加し、query parameter (page) で現在ページを保持する。

API/コントローラ設計
- Admin::ArticlesController#index
  - params: page, per_page (任意)
  - 実装例: articles = Article.includes(:author).order(created_at: :desc).page(params[:page]).per(params[:per_page] || 20)
  - レスポンスに以下のページ情報を含める: current_page, total_pages, total_count, per_page
  - Inertia レスポンス例: Inertia.render('Admin/Articles/Index', props: { articles: articles, meta: articles.try(:metadata) || { current_page: ..., total_pages: ... } })

フロントエンド設計
- Pagination コンポーネント
  - props: current_page, total_pages, per_page
  - 表示: 前へ/次へボタン、ページ番号リスト（必要に応じて省略表現）
  - 操作: ページ移動時は Inertia のルーターを用いて query param を更新し、ページ内容を取得する。
  - アクセシビリティ: ボタンに aria-label を付与、キーボードで操作可能にする。

テスト計画
- コントローラテスト: page パラメータを変えて返却される件数と meta 情報を検証。
- システム/統合テスト: 管理画面でページ移動が行えること、URL に page が反映されること、境界条件（最初/最後のページ）を検証。

導入手順とタスク
1. Kaminari を導入（Gemfile の追記、bundle install）。
2. Admin::ArticlesController#index の実装/更新。
3. 必要な includes を追加して N+1 を防止。
4. Inertia/React 側に Pagination コンポーネントを追加。
5. テスト実装と実行。

備考
- Kaminari 未導入で別の方針を希望する場合は limit/offset を直接使った実装も選択可能。
