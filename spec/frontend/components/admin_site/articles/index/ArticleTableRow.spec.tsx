import { render } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import ArticleTableRow from "@/components/admin_site/articles/index/ArticleTableRow"
import type { Article } from "@/types/admin_site/articles/index"

describe("ArticleTableRow", () => {
  it("正しくレンダリングされる（スナップショット）", () => {
    const article: Article = {
      id: 1,
      title: "Test title",
      status: "published",
      createdAt: "2020-01-01T00:00:00.000Z",
      updatedAt: "2020-01-02T00:00:00.000Z",
    }

    const { container } = render(
      <table>
        <tbody>
          <ArticleTableRow article={article} />
        </tbody>
      </table>,
    )
    expect(container).toMatchSnapshot()
  })
})
