# タスク（管理画面で記事詳細を表示する）

## 実装タスク
- [ ] ルーティング: `config/routes/admin_site.rb` に `resources :articles, only: [:index, :show]` を設定
- [ ] コントローラ: `AdminSite::ArticlesController#show` を追加（`Article.find(params[:id])`、Inertiaでレンダリング）
- [ ] Props Generator: `app/models/admin_site/articles/show_props_generator.rb` を作成
  - [ ] 入力: `article: Article`
  - [ ] 出力: `article`, `articleFieldNames` を含むprops
- [ ] 型定義: `app/frontend/types/admin_site/articles/show.ts` を作成（`ArticleDetail`, `ArticleFieldNames`）
- [ ] フロントページ: `app/frontend/pages/admin_site/articles/show.tsx` を作成
  - [ ] `Layout` を使用し、`SharedProps` と受け取った `article` を表示
  - [ ] 本文は改行保持（CSS `white-space: pre-wrap` 等）
  - [ ] 日付は `toLocaleString()` で表示

## テストタスク
- [ ] リクエストスペック: `spec/requests/admin_site/articles/show_spec.rb`
  - [ ] 正常系: 200 と Inertiaペイロード検証
  - [ ] 異常系: 存在しないIDで404
- [ ] フロントスナップショット: `spec/frontend/pages/admin_site/articles/show.spec.tsx`
  - [ ] 期待propsでレンダリングしスナップショット一致

## 検証・品質
- [ ] Lint: `npm run lint` / `bundle exec rubocop`（Rubocopがある場合）
- [ ] 型チェック: `npm run typecheck`
- [ ] テスト実行: `bundle exec rspec` と `npm run test`

## 受け入れ条件
- [ ] `/admin/articles/:id` で記事詳細が表示される
- [ ] 存在しないIDでは404が返る
- [ ] 既存機能に影響がない（既存テストが継続成功）
