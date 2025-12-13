import type { AppSidebarProps } from "@/components/admin_site/shared/AppSidebar"
import type { QueryParameters } from "@/lib/query_parameter"

export type Flash = {
  notice?: string
  alert?: string
}

export type SharedProps = {
  flash: Flash
  sidebar: AppSidebarProps
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
}
