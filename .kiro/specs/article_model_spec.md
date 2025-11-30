---
spec: article_model_spec
created: 2025-11-30T03:36:24.121Z
language: ja
---

目的
- 記事（Article）モデルを定義し、管理画面やユーザー画面で記事データを扱うための基盤を準備する。

範囲
- モデル: Article
- 最小実装: マイグレーション、モデル定義（バリデーション含む）、およびモデルスペック（RSpec）

推奨フィールド（最小）
- title: string（必須）
- body: text（必須）
- status: string（例: "draft" / "published"。enum または文字列で実装可）
- published_at: datetime（公開日時、任意）
- timestamps

バリデーション
- title の存在性を検証すること（空でない）
- body の存在性を検証すること（空でない）
- status は許可された値のいずれかであること（enum を用いる場合は enum 定義を行う）

マイグレーション
- 上記フィールドを含むテーブル articles を作成するマイグレーションを用意する。
- published_at にインデックスを張ることを検討する（必要に応じて）。

モデルスペック
- バリデーションのテスト: title と body の存在性、status の許可値を検証する。
- scope/クラスメソッドがある場合は最小の動作確認を追加する（例: published スコープ）。

受け入れ基準
- Article モデルのマイグレーションが作成され、rails db:migrate でテーブルが作成できること。
- Article モデルに必要なバリデーションが定義され、モデルスペックがパスすること。

技術的制約
- 最小変更で実装すること。
- 既存のテーブルやカラム名と衝突しないこと。

次のアクション
- 実装タスクを生成するには /kiro-spec-tasks article_model を実行してください。