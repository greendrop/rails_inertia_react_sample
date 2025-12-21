# タスク: 管理サイトで記事を作成する（Admin Site Articles Create）

## 1. ルーティング
- `config/routes.rb`
  - `namespace :admin_site do; resources :articles, only: [:index, :show, :new, :create]; end`

## 2. コントローラ
- `app/controllers/admin_site/articles_controller.rb`
  - new: Inertiaで `Admin/Articles/New` を表示（props: errorsなど）
  - create: `Article.new(article_params.merge(author_id: current_admin.id))`
    - 成功: フラッシュ(`t('admin.articles.created')`)→一覧へリダイレクト
    - 失敗: status:422でエラーをpropsへ、フォーム再表示
  - Strong Parameters: `:title, :body, :status, :published_at`

## 3. フロント（React/Inertia）
- ページ: `resources/js/Pages/Admin/Articles/New.tsx`
  - useFormでフォーム状態管理（title, body, status, published_at）
  - 送信: `post(route('admin_site.articles.create'))`
  - 422時: `errors` を各項目に表示、サーバーエラーは上部に表示
  - UI: 作成/キャンセルボタン、フラッシュはレイアウトで表示

## 4. CSRF/セキュリティ
- InertiaのCSRFトークン連携（meta/ヘッダ）を確認
- 権限フィルタで管理者のみ許可

## 5. i18n
- `config/locales/ja.yml`: `admin.articles.created: "記事を作成しました"` などを追加
- フォームラベル/エラーメッセージのキー整備

## 6. テスト
- モデル: バリデーションテスト
- リクエスト: 成功/失敗のテスト
- フロント（任意）: 必須項目未入力時のエラー表示

## 7. 受け入れ条件（AC）
- 管理者は記事を新規作成でき、成功メッセージが表示され一覧へ遷移する
- 入力不備時は項目ごとにエラー表示され、内容は保持される
- slugが重複しないよう自動生成・一意制約が機能する
