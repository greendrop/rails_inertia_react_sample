# 管理画面 記事一覧画面 設計（admin_site_articles_index）

## 画面構成
- 記事一覧をテーブル形式で表示
- 各行に以下のカラムを表示：
  - タイトル
  - 作成日
  - 更新日
  - 公開状態

## UI設計
- Reactコンポーネント構成例：
  - ArticlesIndexPage（ページ全体）
    - ArticlesTable（記事一覧テーブル）
      - ArticlesTableRow（記事1件分の行）
- Inertia.js経由でRailsから記事データをpropsとして受け取る

## データ構造
- Article（記事）
  - id: number
  - title: string
  - status: string # 'draft' または 'published' など
  - created_at: datetime
  - updated_at: datetime

## 処理フロー
1. 管理者が記事一覧ページにアクセス
2. RailsコントローラがArticle一覧を取得し、InertiaでReact側にpropsとして渡す
3. React側でpropsを受け取り、テーブルとして表示

## 権限
- 管理者のみアクセス可能（認証・認可は既存仕組みを利用）

## テスト観点
- 記事一覧ページで要件通りのカラムが表示されていること
- データが正しく反映されていること

## 備考
- 検索・並び替え・ページネーションは本設計に含めない
