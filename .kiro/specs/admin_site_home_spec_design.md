---
spec: admin_site_home_spec
created: 2025-11-27T21:01:19.571Z
language: ja
---

設計概要
- 目的: 管理画面用のホームページを最小限の変更で追加し、今後の管理機能拡張のためのルートとプレースホルダを用意する。
- 方針: Rails 側でネームスペースルーティングとコントローラを追加し、ビューはプロジェクト構成に応じて Inertia+React コンポーネントを返す（既存構成を尊重）。

構成要素
1. ルーティング
   - 変更ファイル: config/routes.rb
   - 追加内容: 管理ネームスペースのルートを追加し、home#index を root に設定する。
     例:
       scope module: :admin_site, path: '/admin', as: :admin_site do
         root to: 'homes#show'
       end
   - 理由: 管理画面トップへの標準的なアクセスパス (/admin) を提供するため。

2. コントローラ
   - 追加ファイル: app/controllers/admin_site/homes_controller.rb
   - 実装: AdminSite::HomesController を作成し、show アクションで Inertia もしくは通常のレンダーを返す。
     例（Inertia を利用する場合）:
       class AdminSite::HomesController < ApplicationController
         def show
           render inertia: {} # Inertia の自動解決に合わせたコンポーネント名
         end
       end
   - 理由: 将来の機能追加でコントローラ内に権限チェックやデータ準備を追加しやすくするため。

3. ビュー / フロントエンドコンポーネント
   - 追加ファイル候補:
     - app/frontend/pages/admin_site/homes/show.tsx
   - 内容: シンプルにタイトル（例: 「管理ホーム」）を表示する空のプレースホルダ。
   - 理由: フロントエンドが Inertia+React 構成のため、React コンポーネントで統一した方が将来の拡張が容易。

4. テスト
   - 追加: spec/requests/admin_site/homes/show_spec.rb などのリクエストスペック（RSpec）を追加し、GET /admin が 200 を返すことを確認する。
   - 理由: 最小限の回帰防止と受け入れ基準の自動検証のため。

最小実装手順（順序）
1. config/routes.rb に scope module: :admin_site, path: '/admin', as: :admin_site を追加し root to: 'homes#show' を定義する。
2. app/controllers/admin_site/homes_controller.rb を作成し show を実装する（Inertia を使う場合は render inertia を使用）。
3. フロントエンドに空の AdminSite/Homes/Show コンポーネントを追加するか、簡易なビューを配置する。
4. 簡易的なリクエストスペックを追加して 200 とタイトルの存在を検証する。

互換性と注意点
- 既存の認証やレイアウトに影響を与えないよう、ApplicationController の振る舞いを継承する実装とする。
- 既に管理用ネームスペースが存在する場合は衝突を避け、既存方針に合わせてルーティング/コントローラ名を調整する。

受け入れ基準
- GET /admin にアクセスして HTTP 200 が返ること。
- レスポンス内に「管理ホーム」などの識別可能なタイトルが含まれていること。

最小変更での実装案は以上です。