import {
  flattenQueryParameters,
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

const pageWindow = 2

function isFirstPageLinkShown({
  currentPage,
  pageWindow,
}: {
  currentPage: number
  pageWindow: number
}): boolean {
  return currentPage > pageWindow + 1
}

function isLastPageLinkShown({
  currentPage,
  totalPages,
  pageWindow,
}: {
  currentPage: number
  totalPages: number
  pageWindow: number
}): boolean {
  return currentPage < totalPages - pageWindow
}

function buildSearchParams({
  currentQueryParameters,
}: {
  currentQueryParameters: QueryParameters
}): URLSearchParams {
  const flattenedQueryParameters = flattenQueryParameters(
    currentQueryParameters,
  )
  const searchParams = new URLSearchParams()
  Object.entries(flattenedQueryParameters).forEach(([key, value]) => {
    if (value === null || value === undefined) {
      searchParams.append(key, "")
    } else if (Array.isArray(value)) {
      Object.entries(value).forEach(([_, v]) => {
        if (v !== null && v !== undefined) {
          searchParams.append(key, String(v))
        }
      })
    } else {
      searchParams.append(key, String(value))
    }
  })
  return searchParams
}

function buildPages({
  currentPath,
  currentQueryParameters,
  pageParameterName,
  currentPage,
  totalPages,
  pageWindow,
}: {
  currentPath: string
  currentQueryParameters: QueryParameters
  pageParameterName: string
  currentPage: number
  totalPages: number
  pageWindow: number
}): { label: number; href: string }[] {
  const searchParams = buildSearchParams({ currentQueryParameters })
  const pages: { label: number; href: string }[] = []
  for (let i = currentPage - pageWindow; i <= currentPage + pageWindow; i++) {
    if (i < 1 || i > totalPages) {
      continue
    }
    searchParams.set(pageParameterName, String(i))
    pages.push({ label: i, href: `${currentPath}?${searchParams.toString()}` })
  }
  return pages
}

function buildFirstPageHref({
  currentPath,
  currentQueryParameters,
  pageParameterName,
}: {
  currentPath: string
  currentQueryParameters: QueryParameters
  pageParameterName: string
}): string {
  const searchParams = buildSearchParams({ currentQueryParameters })
  searchParams.set(pageParameterName, "1")
  return `${currentPath}?${searchParams.toString()}`
}

function buildLastPageHref({
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
  const searchParams = buildSearchParams({ currentQueryParameters })
  searchParams.set(pageParameterName, String(totalPages))
  return `${currentPath}?${searchParams.toString()}`
}

function buildPrevPageHref({
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
  const searchParams = buildSearchParams({ currentQueryParameters })
  searchParams.set(pageParameterName, String(prevPage))
  return `${currentPath}?${searchParams.toString()}`
}

function buildNextPageHref({
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
  const searchParams = buildSearchParams({ currentQueryParameters })
  searchParams.set(pageParameterName, String(nextPage))
  return `${currentPath}?${searchParams.toString()}`
}

export default function AppPagination({ pagination }: AppPaginationProps) {
  const pages = buildPages({
    currentPath: pagination.currentPath,
    currentQueryParameters: pagination.currentQueryParameters,
    pageParameterName: pagination.pageParameterName,
    currentPage: pagination.currentPage,
    totalPages: pagination.totalPages,
    pageWindow,
  })

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          {!pagination.prevPage ? (
            <PaginationPreviousDisabled>
              {pagination.prevPageLabel}
            </PaginationPreviousDisabled>
          ) : (
            <PaginationInertiaPrevious
              href={buildPrevPageHref({
                currentPath: pagination.currentPath,
                currentQueryParameters: pagination.currentQueryParameters,
                pageParameterName: pagination.pageParameterName,
                prevPage: pagination.prevPage,
              })}
              aria-label={pagination.prevPageAriaLabel}
            >
              {pagination.prevPageLabel}
            </PaginationInertiaPrevious>
          )}
        </PaginationItem>
        {isFirstPageLinkShown({
          currentPage: pagination.currentPage,
          pageWindow,
        }) && (
          <>
            <PaginationItem>
              <PaginationInertiaLink
                href={buildFirstPageHref({
                  currentPath: pagination.currentPath,
                  currentQueryParameters: pagination.currentQueryParameters,
                  pageParameterName: pagination.pageParameterName,
                })}
              >
                1
              </PaginationInertiaLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          </>
        )}
        {pages.map((page) => (
          <PaginationItem key={page.label}>
            <PaginationInertiaLink
              href={page.href}
              isActive={page.label === pagination.currentPage}
            >
              {page.label}
            </PaginationInertiaLink>
          </PaginationItem>
        ))}
        {isLastPageLinkShown({
          currentPage: pagination.currentPage,
          totalPages: pagination.totalPages,
          pageWindow,
        }) && (
          <>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationInertiaLink
                href={buildLastPageHref({
                  currentPath: pagination.currentPath,
                  currentQueryParameters: pagination.currentQueryParameters,
                  pageParameterName: pagination.pageParameterName,
                  totalPages: pagination.totalPages,
                })}
              >
                {pagination.totalPages}
              </PaginationInertiaLink>
            </PaginationItem>
          </>
        )}
        <PaginationItem>
          {!pagination.nextPage ? (
            <PaginationNextDisabled>
              {pagination.nextPageLabel}
            </PaginationNextDisabled>
          ) : (
            <PaginationInertiaNext
              href={buildNextPageHref({
                currentPath: pagination.currentPath,
                currentQueryParameters: pagination.currentQueryParameters,
                pageParameterName: pagination.pageParameterName,
                nextPage: pagination.nextPage,
              })}
              aria-label={pagination.nextPageAriaLabel}
            >
              {pagination.nextPageLabel}
            </PaginationInertiaNext>
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
