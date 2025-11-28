---
spec: admin_site_home_spec
created: 2025-11-27T23:08:38.504Z
language: ja
---

タイトル: admin_site_home 実装タスク

概要:
- 最小の変更で管理用ホームページを実装し、設計の受け入れ基準（GET /admin が HTTP 200 を返し、表示ページに「管理ホーム」等の識別可能なタイトルが含まれること）を満たす。

タスク一覧（優先度順）:

1. ルーティングを追加する
   - ファイル: config/routes.rb
   - 内容: scope module: :admin_site, path: '/admin', as: :admin_site を追加し、root to: 'homes#show' を定義する。
   - 目的: /admin への GET を管理サイト用コントローラの show アクションへルーティングする。
   - 見積: 0.5h

2. コントローラを作成する
   - ファイル: app/controllers/admin_site/homes_controller.rb
   - 内容: AdminSite::HomesController を作成し、show アクションで Inertia（または通常のレンダー）を返す実装にする。例: render inertia: {} (Inertiaが自動的に `admin_site/homes/show` をコンポーネント名として解決します）
   - 目的: ルーティング先のアクションを実装する。
   - 見積: 0.5h

3. フロントエンドの最小コンポーネントを追加する
   - ファイル: app/frontend/pages/admin_site/homes/show.tsx
   - 内容: 単純な React コンポーネントを配置し、タイトル（例: "管理ホーム"）の表示を行う空のプレースホルダを実装する。
   - 目的: 管理ホームの最小表示を提供し将来の拡張に備える。
   - 見積: 1h

4. リクエストスペックを追加する
   - ファイル: spec/requests/admin_site/homes/show_spec.rb
   - 内容: GET /admin に対して HTTP 200 を返すこと、レスポンスにタイトルが含まれることを確認する RSpec を追加する。
   - 目的: 受け入れ基準を自動検証する。
   - 見積: 0.5h

5. テスト実行と微調整
   - 内容: RSpec を実行し失敗するテストを修正（必要最小限の修正のみ）。既存の認証やネームスペースに影響がないか確認する。
   - 見積: 0.5h

6. 注意点・引継ぎ
   - 内容: 既存の管理用ネームスペースやルーティングに衝突がないか確認すること。既存の認証/レイアウトに影響を与えないよう ApplicationController の振る舞いを尊重する。

受け入れ基準:
- GET /admin が HTTP 200 を返す。
- レスポンス（HTML または Inertia のペイロード）に "管理ホーム" のような識別可能なタイトルが含まれる。
- 追加の実装は最小変更に留められている。

実施順序:
1 → 2 → 3 → 4 → 5

備考:
- 既存の管理用ページやネームスペースがある場合は、本タスクのルーティング名やパスを調整して衝突を回避すること。
- 将来的な拡張（ウィジェット追加、統計表示など）を想定してコントローラ側に拡張点を残す。