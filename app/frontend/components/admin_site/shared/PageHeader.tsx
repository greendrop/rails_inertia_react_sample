export type PageHeaderProps = {
  children?: React.ReactNode
}

export default function PageHeader({ children }: PageHeaderProps) {
  return <div className="flex">{children}</div>
}
