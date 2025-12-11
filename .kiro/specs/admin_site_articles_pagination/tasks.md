# タスク計画: 管理画面の記事一覧にページネーションを追加

## 背景 / 目的
- 管理サイトの記事一覧にページネーションを導入し、表示件数が多い場合でもパフォーマンスとUXを確保する。
- 現状は `limit(50)` の固定表示で、クエリパラメータによるページ移動ができない。

## スコープ
- 対象画面: AdminSite::Articles#index（/admin_site/articles）
- サーバーサイドのページネーション実装、Inertia経由のprops拡張、フロントのUI追加、およびテスト一式。

## 方針
- 依存ライブラリは導入せず、ActiveRecordの `limit`/`offset` によるサーバーサイドページネーションで実装。
  - 将来的に Pagy/Kaminari 等へ置換しやすい構造にする。
- 1ページあたり件数は `per=20` をデフォルトとし、クエリで上書き可能（許容値: 10/20/50）。
- 不正な `page`/`per` は安全なデフォルトへフォールバックする。

## 実装タスク

### Backend
1. Controller: `AdminSite::ArticlesController#index`
   - `page = params[:page].to_i`（1未満は1へ）
   - `per = params[:per].to_i`（許容値[10,20,50]でなければ20へ）
   - `total_count = Article.count`、`total_pages = (total_count / per.to_f).ceil`
   - `articles = Article.order(created_at: :desc).limit(per).offset((page - 1) * per)`
   - Inertia props に `pagination` を追加: `{ page, per, totalCount, totalPages, hasPrev, hasNext }`
   - N+1 の懸念がある場合は `includes` を検討（現状は不要想定）。

2. PropsGenerator: `AdminSite::Articles::IndexPropsGenerator`
   - 既存の `articles`/`articleColumnNames` に加え、`pagination` を受け取り返すよう対応。
   - 変換処理は既存の構造を維持し、責務は最小限に。

3. 設定/定数
   - `DEFAULT_PER = 20` を AdminSite Articles の適切な名前空間に定義（例: `AdminSite::Articles::Pagination`）。
   - 許容 `PER_SET = [10, 20, 50]` を定義。

### Frontend
4. 型定義
   - `app/frontend/types/admin_site/articles.ts` に `Pagination` 型を追加。
   - Index ページの props 型に `pagination: Pagination` を追加。

5. UI コンポーネント
   - 新規 `Pagination` コンポーネントを作成（Prev/Next、ページ番号の簡易表示）。
   - `aria-label`、`aria-current` 等を設定し、キーボード操作可能に。
   - 記事一覧テーブル下部に配置。

6. ページ遷移
   - Inertia の遷移で `page`/`per` をクエリとして送信。
   - `preserveState: true`、`preserveScroll: true` を指定。
   - URL に `?page=n&per=m` が反映され、リロードで状態が復元されること。

### テスト
7. Request spec（`spec/requests/admin_site/articles/index_spec.rb` 付近）
   - `page=1/2`、境界（最終ページ）、異常値（`page<=0`、過大 `page`、不正 `per`）で件数とメタが正しいこと。

8. System spec（`spec/system/admin_site/articles/index_spec.rb`）
   - ページングUIの表示・動作（Next/Prev、ページ番号クリック）。
   - URLクエリの反映とリロードでの再現性。

9. 単体テスト
   - PropsGenerator: `pagination` メタの構築が期待通りであること。
   - Frontend: Pagination コンポーネントのレンダリングとイベント動作。
   - スナップショットの更新（該当箇所）。

### アクセシビリティ / UX
10. アクセシビリティ
   - `aria-label` の付与、現在ページに `aria-current="page"`。
   - フォーカスリング、タブ移動で操作可能。

11. UX
   - 件数が1ページ分以下の場合はUIを非表示。
   - 多数ページ時は端を省略表示（例: `1 … 5 6 [7] 8 9 … n`）は将来実装とし、今回は Prev/Next に限定しても可。

### パフォーマンス / エラーハンドリング
12. パフォーマンス
   - `count(:all)` のコストに留意。必要に応じて将来キャッシュ検討（今回は非スコープ）。

13. エラーハンドリング
   - 不正 `page`/`per` はフォールバック、例外は出さない。

## 作業順序（推奨）
1. Backend 実装（controller/props）
2. Request spec 追加/更新
3. Frontend 型/コンポーネント実装
4. Frontend 単体テスト・スナップショット更新
5. System spec 追加/更新

## 受け入れ条件（Acceptance Criteria）
- /admin_site/articles を開くと既定で20件表示される。
- 21件以上存在する場合、ページングUIが表示され、Next/Prev が正しく動作する。
- URL に `?page=n&per=m` が反映され、リロードしても同じ状態になる。
- Inertia の props に `pagination` メタが含まれる。
- 追加したテストがグリーンである。