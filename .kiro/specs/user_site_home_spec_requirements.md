---
spec: user_site_home_spec
created: 2025-11-28T23:15:36.519Z
language: ja
---

目的
- ユーザー向けホーム（ルート / ）を最小実装として追加し、将来的な機能拡張のためのルートとプレースホルダ表示を確保する。

範囲
- ルート: /
- 最小実装: Rails コントローラ（UserSite::HomesController など）と Inertia+React または通常の HTML レンダリングによる空のプレースホルダ（タイトル表示のみ）

要件
1. GET / にアクセスすると HTTP 200 を返すこと。
2. レスポンスには識別可能なタイトル（例: 「ユーザーホーム」）または Inertia ペイロードの component 名が含まれること。
3. 既存の認証やレイアウトに悪影響を与えないこと（ApplicationController の振る舞いを尊重する）。
4. 最小変更で実装すること。

受け入れ基準
- GET / が HTTP 200 を返す。
- レスポンスの HTML または Inertia JSON に「ユーザーホーム」が含まれること、または component が user_site/homes/show であること。

技術的制約
- 既存のネームスペースやルーティングに衝突しないこと。
- テスト（RSpec）の追加により受け入れ基準を自動検証すること。

備考
- 実装手順とタスクは .kiro/specs/user_site_home_spec_tasks.md に定義する。
