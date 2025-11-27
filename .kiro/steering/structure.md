# Project Structure

## Organization Philosophy

**Convention over Configuration (CoC) & Layered MVC (Backend) + Inertia/React (Frontend).**

本プロジェクトは、Ruby on RailsをAPIおよびビジネスロジックのバックエンドとして使用し、Inertia.js をデータ転送層として、React を唯一のビュー層として採用します。

- **Backend (Rails)**: Railsの標準構造（CoC & Layered MVC）と慣習に厳密に従い、複雑なロジックは Service Objects や Form Objects へ抽出します。
- **Frontend (Inertia/React)**: ビューのレンダリングはすべてReactコンポーネントで行われます。Railsコントローラは、データの準備とInertiaのレンダリング (inertia_render) のみを担当します。
- **責務の明確化**: Railsはデータ永続化、認証/認可、ビジネスプロセスに専念し、HTML生成の責務からは解放されます。

## Directory Patterns

### Backend: Core Modules
**Location**: `/app/models/`
**Purpose**: 永続化層のロジック、データのバリデーション、アソシエーション、スコープ（クエリメソッド）を格納します。
**Example**: `app/models/user.rb`, `app/models/article.rb`

### Backend: Form Objects
**Location**: `app/forms/`
**Purpose**: 複数のモデルにマッピングされるフォームの送信処理、またはデータベースのテーブルに直接関連しないカスタムなバリデーションロジックを扱います。
**Example**: `app/forms/signup_form.rb`, `app/forms/settings_update_form.rb`

### Backend: Business Services (Service Objects)
**Location**: `app/services/`  
**Purpose**: 複数のモデルに関わる、または外部API呼び出しを含む、複雑なトランザクション処理やビジネスプロセスを格納します。通常、call や perform といった単一のパブリックメソッドを持ちます。
**Example**: `app/services/user_onboarding.rb`, `app/services/payment_processor.rb`

### Backend: Reusable Modules (Concerns)
**Location**: `app/models/concerns/` および `app/controllers/concerns/`
**Purpose**: 複数のモデルやコントローラ間で共有されるロジック（メソッド、ライフサイクルコールバック、認可ルールなど）をモジュールとしてカプセル化します。
**Example**: `app/models/concerns/commentable.rb`, `app/controllers/concerns/authenticatable.rb`

### Frontend: Entrypoints
**Location**: `app/frontend/entrypoints/`
**Purpose**: JavaScriptバンドル（Pack）のエントリーポイントを格納します。主に、Inertiaアプリケーションの初期化、Reactのルートコンポーネントのマウント、グローバルな依存関係のインポート、およびCSS/SCSSファイルの読み込みを行います。
**Example**: `app/frontend/entrypoints/application.jsx` (または .js, .tsx)

### Frontend Pages
**Location**: `app/frontend/pages/`
**Purpose**: InertiaによってマウントされるルートレベルのReactコンポーネントを格納します。これらは、特定のRailsコントローラのアクションに対応する「ページ」全体を表します。
**Example**: `app/frontend/pages/Articles/Index.jsx`, `app/frontend/pages/Auth/Login.jsx`

### Frontend: Components
**Location**: `app/frontend/components/`
**Purpose**: 複数のページで再利用されるUI部品（ボタン、ナビゲーション、フォームフィールドなど）や、特定ページに固有だがロジックを分離したいコンポーネントを格納します。
**Example**: `app/frontend/components/Button.jsx`, `app/frontend/components/Layout.jsx`

### Frontend: Stylesheets
**Location**: `app/frontend/styles/` または `app/assets/stylesheets/`
**Purpose**: プロジェクト全体のCSS定義、Tailwind CSSの設定ファイル、グローバルスタイル、またはテーマ設定ファイルを格納します。使用するCSSフレームワーク（例: Tailwind CSS）によって配置場所は異なります。
**Example**: `app/frontend/styles/globals.css`, `app/assets/stylesheets/application.scss`

