import type { ReactNode } from "react"

export type PageHeaderTitleTextProps = {
  children?: ReactNode
}

export default function PageHeaderTitleText({
  children,
}: PageHeaderTitleTextProps) {
  return <h2 className="text-4xl">{children}</h2>
}
