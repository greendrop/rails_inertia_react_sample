import { render } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import Index from "@/pages/admin_site/articles/index"
import type { SharedProps } from "@/types/admin_site"
import type { Article, ArticleColumnNames } from "@/types/admin_site/articles"

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
    {
      title: "記事",
      url: "/admin/articles",
      items: [
        {
          title: "記事一覧",
          url: "/admin/articles/list",
        },
      ],
    },
    {
      title: "ダッシュボード",
      url: "/admin/dashboard",
    },
  ],
}

const articles: Article[] = [
  {
    id: 1,
    title: "テスト記事1",
    status: "draft",
    createdAt: "2025-12-01T00:00:00Z",
    updatedAt: "2025-12-01T00:00:00Z",
  },
]

const articleColumnNames: ArticleColumnNames = {
  id: "ID",
  title: "タイトル",
  status: "ステータス",
  createdAt: "作成日",
  updatedAt: "更新日",
}

describe("Index (記事一覧ページ)", () => {
  it("正しくレンダリングされる（スナップショット）", () => {
    const { container } = render(
      <Index
        flash={flash}
        sidebar={sidebar}
        articles={articles}
        articleColumnNames={articleColumnNames}
      />,
    )
    expect(container).toMatchSnapshot()
  })
})
