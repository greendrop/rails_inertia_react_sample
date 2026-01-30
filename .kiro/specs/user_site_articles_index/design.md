# ユーザー画面 記事一覧画面 設計（user_site_articles_index）

## 画面構成
- ユーザー向けの記事一覧をカードまたはリスト形式で表示するページ。
- 各記事ブロックに以下の要素を表示する：
  - タイトル（リンク）
  - 公開日時（published_at）
  - 本文の冒頭または概要（数行にトランケート）
- 記事が存在しない場合は、空状態メッセージ「表示できる記事がありません」を中央付近に表示する。

## UI設計
- React コンポーネント構成例：
  - UserSiteArticlesIndexPage（ページ全体）
    - ArticlesList（記事一覧コンテナ）
      - ArticleListItem（記事1件分の表示）
- レイアウトは既存のユーザー向けレイアウトコンポーネント（例: Layout や UserLayout）がある場合はそれを利用し、なければ今後の拡張を見据えて共通レイアウトに組み込む。
- 記事タイトルは Inertia のリンクコンポーネント（例: <Link>）でラップし、記事詳細ページへの遷移を行う。

## データ構造
- Article（記事）
  - id: number
  - title: string
  - body: string
  - status: string  # 'draft', 'published' など（article_model の定義に準拠）
  - published_at: datetime | null
- フロントエンドに渡す props 例：
  - articles: Array<{
      id: number;
      title: string;
      body_preview: string; // body からサーバー側またはクライアント側で生成
      published_at: string | null; // ISO8601 文字列
    }>

## 処理フロー
1. ユーザーがユーザー向け記事一覧ページ（例: GET /articles）にアクセスする。
2. UserSite::ArticlesController#index（仮）で、Article モデルから公開状態（published）の記事のみを公開日時降順で取得する。
3. コントローラは取得したデータを整形し、Inertia を通じて UserSiteArticlesIndexPage に props として渡す。
4. React 側で props を受け取り、ArticlesList と ArticleListItem を用いて一覧を描画する。
5. 記事件数が 0 件の場合は、一覧の代わりに空状態メッセージコンポーネントを表示する。

## 権限・公開範囲
- 一般ユーザー向けページとして想定し、公開状態の記事のみを対象とする。
- 認証/認可は既存のユーザーサイトの仕組み（例: before_action など）に従い、本 spec では新たな認証フローを追加しない。

## テスト観点
- 公開記事が存在する場合に、タイトル・概要・公開日時が要件通りに表示されること。
- 公開記事が存在しない場合に、空状態メッセージが表示されること。
- ステータスが下書き（draft）の記事は一覧に表示されないこと。
- 記事タイトルをクリックすると、対応する記事詳細ページへ遷移できること。

## 備考
- ページネーションや検索、タグによる絞り込みは本設計に含めず、必要に応じて別 spec（例: user_site_articles_pagination）で扱う。
- Article モデルの定義やステータスの詳細は .kiro/specs/article_model を参照し、一貫性を保つこと。
