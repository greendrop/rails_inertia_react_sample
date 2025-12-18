import { render } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import ArticleTableRow from "@/features/admin_site/articles/index/components/ArticleTableRow"
import type { Article } from "@/features/admin_site/articles/index/types"

describe("ArticleTableRow", () => {
  it("正しくレンダリングされる（スナップショット）", () => {
    const article: Article = {
      id: 1,
      title: "Test title",
      status: "published",
      createdAt: "2020-01-01T00:00:00.000Z",
      updatedAt: "2020-01-02T00:00:00.000Z",
      showLinkHref: "/admin_site/articles/1",
    }

    const { container } = render(
      <table>
        <tbody>
          <ArticleTableRow article={article} showLinkLabel="詳細" />
        </tbody>
      </table>,
    )
    expect(container).toMatchSnapshot()
  })
})
