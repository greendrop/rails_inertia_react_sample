import { render } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import type {
  Article,
  ArticleFieldNames,
} from "@/features/admin_site/articles/index/types"
import type { Pagination } from "@/features/admin_site/shared/types"
import Index from "@/pages/admin_site/articles/index"

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

const pageHeaderTitle = "記事一覧"
const noDataLabel = "データがありません。"
const showLinkLabel = "詳細"
const newLinkLabel = "新規作成"
const newLinkHref = "/admin/articles/new"
const destroyButtonLabel = "削除"
const destroyConfirmMessage = "記事を削除しますか？"

const articleFieldNames: ArticleFieldNames = {
  id: "ID",
  title: "タイトル",
  status: "ステータス",
  createdAt: "作成日時",
  updatedAt: "更新日時",
  operations: "操作",
}

describe("Index (記事一覧ページ)", () => {
  describe("記事が空の場合", () => {
    it("正しくレンダリングされる（スナップショット）", () => {
      const articles: Article[] = []
      const pagination: Pagination = {
        currentPath: "/admin/articles",
        currentQueryParameters: {},
        pageParameterName: "page",
        perPageParameterName: "per",
        currentPage: 1,
        perPage: 50,
        totalPages: 0,
        totalCount: 0,
        nextPage: null,
        prevPage: null,
        nextPageLabel: "次へ",
        prevPageLabel: "前へ",
        nextPageAriaLabel: "次のページへ",
        prevPageAriaLabel: "前のページへ",
        isFirstPage: true,
        isLastPage: true,
        isOutOfRange: false,
      }

      const { container } = render(
        <Index
          pageHeaderTitle={pageHeaderTitle}
          articles={articles}
          articleFieldNames={articleFieldNames}
          pagination={pagination}
          noDataLabel={noDataLabel}
          showLinkLabel={showLinkLabel}
          newLinkLabel={newLinkLabel}
          newLinkHref={newLinkHref}
          destroyButtonLabel={destroyButtonLabel}
          destroyConfirmMessage={destroyConfirmMessage}
        />,
      )
      expect(container).toMatchSnapshot()
    })
  })

  describe("記事が存在する場合", () => {
    it("正しくレンダリングされる（スナップショット）", () => {
      const articles: Article[] = [
        {
          id: 1,
          title: "テスト記事1",
          status: "draft",
          createdAt: "2025-12-01T00:00:00Z",
          updatedAt: "2025-12-01T00:00:00Z",
          showLinkHref: "/admin/articles/1",
          destroyLinkHref: "/admin/articles/1",
        },
        {
          id: 2,
          title: "テスト記事2",
          status: "published",
          createdAt: "2025-12-02T00:00:00Z",
          updatedAt: "2025-12-02T00:00:00Z",
          showLinkHref: "/admin/articles/2",
          destroyLinkHref: "/admin/articles/2",
        },
      ]

      const pagination: Pagination = {
        currentPath: "/admin/articles",
        currentQueryParameters: { page: 5 },
        pageParameterName: "page",
        perPageParameterName: "per",
        currentPage: 5,
        perPage: 50,
        totalPages: 10,
        totalCount: 500,
        nextPage: 6,
        prevPage: 4,
        nextPageLabel: "次へ",
        prevPageLabel: "前へ",
        nextPageAriaLabel: "次のページへ",
        prevPageAriaLabel: "前のページへ",
        isFirstPage: false,
        isLastPage: false,
        isOutOfRange: false,
      }

      const { container } = render(
        <Index
          pageHeaderTitle={pageHeaderTitle}
          articles={articles}
          articleFieldNames={articleFieldNames}
          pagination={pagination}
          noDataLabel={noDataLabel}
          showLinkLabel={showLinkLabel}
          newLinkLabel={newLinkLabel}
          newLinkHref={newLinkHref}
          destroyButtonLabel={destroyButtonLabel}
          destroyConfirmMessage={destroyConfirmMessage}
        />,
      )
      expect(container).toMatchSnapshot()
    })
  })
})
