import { useMemo } from "react"
import {
  buildSearchParamsByQueryParameters,
  type QueryParameters,
} from "@/lib/query_parameter"
import type { Pagination as PaginationType } from "@/types/admin_site"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationInertiaLink,
  PaginationInertiaNext,
  PaginationInertiaPrevious,
  PaginationItem,
  PaginationNextDisabled,
  PaginationPreviousDisabled,
} from "../ui/pagination"

export type AppPaginationProps = {
  pagination: PaginationType
}

type PaginationLinkKind =
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

function usePaginationLinks({
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
        href: prevPageLinkHref({
          currentPath: pagination.currentPath,
          currentQueryParameters: pagination.currentQueryParameters,
          pageParameterName: pagination.pageParameterName,
          prevPage: pagination.prevPage,
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
        href: firstPageHref({
          currentPath: pagination.currentPath,
          currentQueryParameters: pagination.currentQueryParameters,
          pageParameterName: pagination.pageParameterName,
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
    const searchParams = buildSearchParamsByQueryParameters(
      pagination.currentQueryParameters,
    )
    for (
      let i = pagination.currentPage - pageWindow;
      i <= pagination.currentPage + pageWindow;
      i++
    ) {
      if (i < 1 || i > pagination.totalPages) {
        continue
      }
      searchParams.set(pagination.pageParameterName, String(i))
      links.push({
        key: `page-${i}`,
        kind: "page",
        label: String(i),
        href: `${pagination.currentPath}?${searchParams.toString()}`,
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
        href: lastPageHref({
          currentPath: pagination.currentPath,
          currentQueryParameters: pagination.currentQueryParameters,
          pageParameterName: pagination.pageParameterName,
          totalPages: pagination.totalPages,
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
        href: nextPageLinkHref({
          currentPath: pagination.currentPath,
          currentQueryParameters: pagination.currentQueryParameters,
          pageParameterName: pagination.pageParameterName,
          nextPage: pagination.nextPage,
        }),
        isActive: false,
      })
    }

    return links
  }, [pagination])
}

function prevPageLinkHref({
  currentPath,
  currentQueryParameters,
  pageParameterName,
  prevPage,
}: {
  currentPath: string
  currentQueryParameters: QueryParameters
  pageParameterName: string
  prevPage: number
}): string {
  const searchParams = buildSearchParamsByQueryParameters(
    currentQueryParameters,
  )
  searchParams.set(pageParameterName, String(prevPage))
  return `${currentPath}?${searchParams.toString()}`
}

function nextPageLinkHref({
  currentPath,
  currentQueryParameters,
  pageParameterName,
  nextPage,
}: {
  currentPath: string
  currentQueryParameters: QueryParameters
  pageParameterName: string
  nextPage: number
}): string {
  const searchParams = buildSearchParamsByQueryParameters(
    currentQueryParameters,
  )
  searchParams.set(pageParameterName, String(nextPage))
  return `${currentPath}?${searchParams.toString()}`
}

function firstPageHref({
  currentPath,
  currentQueryParameters,
  pageParameterName,
}: {
  currentPath: string
  currentQueryParameters: QueryParameters
  pageParameterName: string
}): string {
  const searchParams = buildSearchParamsByQueryParameters(
    currentQueryParameters,
  )
  searchParams.set(pageParameterName, "1")
  return `${currentPath}?${searchParams.toString()}`
}

function lastPageHref({
  currentPath,
  currentQueryParameters,
  pageParameterName,
  totalPages,
}: {
  currentPath: string
  currentQueryParameters: QueryParameters
  pageParameterName: string
  totalPages: number
}): string {
  const searchParams = buildSearchParamsByQueryParameters(
    currentQueryParameters,
  )
  searchParams.set(pageParameterName, String(totalPages))
  return `${currentPath}?${searchParams.toString()}`
}

export default function AppPagination({ pagination }: AppPaginationProps) {
  const links = usePaginationLinks({ pagination })

  return (
    <Pagination>
      <PaginationContent>
        {links.map((link) => {
          switch (link.kind) {
            case "page":
              return (
                <PaginationItem key={link.key}>
                  <PaginationInertiaLink
                    href={link.href.toString()}
                    isActive={link.isActive}
                  >
                    {link.label}
                  </PaginationInertiaLink>
                </PaginationItem>
              )
            case "prev":
              return (
                <PaginationItem key={link.key}>
                  {link.href ? (
                    <PaginationInertiaPrevious
                      href={link.href}
                      aria-label={pagination.prevPageAriaLabel}
                    >
                      {link.label}
                    </PaginationInertiaPrevious>
                  ) : (
                    <PaginationPreviousDisabled>
                      {link.label}
                    </PaginationPreviousDisabled>
                  )}
                </PaginationItem>
              )
            case "prevDisabled":
              return (
                <PaginationItem key={link.key}>
                  <PaginationPreviousDisabled>
                    {link.label}
                  </PaginationPreviousDisabled>
                </PaginationItem>
              )
            case "next":
              return (
                <PaginationItem key={link.key}>
                  {link.href ? (
                    <PaginationInertiaNext
                      href={link.href}
                      aria-label={pagination.nextPageAriaLabel}
                    >
                      {link.label}
                    </PaginationInertiaNext>
                  ) : (
                    <PaginationNextDisabled>
                      {link.label}
                    </PaginationNextDisabled>
                  )}
                </PaginationItem>
              )
            case "nextDisabled":
              return (
                <PaginationItem key={link.key}>
                  <PaginationNextDisabled>
                    {link.label}
                  </PaginationNextDisabled>
                </PaginationItem>
              )
            case "ellipsis":
              return (
                <PaginationItem key={link.key}>
                  <PaginationEllipsis />
                </PaginationItem>
              )
            case "first":
              return (
                <PaginationItem key={link.key}>
                  <PaginationInertiaLink href={link.href}>
                    {link.label}
                  </PaginationInertiaLink>
                </PaginationItem>
              )
            case "last":
              return (
                <PaginationItem key={link.key}>
                  <PaginationInertiaLink href={link.href}>
                    {link.label}
                  </PaginationInertiaLink>
                </PaginationItem>
              )
            default:
              return null
          }
        })}
      </PaginationContent>
    </Pagination>
  )
}
