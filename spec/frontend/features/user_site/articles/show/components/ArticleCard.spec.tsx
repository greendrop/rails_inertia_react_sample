import { render } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import ArticleCard from "@/features/user_site/articles/show/components/ArticleCard"
import type { Article } from "@/features/user_site/articles/show/types"

describe("ArticleCard", () => {
  it("正しくレンダリングされる（スナップショット）", () => {
    const article: Article = {
      id: 1,
      title: "テストタイトル",
      body: "テスト本文",
    }

    const { container } = render(<ArticleCard article={article} />)

    expect(container).toMatchSnapshot()
  })
})
