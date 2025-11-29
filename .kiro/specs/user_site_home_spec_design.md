---
spec: user_site_home_spec
created: 2025-11-28T23:21:11.442Z
language: ja
---

設計概要
- 目的: ルート "/" にユーザー向けの空のホームページ（プレースホルダ）を最小実装で追加し、将来の機能拡張に備える。
- 方針: 既存の構成を尊重しつつ、最小限のルーティング・コントローラ・ビュー（Inertia+React または HTML）とテストを追加する。

構成要素
1. ルーティング
   - 変更ファイル: config/routes.rb
   - 追加内容: root to: 'homes#show' を UserSite ネームスペース（例: scope module: :user_site, path: '/', as: :user_site もしくは namespace）に追加するか、単純に root を UserSite::HomesController に向ける。
   - 例:
     scope module: :user_site, path: '/', as: :user_site do
       root to: 'homes#show'
     end
   - 理由: ルートを明確に分離して将来のユーザー画面拡張と衝突を避けるため。

2. コントローラ
   - 追加ファイル: app/controllers/user_site/homes_controller.rb
   - 実装: UserSite::HomesController を作成し、show アクションで Inertia レスポンス（render inertia: {}）または通常の HTML を返す。基底クラスは ApplicationController を継承し、必要に応じて UserSite::ApplicationController を追加する。
   - 例（Inertia を使用する場合）:
     module UserSite
       class HomesController < ApplicationController
         def show
           render inertia: {}
         end
       end
     end

3. フロントエンド / ビュー
   - 追加候補:
     - app/frontend/pages/user_site/homes/show.tsx
   - 内容: 単純にタイトル（例: 「ユーザーホーム」）を表示する空のプレースホルダコンポーネント。
   - 理由: クライアント側描画の準備と統一された構成を確保するため。

4. テスト
   - 追加ファイル: spec/requests/user_site/homes/show_spec.rb
   - テスト内容: GET / が HTTP 200 を返すこと、レスポンスに 「ユーザーホーム」 が HTML 内か Inertia ペイロード（component または props）に含まれることを確認する。Inertia を使用する場合は data-page 埋め込み JSON か Accept: application/json と X-Inertia ヘッダでの JSON レスポンスを検証する。

最小実装手順（順序）
1. config/routes.rb にルーティングを追加して root を UserSite::HomesController#show に向ける。
2. app/controllers/user_site/homes_controller.rb を作成し show を実装する（Inertia を使用する場合は render inertia を使う）。
3. フロントエンドに簡単な user_site/homes/show コンポーネントを追加する（タイトル表示）。
4. spec/requests/user_site/homes/show_spec.rb を追加して受け入れ基準を検証する。
5. RSpec を実行し必要最小限の修正を行う。

相互性と注意点
- 既存のルートやネームスペースと衝突しないように、既存の ApplicationController 振る舞いや認証フローを尊重する。
- アプリが Inertia を使用している場合、request spec ではクライアント側の JS 描画後の DOM は確認できないため、Inertia ペイロード（data-page の JSON あるいは JSON レスポンス）とヘッダを検証する。

最小実装案は以上です。承認が得られ次第、/kiro-spec-tasks user_site_home を生成または /kiro-spec-impl user_site_home で実装へ進めます。