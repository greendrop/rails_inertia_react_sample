import { render } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import type {
  Article,
  ArticleFieldNames,
} from "@/features/admin_site/articles/show/types"
import Show from "@/pages/admin_site/articles/show"

vi.mock("@inertiajs/react", async () => {
  const actual: typeof import("@inertiajs/react") =
    await vi.importActual("@inertiajs/react")
  return {
    ...actual,
    Head: () => null,
  }
})

vi.mock("@/hooks/admin_site/usePage", () => {
  return {
    default: () => ({
      props: {
        _inertia_meta: [],
      },
    }),
  }
})

const pageHeaderTitle = "記事詳細"
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
        pageHeaderTitle={pageHeaderTitle}
        article={article}
        articleFieldNames={articleFieldNames}
      />,
    )
    expect(container).toMatchSnapshot()
  })
})
