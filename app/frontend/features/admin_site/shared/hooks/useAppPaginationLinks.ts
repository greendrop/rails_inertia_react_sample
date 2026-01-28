import { useMemo } from "react"
import type { Pagination as PaginationType } from "@/features/admin_site/shared/types"
import {
  buildURLSearchParamsByQueryParameters,
  type QueryParameters,
} from "@/lib/query_parameter"
export type PaginationLinkKind =
  | "page"
  | "prev"
  | "prevDisabled"
  | "next"
  | "nextDisabled"
  | "first"
  | "last"
  | "ellipsis"
type PaginationLink = {
  key: string
  kind: PaginationLinkKind
  label: string
  href: string
  isActive: boolean
}

const pageWindow = 2

export default function useAppPaginationLinks({
  pagination,
}: {
  pagination: PaginationType
}): PaginationLink[] {
  return useMemo(() => {
    const links: PaginationLink[] = []

    // Previous link
    if (pagination.prevPage === null) {
      links.push({
        key: "prevDisabled",
        kind: "prevDisabled",
        label: pagination.prevPageLabel,
        href: "#",
        isActive: false,
      })
    } else {
      links.push({
        key: "prev",
        kind: "prev",
        label: pagination.prevPageLabel,
        href: pageLinkHref({
          currentPath: pagination.currentPath,
          currentQueryParameters: pagination.currentQueryParameters,
          pageParameterName: pagination.pageParameterName,
          page: pagination.prevPage,
        }),
        isActive: false,
      })
    }

    // First page link
    if (pagination.currentPage > pageWindow + 1) {
      links.push({
        key: "first",
        kind: "first",
        label: "1",
        href: pageLinkHref({
          currentPath: pagination.currentPath,
          currentQueryParameters: pagination.currentQueryParameters,
          pageParameterName: pagination.pageParameterName,
          page: 1,
        }),
        isActive: false,
      })
    }
    if (pagination.currentPage > pageWindow + 2) {
      links.push({
        key: "firstEllipsis",
        kind: "ellipsis",
        label: "...",
        href: "#",
        isActive: false,
      })
    }

    // Page links
    for (
      let i = pagination.currentPage - pageWindow;
      i <= pagination.currentPage + pageWindow;
      i++
    ) {
      if (i < 1 || i > pagination.totalPages) {
        continue
      }
      links.push({
        key: `page-${i}`,
        kind: "page",
        label: String(i),
        href: pageLinkHref({
          currentPath: pagination.currentPath,
          currentQueryParameters: pagination.currentQueryParameters,
          pageParameterName: pagination.pageParameterName,
          page: i,
        }),
        isActive: i === pagination.currentPage,
      })
    }

    // Last page link
    if (pagination.currentPage < pagination.totalPages - pageWindow - 1) {
      links.push({
        key: "lastEllipsis",
        kind: "ellipsis",
        label: "...",
        href: "#",
        isActive: false,
      })
    }
    if (pagination.currentPage < pagination.totalPages - pageWindow) {
      links.push({
        key: "last",
        kind: "last",
        label: String(pagination.totalPages),
        href: pageLinkHref({
          currentPath: pagination.currentPath,
          currentQueryParameters: pagination.currentQueryParameters,
          pageParameterName: pagination.pageParameterName,
          page: pagination.totalPages,
        }),
        isActive: false,
      })
    }

    // Next link
    if (pagination.nextPage === null) {
      links.push({
        key: "nextDisabled",
        kind: "nextDisabled",
        label: pagination.nextPageLabel,
        href: "#",
        isActive: false,
      })
    } else {
      links.push({
        key: "next",
        kind: "next",
        label: pagination.nextPageLabel,
        href: pageLinkHref({
          currentPath: pagination.currentPath,
          currentQueryParameters: pagination.currentQueryParameters,
          pageParameterName: pagination.pageParameterName,
          page: pagination.nextPage,
        }),
        isActive: false,
      })
    }

    return links
  }, [pagination])
}

function pageLinkHref({
  currentPath,
  currentQueryParameters,
  pageParameterName,
  page,
}: {
  currentPath: string
  currentQueryParameters: QueryParameters
  pageParameterName: string
  page: number
}): string {
  const searchParams = buildURLSearchParamsByQueryParameters(
    currentQueryParameters,
  )
  searchParams.set(pageParameterName, String(page))
  return `${currentPath}?${searchParams.toString()}`
}
