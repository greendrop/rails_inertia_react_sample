import { render } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import type {
  Article,
  ArticleFieldNames,
} from "@/features/admin_site/articles/show/types"
import Show from "@/pages/admin_site/articles/show"

vi.mock("@/features/admin_site/shared/components/MetaTags", () => {
  return {
    default: () => <div data-testid="meta-tags" />,
  }
})
vi.mock("@/features/admin_site/shared/components/FlashAlert", () => {
  return {
    default: () => <div data-testid="flash-alert" />,
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

const editButtonLabel = "編集"
const editLinkHref = "/admin_site/articles/1/edit"
const destroyButtonLabel = "削除"
const destroyLinkHref = "/admin_site/articles/1"
const destroyConfirmMessage = "記事を削除しますか？"

describe("Show (記事詳細ページ)", () => {
  it("正しくレンダリングされる（スナップショット）", () => {
    const { container } = render(
      <Show
        pageHeaderTitle={pageHeaderTitle}
        article={article}
        articleFieldNames={articleFieldNames}
        editButtonLabel={editButtonLabel}
        editLinkHref={editLinkHref}
        destroyButtonLabel={destroyButtonLabel}
        destroyLinkHref={destroyLinkHref}
        destroyConfirmMessage={destroyConfirmMessage}
      />,
    )
    expect(container).toMatchSnapshot()
  })
})
