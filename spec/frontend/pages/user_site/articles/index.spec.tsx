import { render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import type { Article } from "@/features/user_site/articles/index/types"
import Index from "@/pages/user_site/articles/index"

vi.mock("@/features/user_site/shared/components/MetaTags", () => {
  return {
    default: () => <div data-testid="meta-tags" />,
  }
})

vi.mock("@/features/user_site/shared/components/FlashAlert", () => {
  return {
    default: () => <div data-testid="flash-alert" />,
  }
})

vi.mock("@/features/user_site/articles/index/components/Articles", () => {
  return {
    default: () => <div data-testid="articles" />,
  }
})

const pageHeaderTitle = "記事一覧"
const noDataLabel = "記事がありません"
const readMoreLabel = "続きを読む"

describe("Index (ユーザーサイト 記事一覧ページ)", () => {
  describe("記事が空の場合", () => {
    it("正しくレンダリングされる（スナップショット）", () => {
      const articles: Article[] = []

      const { container } = render(
        <Index
          pageHeaderTitle={pageHeaderTitle}
          articles={articles}
          noDataLabel={noDataLabel}
          readMoreLabel={readMoreLabel}
        />,
      )

      expect(container).toMatchSnapshot()
      expect(screen.getByText(noDataLabel)).toBeTruthy()
    })
  })

  describe("記事が存在する場合", () => {
    it("Articles が表示される（スナップショット）", () => {
      const articles: Article[] = [
        {
          id: 1,
          title: "テスト記事1",
          body: "本文1",
          showLinkHref: "/articles/1",
        },
        {
          id: 2,
          title: "テスト記事2",
          body: "本文2",
          showLinkHref: "/articles/2",
        },
      ]

      const { container } = render(
        <Index
          pageHeaderTitle={pageHeaderTitle}
          articles={articles}
          noDataLabel={noDataLabel}
          readMoreLabel={readMoreLabel}
        />,
      )

      expect(container).toMatchSnapshot()
      expect(screen.getByTestId("articles")).toBeTruthy()
    })
  })
})
