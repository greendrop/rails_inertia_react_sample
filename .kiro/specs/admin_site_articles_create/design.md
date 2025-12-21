# 設計: 管理サイトで記事を作成する（Admin Site Articles Create）

## 全体設計
- スタック: Rails (API/Controller) + Inertia + React（フォームUI）
- 権限: 管理者のみ。未認可は403相当で拒否。
- 成功時: フラッシュ通知後に一覧(/admin/articles)または詳細(/admin/articles/:id)へ。

## ルーティング（Rails）
```ruby
# config/routes.rb（概略）
namespace :admin_site do
  resources :articles, only: [:index, :show, :new, :create]
end
```

## モデル（Article）
- カラム: title:string, body:text, status:integer(enum), published_at:datetime
- enum: status { draft: 0, published: 1 }
- バリデーション: title必須(<=255), body必須, status必須

## コントローラ（Rails）
```ruby
# app/controllers/admin/articles_controller.rb（概略）
class Admin::ArticlesController < Admin::BaseController
  before_action :authenticate_admin! # 権限チェック（実装方針に応じて）

  def new
    render inertia: "Admin/Articles/New", props: { errors: {}, now: Time.current }
  end

  def create
    article = Article.new(article_params.merge(author_id: current_admin.id))
    if article.save
      flash[:notice] = t("admin.articles.created")
      redirect_to inertia_path(admin_articles_path) # 一覧へ（必要なら詳細へ）
    else
      render inertia: "Admin/Articles/New", status: :unprocessable_entity,
             props: { errors: article.errors.to_hash, form: article_params }
    end
  end

  private
  def article_params
    params.require(:article).permit(
      :title, :body, :status, :published_at
    )
  end
end
```

## フロント（React/Inertia）
- ページ: resources/js/Pages/Admin/Articles/New.tsx
- 構成: useFormで各項目を管理（title, body, status, slug, published_at, category, tags[], thumbnail_url）
- 送信: post(route("admin.articles.create"))、サーバーの422時はerrorsで各項目に表示
- UI: 入力フォーム + 作成/キャンセルボタン、フラッシュはレイアウトで表示

## CSRF / セキュリティ
- RailsのCSRFトークンをInertia経由で利用（metaタグ/ヘッダ共有）
- Strong Parameters + 権限フィルタでアクセス制御

## DB/インデックス
- statusのデフォルトはdraft、title/bodyはNOT NULL（移行時に調整）

## i18n
- キー例: admin.articles.created: "記事を作成しました"
- ラベル/バリデーションメッセージはja.ymlに定義

## テスト方針
- モデル: バリデーションテスト
- リクエスト: 成功/失敗のテスト
- コンポーネント: 必須項目未入力時のエラー表示（任意）
