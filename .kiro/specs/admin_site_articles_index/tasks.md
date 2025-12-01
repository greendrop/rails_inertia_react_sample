# 管理画面 記事一覧画面 タスク分解（admin_site_articles_index）

作成日時: 2025-12-01T20:57:00.015Z

## 実装タスク一覧

1. Rails側：記事一覧取得用コントローラアクションの作成（管理者認可を含む）
2. Rails側：InertiaでReactに記事一覧データを渡す処理の実装
3. React側：ArticlesIndexPageコンポーネントの作成
4. React側：ArticlesTableコンポーネントの作成
5. React側：ArticlesTableRowコンポーネントの作成
6. テスト：記事一覧ページの表示・カラム内容のテスト
7. テスト：管理者以外のアクセス制限テスト

## 備考
- 検索・並び替え・ページネーションは含めない
- UI/UXはInertia.js+Reactの標準的な構成とする
