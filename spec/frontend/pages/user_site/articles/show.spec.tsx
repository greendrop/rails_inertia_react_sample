import { render } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import type { Article } from "@/features/user_site/articles/show/types"
import Show from "@/pages/user_site/articles/show"

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

describe("Show (ユーザーサイト 記事詳細ページ)", () => {
  it("正しくレンダリングされる（スナップショット）", () => {
    const article: Article = {
      id: 1,
      title: "記事タイトル",
      body: "記事本文",
    }

    const { container } = render(
      <Show pageHeaderTitle="記事詳細" article={article} />,
    )

    expect(container).toMatchSnapshot()
  })
})
