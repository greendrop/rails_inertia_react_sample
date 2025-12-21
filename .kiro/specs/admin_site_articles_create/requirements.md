# 要件: 管理サイトで記事を作成する（Create Article in Admin Site）

## 機能概要
- 管理者が管理サイトの画面から記事を新規登録できる。
- 成功時は一覧または詳細へ遷移し、成功メッセージを表示する。

## データモデル（Article）
- title: string 必須、最大255文字。
- body: text 必須。
- status: enum 必須（draft|published）。
- slug: string 任意（指定時は一意）、未指定時は自動生成。
- published_at: datetime 任意（published時に設定可能）。
- author_id: references AdminUser 必須。
- tags: array/string 任意。
- category_id: references Category 任意。
- thumbnail_url: string 任意。

## バリデーション
- title: 必須、空不可、最大255。
- body: 必須、空不可。
- status: draft/published のみ許可。
- slug: 指定時は一意（ユニーク制約）。
- published_at: status=published の場合は設定可能（draftでは任意）。

## 画面要件（Inertia + React 想定）
- パス: /admin/articles/new（作成フォーム）。
- 入力項目: title, body, status選択, published_at, slug, tags, category, thumbnail_url。
- ボタン: 作成（Submit）、キャンセル（一覧へ戻る）。
- バリデーションエラーは各項目に表示し、サーバー由来のエラーもフォーム上部に表示。

## コントローラ / API 要件（Rails）
- Admin::ArticlesController#create
  - Strong Parameters で上記項目を受け付ける。
  - 作成成功: 200/303で一覧または詳細へ（Inertia redirect）。
  - 作成失敗: 422でエラー内容を返却し、フォームに再表示。
- CSRF 対応、認可フィルタ（before_action）で管理者のみ許可。

## 成功時の動作
- フラッシュ: 「記事を作成しました」。
- 遷移: /admin/articles もしくは /admin/articles/:id。

## 監査 / ログ（任意）
- 作成操作を監査ログへ記録（author_id, 記事ID, 時刻）。

## 国際化（i18n）
- ラベル/メッセージは日本語キーを用意。

## テスト要件
- モデル: バリデーション/ユニーク制約のテスト。
- コントローラ: 成功/失敗ケースのリクエストスペック。
- フロント: フォームの入力/エラー表示のユニットテスト（任意）。
