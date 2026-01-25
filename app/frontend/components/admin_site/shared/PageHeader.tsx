import type { ReactNode } from "react"

export type PageHeaderProps = {
  children?: ReactNode
}

export default function PageHeader({ children }: PageHeaderProps) {
  return <div className="flex flex-wrap items-center gap-4">{children}</div>
}
