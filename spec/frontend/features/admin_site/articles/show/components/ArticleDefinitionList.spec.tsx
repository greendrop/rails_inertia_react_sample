import { render } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import ArticleDefinitionList from "@/features/admin_site/articles/show/components/ArticleDefinitionList"
import type {
  Article,
  ArticleFieldNames,
} from "@/features/admin_site/articles/show/types"

const article: Article = {
  id: 1,
  title: "テストタイトル",
  status: "published",
  body: "本文テスト",
  createdAt: "2023-01-01T12:00:00.000Z",
  updatedAt: "2023-01-02T12:00:00.000Z",
}

const articleFieldNames: ArticleFieldNames = {
  id: "ID",
  title: "タイトル",
  status: "ステータス",
  body: "本文",
  createdAt: "作成日時",
  updatedAt: "更新日時",
}

describe("ArticleDefinitionList", () => {
  it("正しくレンダリングされること（スナップショット）", () => {
    const { container } = render(
      <ArticleDefinitionList
        article={article}
        articleFieldNames={articleFieldNames}
      />,
    )
    expect(container).toMatchSnapshot()
  })
})
