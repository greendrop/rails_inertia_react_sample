import { renderHook } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import useAppPaginationLinks from "@/hooks/admin_site/useAppPaginationLinks"
import type { Pagination as PaginationType } from "@/types/admin_site"

describe("useAppPaginationLinks", () => {
  const basePagination: PaginationType = {
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

  it("ページネーションリンクが正しく生成される", () => {
    const { result } = renderHook(() =>
      useAppPaginationLinks({
        pagination: {
          ...basePagination,
          currentPage: 5,
          totalPages: 10,
          nextPage: 6,
          prevPage: 4,
        },
      }),
    )
    const links = result.current
    expect(links).toEqual([
      {
        key: "prev",
        kind: "prev",
        label: "前へ",
        href: "/admin/articles?page=4",
        isActive: false,
      },
      {
        key: "first",
        kind: "first",
        label: "1",
        href: "/admin/articles?page=1",
        isActive: false,
      },
      {
        key: "firstEllipsis",
        kind: "ellipsis",
        label: "...",
        href: "#",
        isActive: false,
      },
      {
        key: "page-3",
        kind: "page",
        label: "3",
        href: "/admin/articles?page=3",
        isActive: false,
      },
      {
        key: "page-4",
        kind: "page",
        label: "4",
        href: "/admin/articles?page=4",
        isActive: false,
      },
      {
        key: "page-5",
        kind: "page",
        label: "5",
        href: "/admin/articles?page=5",
        isActive: true,
      },
      {
        key: "page-6",
        kind: "page",
        label: "6",
        href: "/admin/articles?page=6",
        isActive: false,
      },
      {
        key: "page-7",
        kind: "page",
        label: "7",
        href: "/admin/articles?page=7",
        isActive: false,
      },
      {
        key: "lastEllipsis",
        kind: "ellipsis",
        label: "...",
        href: "#",
        isActive: false,
      },
      {
        key: "last",
        kind: "last",
        label: "10",
        href: "/admin/articles?page=10",
        isActive: false,
      },
      {
        key: "next",
        kind: "next",
        label: "次へ",
        href: "/admin/articles?page=6",
        isActive: false,
      },
    ])
  })

  it("最初のページではprevDisabledになる", () => {
    const pagination = {
      ...basePagination,
      currentPage: 1,
      prevPage: null,
      nextPage: 2,
    }
    const { result } = renderHook(() => useAppPaginationLinks({ pagination }))
    expect(result.current[0]).toEqual({
      key: "prevDisabled",
      kind: "prevDisabled",
      label: "前へ",
      href: "#",
      isActive: false,
    })
  })

  it("最後のページではnextDisabledになる", () => {
    const pagination = {
      ...basePagination,
      currentPage: 7,
      prevPage: 6,
      nextPage: null,
    }
    const { result } = renderHook(() => useAppPaginationLinks({ pagination }))
    expect(result.current[result.current.length - 1]).toEqual({
      key: "nextDisabled",
      kind: "nextDisabled",
      label: "次へ",
      href: "#",
      isActive: false,
    })
  })

  it("ページ数が少ない場合のリンク数", () => {
    const pagination = {
      ...basePagination,
      currentPage: 2,
      totalPages: 3,
      prevPage: 1,
      nextPage: 3,
    }
    const { result } = renderHook(() => useAppPaginationLinks({ pagination }))
    expect(result.current.map((l) => l.kind)).toEqual([
      "prev",
      "page",
      "page",
      "page",
      "next",
    ])
  })
})
