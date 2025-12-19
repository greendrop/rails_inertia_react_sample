import { render } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import type {
  Article,
  ArticleFieldNames,
} from "@/features/admin_site/articles/show/types"
import Show from "@/pages/admin_site/articles/show"
import type { SharedProps } from "@/types/admin_site"

vi.mock("@inertiajs/react", async () => {
  const actual: typeof import("@inertiajs/react") =
    await vi.importActual("@inertiajs/react")
  return {
    ...actual,
    Head: () => null,
  }
})

const flash: SharedProps["flash"] = {}

const sidebar: SharedProps["sidebar"] = {
  contentItems: [
    { title: "記事", url: "/admin/articles", items: [] },
    { title: "ダッシュボード", url: "/admin/dashboard" },
  ],
}
const headTitle = "記事詳細 | Admin Site"
const pageHeaderTitle = "記事詳細"
const breadcrumb = {
  items: [
    { key: "homes#show", label: "ホーム", href: "/admin", isActive: false },
    {
      key: "articles#index",
      label: "記事一覧",
      href: "/admin/articles",
      isActive: false,
    },
    {
      key: "articles#show",
      label: "記事詳細",
      href: "/admin/articles/1",
      isActive: true,
    },
  ],
}

const article: Article = {
  id: 1,
  title: "テスト記事",
  status: "draft",
  body: "本文\n改行",
  createdAt: "2025-12-01T00:00:00Z",
  updatedAt: "2025-12-01T00:00:00Z",
}

const articleFieldNames: ArticleFieldNames = {
  id: "ID",
  title: "タイトル",
  status: "ステータス",
  body: "本文",
  createdAt: "作成日時",
  updatedAt: "更新日時",
}

describe("Show (記事詳細ページ)", () => {
  it("正しくレンダリングされる（スナップショット）", () => {
    const { container } = render(
      <Show
        flash={flash}
        sidebar={sidebar}
        headTitle={headTitle}
        pageHeaderTitle={pageHeaderTitle}
        breadcrumb={breadcrumb}
        article={article}
        articleFieldNames={articleFieldNames}
      />,
    )
    expect(container).toMatchSnapshot()
  })
})
