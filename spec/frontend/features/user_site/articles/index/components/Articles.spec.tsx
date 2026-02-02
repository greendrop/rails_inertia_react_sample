import { render } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import Articles from "@/features/user_site/articles/index/components/Articles"
import type { Article } from "@/features/user_site/articles/index/types"

describe("Articles", () => {
  it("正しくレンダリングされる（スナップショット）", () => {
    const articles: Article[] = [
      {
        id: 1,
        title: "テストタイトル1",
        body: "テスト本文1",
        showLinkHref: "/articles/1",
      },
      {
        id: 2,
        title: "テストタイトル2",
        body: "テスト本文2",
        showLinkHref: "/articles/2",
      },
    ]

    const { container } = render(
      <Articles articles={articles} readMoreLabel="続きを読む" />,
    )

    expect(container).toMatchSnapshot()
  })
})
