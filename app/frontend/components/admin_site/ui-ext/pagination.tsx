import { Link } from "@inertiajs/react"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import type * as React from "react"
import { type Button, buttonVariants } from "~/components/admin_site/ui/button"
import { cn } from "~/lib/utils"

function PaginationPreviousDisabled({
  className,
  children,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-disabled"
      className={cn(
        buttonVariants({
          variant: null,
          size: "default",
        }),
        "gap-1 px-2.5 sm:pl-2.5",
        className,
      )}
      {...props}
    >
      <ChevronLeftIcon />
      <span className="hidden sm:block">{children || "Previous"}</span>
    </span>
  )
}

function PaginationNextDisabled({
  className,
  children,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-disabled"
      className={cn(
        buttonVariants({
          variant: null,
          size: "default",
        }),
        "gap-1 px-2.5 sm:pr-2.5",
        className,
      )}
      {...props}
    >
      <span className="hidden sm:block">{children || "Next"}</span>
      <ChevronRightIcon />
    </span>
  )
}

type PaginationInertiaLinkProps = {
  isActive?: boolean
} & Pick<React.ComponentProps<typeof Button>, "size"> &
  Omit<React.ComponentProps<typeof Link>, "size">

function PaginationInertiaLink({
  className,
  isActive,
  size = "default",
  ...props
}: PaginationInertiaLinkProps) {
  return (
    <Link
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(
        buttonVariants({
          variant: isActive ? "outline" : "ghost",
          size,
        }),
        className,
      )}
      {...props}
    />
  )
}

function PaginationInertiaPrevious({
  className,
  children,
  ...props
}: React.ComponentProps<typeof PaginationInertiaLink>) {
  return (
    <PaginationInertiaLink
      aria-label={props["aria-label"] || "Go to previous page"}
      size="default"
      className={cn("gap-1 px-2.5 sm:pl-2.5", className)}
      {...props}
    >
      <ChevronLeftIcon />
      <span className="hidden sm:block">{children || "Previous"}</span>
    </PaginationInertiaLink>
  )
}

function PaginationInertiaNext({
  className,
  children,
  ...props
}: React.ComponentProps<typeof PaginationInertiaLink>) {
  return (
    <PaginationInertiaLink
      aria-label={props["aria-label"] || "Go to next page"}
      size="default"
      className={cn("gap-1 px-2.5 sm:pr-2.5", className)}
      {...props}
    >
      <span className="hidden sm:block">{children || "Next"}</span>
      <ChevronRightIcon />
    </PaginationInertiaLink>
  )
}

export {
  PaginationPreviousDisabled,
  PaginationNextDisabled,
  PaginationInertiaLink,
  PaginationInertiaPrevious,
  PaginationInertiaNext,
}
