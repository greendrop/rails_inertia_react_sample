import type { AppBreadcrumbProps } from "@/features/admin_site/shared/components/AppBreadcrumb"
import type { AppSidebarProps } from "@/features/admin_site/shared/components/AppSidebar"
import type { QueryParameters } from "@/lib/query_parameter"

export type Flash = {
  notice?: string
  alert?: string
}

export type Errors = Record<string, string[]>

export type SharedProps = {
  flash: Flash
  errors: Errors
  sidebar: AppSidebarProps
  breadcrumb: AppBreadcrumbProps
}

export type Pagination = {
  currentPath: string
  currentQueryParameters: QueryParameters
  pageParameterName: string
  perPageParameterName: string
  currentPage: number
  perPage: number
  totalPages: number
  totalCount: number
  nextPage: number | null
  prevPage: number | null
  nextPageLabel: string
  prevPageLabel: string
  nextPageAriaLabel: string
  prevPageAriaLabel: string
  isFirstPage: boolean
  isLastPage: boolean
  isOutOfRange: boolean
}
