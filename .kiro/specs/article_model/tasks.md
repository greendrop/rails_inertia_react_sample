---
spec: article_model_spec
created: 2025-11-30T03:38:30.744Z
language: ja
---

タイトル: Article モデル実装タスク

概要:
- 最小変更で Article モデルを追加し、マイグレーション、モデル定義、バリデーション、モデルスペックを用意して受け入れ基準を満たす。

タスク一覧（優先度順）:

1. マイグレーションを作成する
   - ファイル: db/migrate/YYYYMMDDHHMMSS_create_articles.rb
   - 内容: timestamps, title:string (null: false), body:text (null: false), status:integer (default: 'draft'), published_at:datetime
   - 目的: articles テーブルを作成する。
   - 見積: 0.5h

2. モデルを追加する
   - ファイル: app/models/article.rb
   - 内容: バリデーション（title, body の存在性）、status の enum または許可値チェック、必要なら scope (例: published) を追加する。
   - 目的: ドメインロジックとバリデーションを提供する。
   - 見積: 0.5h

3. モデルスペックを追加する
   - ファイル: spec/models/article_spec.rb
   - 内容: title および body の存在性のテスト、status の許可値テスト、published スコープ等の最小動作確認。
   - 目的: モデルの受け入れ基準を自動検証する。
   - 見積: 0.5h

4. マイグレーション実行と確認
   - 内容: rails db:migrate を実行してテーブルが作成できることを確認し、モデルスペックを実行してパスすることを確認する。
   - 見積: 0.5h

注意点・引継ぎ:
- 既存のテーブルやカラム名と衝突しないように注意すること。
- published_at にインデックスを張るかはデータ量と利用方法を考慮して後で判断する。

受け入れ基準:
- マイグレーションが作成され rails db:migrate で articles テーブルが作成されること。
- Article モデルに必要なバリデーションが定義され、モデルスペックがパスすること。

実施順序:
1 → 2 → 3 → 4
