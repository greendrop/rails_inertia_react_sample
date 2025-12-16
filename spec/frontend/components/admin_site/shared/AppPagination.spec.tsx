import { render } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import AppPagination from "@/components/admin_site/shared/AppPagination"
import type { Pagination as PaginationType } from "@/types/admin_site"

function buildPagination(
  overrides: Partial<PaginationType> = {},
): PaginationType {
  return {
    currentPath: "/admin/articles",
    currentQueryParameters: {},
    pageParameterName: "page",
    perPageParameterName: "per",
    currentPage: 1,
    perPage: 50,
    totalPages: 1,
    totalCount: 1,
    nextPage: null,
    prevPage: null,
    nextPageLabel: "次へ",
    prevPageLabel: "前へ",
    nextPageAriaLabel: "次のページへ",
    prevPageAriaLabel: "前のページへ",
    isFirstPage: true,
    isLastPage: true,
    isOutOfRange: false,
    ...overrides,
  }
}

describe("AppPagination", () => {
  describe("1ページのみの場合", () => {
    it("正しくレンダリングされる（スナップショット）", () => {
      const { container } = render(
        <AppPagination
          pagination={buildPagination({
            totalPages: 1,
            currentPage: 1,
            nextPage: null,
            prevPage: null,
            currentQueryParameters: { a: 1, b: { c: 2 }, d: [3, 4], e: null },
          })}
        />,
      )
      expect(container).toMatchSnapshot()
    })
  })

  describe("5ページあり、現在のページが3の場合", () => {
    it("正しくレンダリングされる（スナップショット）", () => {
      const { container } = render(
        <AppPagination
          pagination={buildPagination({
            totalPages: 5,
            currentPage: 3,
            nextPage: 4,
            prevPage: 2,
            currentQueryParameters: { page: 3 },
          })}
        />,
      )
      expect(container).toMatchSnapshot()
    })
  })

  describe("7ページあり、現在のページが4の場合", () => {
    it("正しくレンダリングされる（スナップショット）", () => {
      const { container } = render(
        <AppPagination
          pagination={buildPagination({
            totalPages: 7,
            currentPage: 4,
            nextPage: 5,
            prevPage: 3,
            currentQueryParameters: { page: 4 },
          })}
        />,
      )
      expect(container).toMatchSnapshot()
    })
  })

  describe("9ページあり、現在のページが5の場合", () => {
    it("正しくレンダリングされる（スナップショット）", () => {
      const { container } = render(
        <AppPagination
          pagination={buildPagination({
            totalPages: 9,
            currentPage: 5,
            nextPage: 6,
            prevPage: 4,
            currentQueryParameters: { page: 5 },
          })}
        />,
      )
      expect(container).toMatchSnapshot()
    })
  })
})
