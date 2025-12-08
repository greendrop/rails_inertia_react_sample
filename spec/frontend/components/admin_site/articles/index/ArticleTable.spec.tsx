import { render } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import ArticleTable from "@/components/admin_site/articles/index/ArticleTable"
import type {
  Article,
  ArticleColumnNames,
} from "@/types/admin_site/articles/index"

const articles: Article[] = [
  {
    id: 1,
    title: "Test title 1",
    status: "published",
    createdAt: "2020-01-01T00:00:00.000Z",
    updatedAt: "2020-01-02T00:00:00.000Z",
  },
  {
    id: 2,
    title: "Test title 2",
    status: "draft",
    createdAt: "2020-02-01T00:00:00.000Z",
    updatedAt: "2020-02-02T00:00:00.000Z",
  },
]

const articleColumnNames: ArticleColumnNames = {
  id: "ID",
  title: "タイトル",
  status: "ステータス",
  createdAt: "作成日",
  updatedAt: "更新日",
}

describe("ArticleTable", () => {
  it("正しくレンダリングされる（スナップショット）", () => {
    const { container } = render(
      <ArticleTable
        articles={articles}
        articleColumnNames={articleColumnNames}
      />,
    )
    expect(container).toMatchSnapshot()
  })
})
