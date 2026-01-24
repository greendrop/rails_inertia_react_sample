export type PageHeaderProps = {
  children?: React.ReactNode
}

export default function PageHeader({ children }: PageHeaderProps) {
  return <div className="flex flex-wrap items-center gap-4">{children}</div>
}
