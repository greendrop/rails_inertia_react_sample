---
spec: user_site_home_spec
created: 2025-11-28T23:24:38.728Z
language: ja
---

タイトル: user_site_home 実装タスク

概要:
- 最小の変更でユーザー向けホーム（ルート "/" の空ページ）を実装し、設計の受け入れ基準（GET / が HTTP 200 を返し、表示または Inertia ペイロードに "ユーザーホーム" が含まれる）を満たす。

タスク一覧（優先度順）:

1. ルーティングを追加する
   - ファイル: config/routes.rb
   - 内容: UserSite ネームスペース（または単純に root）へ root to: 'homes#show' を追加する。
   - 目的: / への GET を UserSite::HomesController の show アクションへルーティングする。
   - 見積: 0.5h

2. コントローラを作成する
   - ファイル: app/controllers/user_site/homes_controller.rb
   - 内容: module UserSite; class HomesController < ApplicationController; def show; render inertia: {}
   - 目的: ルーティング先のアクションを実装する。
   - 見積: 0.5h

3. フロントエンドの最小コンポーネントを追加する
   - ファイル: app/frontend/pages/user_site/homes/show.tsx
   - 内容: 単純な React コンポーネントでタイトル（例: 「ユーザーホーム」）を表示する空のプレースホルダを実装する。
   - 目的: ユーザーホームの最小表示を提供し将来の拡張に備える。
   - 見積: 1h

4. リクエストスペックを追加する
   - ファイル: spec/requests/user_site/homes/show_spec.rb
   - 内容: GET / に対して HTTP 200 を返すこと、レスポンスにタイトルが含まれること、Inertia を使用する場合は X-Inertia ヘッダ付きの JSON レスポンスに component が含まれることを確認する RSpec を追加する。
   - 目的: 受け入れ基準を自動検証する。
   - 見積: 0.5h

5. テスト実行と微調整
   - 内容: RSpec を実行し失敗するテストを修正（必要最小限の修正のみ）。既存の認証やネームスペースに影響がないか確認する。
   - 見積: 0.5h

6. 注意点・引継ぎ
   - 内容: 既存のルートやネームスペースがある場合は、本タスクのルーティング名やパスを調整して衝突を回避すること。ApplicationController の振る舞い（認証・レイアウト）を尊重する。

受け入れ基準:
- GET / が HTTP 200 を返す。
- レスポンス（HTML または Inertia のペイロード）に  「ユーザーホーム」 のような識別可能なタイトルが含まれる、または JSON の component が 'user_site/homes/show' であること。
- 追加の実装は最小変更に留められている。

実施順序:
1 → 2 → 3 → 4 → 5

備考:
- 既存のユーザー向けページやネームスペースがある場合は、ルーティング名/パスを調整して衝突を回避してください。
- 将来的なウィジェット追加などを想定してコントローラ側に拡張点を残してください。
