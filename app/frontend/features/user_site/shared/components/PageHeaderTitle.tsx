import type { ReactNode } from "react"

export type PageHeaderTitleProps = {
  children?: ReactNode
}

export default function PageHeaderTitle({ children }: PageHeaderTitleProps) {
  return <div className="flex-auto">{children}</div>
}
