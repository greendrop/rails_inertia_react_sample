# Technology Stack

## Architecture

**Monolithic Backend with Hybrid SPA (Inertia.js) Approach.**

システムの核となるのは、標準的なRailsのMVCパターンです。Railsは主にバックエンド（ルーティング、セッション管理、認証、APIとしてのデータ供給）を担当します。

フロントエンドには**React**を採用し、**Inertia.js**を介してRailsと連携させます。これにより、ルーティングはRailsで行いつつ、ページ遷移時にクライアント側でコンポーネントのみをレンダリングする**ハイブリッドSPA（Single Page Application）**の体験を提供し、リッチなUIと高い開発効率を両立します。

## Core Technologies

- **Language**: Ruby, Node.js
- **Framework**: Ruby on Rails, React
- **Runtime**: Ruby, Node.js

## Key Libraries

- **Database Adapter**: pg (PostgreSQL)
- **Web Server**: Puma
- **Frontend Adapter**: Inertia Rails
- **Asset Manager**: Vite
- **Testing**: RSpec, Vitest, React Testing Library
- **UI Library**: Tailwind CSS, shadcn/ui

## Development Standards

### Type Safety

- **Backend**: Rubyは動的型付け言語であるため、静的型チェックは主にRBSを利用して主要なビジネスロジックに導入します。
- **Frontend**: すべてのReactコンポーネント、Hooks、及びユーティリティ関数はTypeScriptで記述し、strictモードを有効にします。any型の使用は厳しく制限されます。

### Code Quality

- **Backend**: RuboCopを使用してコードスタイルと品質を維持します。主要なルールセットはプロジェクトの`.rubocop.yml`に定義されています。
- **Frontend**: ESLintとPrettierを使用してコードスタイルと品質を維持します。主要なルールセットはプロジェクトの`.eslintrc.js`および`.prettierrc`に定義されています。
- **Naming Conventions**: Ruby/RailsではSnake Case (snake_case)を、TypeScript/ReactではCamel Case (camelCase)を厳守します。

### Testing

- **Backend**: RSpecを使用し、モデル、コントローラーの単体テストと統合テストを重視します。
- **Frontend**: Vitestを使用し、ユニットテストと統合テストを実施します。ReactコンポーネントのテストにはReact Testing Libraryを使用します。
- **E2E**: Rspec + Capybaraを使用して、主要なユーザーフローのエンドツーエンドテストを実施します。
- **Coverage**: コードカバレッジツール（例: SimpleCov / Jest Coverage）を導入し、80%以上のカバレッジを最低要件とします。

## Development Environment

### Required Tools

- **Ruby**: 3.4
- **Node.js**: 24
- **Package Manager**: Bundler, npm/yarn
- **Database**: PostgreSQL 15
- **Version Control**: Git

### Common Commands

```bash
# Dev: Backend（Rails）サーバーと、Vite開発サーバーを同時起動
bin/dev

# Build: アセットコンパイル (Productionビルド時のみ)
rails assets:precompile

# Test: Backend及びE2Eテスト実行
bundle exec rspec

# Test: Frontendのテスト実行
npm test
```

## Key Technical Decisions

### Inertia.js + React構成の採用

- **Decision**: バックエンドのRailsをデータ供給・ルーティングに限定し、フロントエンドにReactを採用します。Inertia.jsがサーバーサイドとクライアントサイドを接続するアプローチを採用します。
- **Rationale**: より複雑でリッチなUI/UX、クライアントサイドでの高度な状態管理（例: Redux/Zustand）が求められるため。また、TypeScriptを利用することで、動的なHotwireと比較して大規模開発における堅牢性と保守性を向上させます。Railsのルーティングと認証をそのまま活かせるため、API-only構成より設定が簡素化されます。

### PostgreSQLの採用

- **Decision**: 開発環境、本番環境ともにPostgreSQLをデータベースとして使用します。
- **Rationale**: トランザクション処理の信頼性、JSONB型による柔軟なデータ構造のサポート、および本番環境での利用実績が豊富なため。SQLiteやMySQLよりも高機能で信頼性が高いと判断します。

---
_Document standards and patterns, not every dependency_