### Frontend: Typescript Types
**Location**: `app/frontend/types/`
**Purpose**: TypeScript (TS) を使用する場合、InertiaのPropsやAPIレスポンス、または複雑なオブジェクト構造の型定義（interfaces/types）を集中管理します。これにより、型安全性を高めます。
**Example**: `app/frontend/types/User.ts`, `app/frontend/types/InertiaProps.ts`

## Naming Conventions

### Backend (Ruby/Rails)

- **Files**: `snake_case` (例: `user_onboarding.rb`, `users_controller.rb`)
- **Classes/Modules**: `PascalCase` (例: `UserOnboarding`, `ArticlePresenter`, `UsersController`)
- **Methods/Functions**: `snake_case` (例: `send_welcome_email`, `article_count`, `full_name`)

### Frontend (TypeScript/React)

- **Files**: `PascalCase` または `kebab-case`（コンポーネント以外）
  - **コンポーネント**: `PascalCase` (例: `Button.jsx`, `UserProfile.jsx`)
  - その他: `kebab-case` または `camelCase` (例: `use-fetch-hook.ts`, `utilityFunctions.ts`)
- **Components**: `PascalCase` (例: `PrimaryButton`, `Layout`)
- **Functions/Variables**: `camelCase` (例: `handleSubmit`, `isLoading`)
- **Types/Interfaces**: `PascalCase` (例: `User`, `InertiaProps`)

## Import Organization

### Backend (Ruby/Rails)

```ruby
# Railsにおけるロードのパターン（ほとんどが自動）
# 標準のRailsオートロードが依存関係の大部分を処理します。
class ArticlesController < ApplicationController
  # User モデルの利用に explicit な 'require' は不要
  def index
    articles = Article.all
    # Inertia.js へのデータ渡し
    inertia_render 'Articles/Index', articles: articles
  end
end

# 外部ライブラリや非標準パスのコードには明示的な require が必要です:
require 'csv'
```

**Path Aliases**:
- `app/`: `app/models/`, `app/controllers/`, `app/services/` など、`app/` 以下のすべてのフォルダは、自動的にRubyのロードパスに追加されます（RailsのAutoloading機能）。これにより、プロジェクト内のほとんどのクラスは特別なパス指定なしで参照可能です。

### Frontend (TypeScript/React)

```typescript
// 外部パッケージやコアライブラリ
import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

// 絶対パス (エイリアス設定済み)
import { User } from '@/Types/User';
import Layout from '@/Components/Layout';

// 相対パス (同一ディレクトリ内、または近接コンポーネント)
import { useFormHook } from '../Hooks/useFormHook';
import Button from './Button';
```

**Path Aliases**:
- `@/`: `app/frontend/` (または `app/frontend/` のルート) にマップされます。これにより、`app/frontend` 以下へのインポートは絶対パスで記述でき、階層の深さによる相対パスの記述ミスを防ぎます。

## Code Organization Principles

### コントローラとビューの分離 (Inertia Principle)

コントローラは、データの収集と準備のみを行い、inertia_render でフロントエンドのReactコンポーネントにプロップスとしてデータを渡します。ビューテンプレート (app/views/) は基本的には使用しません。

### サービスオブジェクトへの抽出

複数のモデルを操作する、外部サービスと連携する、または複雑な処理手順を持つビジネスプロセスは、必ず Service Object (app/services/ に配置) へと抽出されます。

### モデルの責務

モデルはデータの永続化、バリデーション、データベースレベルのクエリ (scopes) に責任を持ちます。モデル内の複雑なビジネスロジックは、ActiveModel::Concerns または Service Objectsへ抽出します。

### 依存関係のルール

コアMVCコンポーネントはService Objectsに依存し、Service ObjectsはModelsに依存することが理想です。ModelsがControllerやView（またはPresenter）に直接依存してはいけません。

### テスト駆動開発 (TDD) の推進

これらのパターンに従って作成されたすべてのファイル（Models, Services, Presentersなど）には、対応するテストファイルが必須です。

---
_Document patterns, not file trees. New files following patterns shouldn't require updates_

