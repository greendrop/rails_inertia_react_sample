# タスク（管理画面で記事を編集する）

## 実装タスク
- [ ] ルーティング: `config/routes/admin_site.rb` の `resources :articles` に `:edit, :update` を追加する
- [ ] コントローラ: `AdminSite::ArticlesController#edit` を追加し、対象記事を取得してInertiaで編集ページを返す
- [ ] コントローラ: `AdminSite::ArticlesController#update` を追加し、Strong Parameters で受け取った値で記事を更新する
  - [ ] 成功時: フラッシュメッセージを設定し、一覧または詳細ページへリダイレクトする
  - [ ] 失敗時: ステータス422で同じ編集ページをInertiaで再表示し、エラーと入力値をpropsに含める
- [ ] Strong Parameters: `:title, :body, :status, :published_at, :slug, :tags, :category_id, :thumbnail_url` など必要な属性を許可する
- [ ] フロント型定義: `app/frontend/types/admin_site/articles/edit.ts`（または共通のフォーム型）を作成し、編集フォーム用の型を定義する
- [ ] フロントページ: `app/frontend/pages/admin_site/articles/edit.tsx` を作成し、編集フォームUIを実装する
  - [ ] 既存記事の値を初期値として表示する
  - [ ] Inertiaの `useForm` 等を用いてPATCHリクエストで更新を送信する
  - [ ] バリデーションエラーを各フィールドおよび必要に応じてフォーム上部に表示する
  - [ ] キャンセル/戻るボタンで一覧または詳細へ戻れるようにする
- [ ] 必要に応じてカテゴリやステータス候補などのマスターデータをpropsとして渡し、セレクトボックスを実装する

## テストタスク
- [ ] リクエストスペック: `spec/requests/admin_site/articles/edit_update_spec.rb`（または既存ファイルに追記）を作成する
  - [ ] `GET /admin/articles/:id/edit` 正常系: 200 と Inertiaペイロードに編集用propsが含まれることを検証する
  - [ ] `PATCH /admin/articles/:id` 正常系: 入力が正しい場合に記事が更新され、フラッシュとリダイレクトが行われることを検証する
  - [ ] `PATCH /admin/articles/:id` 異常系: バリデーションエラー時に422となり、エラー情報と入力値が含まれた編集ページが再表示されることを検証する
  - [ ] 存在しないID指定時に404相当となることを検証する
- [ ] フロントスナップショット: `spec/frontend/pages/admin_site/articles/edit.spec.tsx` を作成し、編集ページのレンダリング結果をスナップショットで確認する
  - [ ] 必須項目未入力時や不正値入力時にエラー表示が行われることをテストする

## 検証・品質
- [ ] Lint: `npm run lint` / `bundle exec rubocop`（Rubocopがある場合）を実行し、静的解析エラーがないことを確認する
- [ ] 型チェック: `npm run typecheck` を実行し、TypeScriptの型エラーがないことを確認する
- [ ] テスト実行: `bundle exec rspec` と `npm run test` を実行し、既存を含む全テストが成功することを確認する

## 受け入れ条件
- [ ] 管理者が `/admin/articles/:id/edit` から既存の記事を編集し、正常入力時に記事が更新されること
- [ ] 不正な入力時に記事は更新されず、適切なエラーメッセージが表示されること
- [ ] 存在しない記事ID指定時に404相当の応答となり、他機能に影響を与えないこと
- [ ] 既存の一覧・詳細・新規作成機能に影響がないこと（既存テストが継続して成功すること）
