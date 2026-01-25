import type { ReactNode } from "react"

export type PageHeaderActionProps = {
  children?: ReactNode
}

export default function PageHeaderAction({ children }: PageHeaderActionProps) {
  return <div className="flex flex-none items-center gap-2">{children}</div>
}
