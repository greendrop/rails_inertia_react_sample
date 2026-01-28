import useAppPaginationLinks from "@/features/admin_site/shared/hooks/useAppPaginationLinks"
import type { Pagination as PaginationType } from "@/features/admin_site/shared/types"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "./ui/pagination"
import {
  PaginationInertiaLink,
  PaginationInertiaNext,
  PaginationInertiaPrevious,
  PaginationNextDisabled,
  PaginationPreviousDisabled,
} from "./ui-ext/pagination"

export type AppPaginationProps = {
  pagination: PaginationType
}

export default function AppPagination({ pagination }: AppPaginationProps) {
  const links = useAppPaginationLinks({ pagination })

  return (
    <Pagination>
      <PaginationContent>
        {links.map((link) => {
          switch (link.kind) {
            case "page":
              return (
                <PaginationItem key={link.key}>
                  <PaginationInertiaLink
                    href={link.href}
                    isActive={link.isActive}
                  >
                    {link.label}
                  </PaginationInertiaLink>
                </PaginationItem>
              )
            case "prev":
              return (
                <PaginationItem key={link.key}>
                  <PaginationInertiaPrevious
                    href={link.href}
                    aria-label={pagination.prevPageAriaLabel}
                  >
                    {link.label}
                  </PaginationInertiaPrevious>
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
                  <PaginationInertiaNext
                    href={link.href}
                    aria-label={pagination.nextPageAriaLabel}
                  >
                    {link.label}
                  </PaginationInertiaNext>
                </PaginationItem>
              )
            case "nextDisabled":
              return (
                <PaginationItem key={link.key}>
                  <PaginationNextDisabled>{link.label}</PaginationNextDisabled>
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
