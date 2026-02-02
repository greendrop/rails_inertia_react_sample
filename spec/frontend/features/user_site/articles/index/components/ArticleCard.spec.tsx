import { render } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import ArticleCard from "@/features/user_site/articles/index/components/ArticleCard"
import type { Article } from "@/features/user_site/articles/index/types"

describe("ArticleCard", () => {
  it("正しくレンダリングされる（スナップショット）", () => {
    const article: Article = {
      id: 1,
      title: "テストタイトル",
      body: "テスト本文",
      showLinkHref: "/articles/1",
    }
    const readMoreLabel = "続きを読む"

    const { container } = render(
      <ArticleCard article={article} readMoreLabel={readMoreLabel} />,
    )

    expect(container).toMatchSnapshot()
  })
})
