import useAppPaginationLinks from "@/hooks/admin_site/useAppPaginationLinks"
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
