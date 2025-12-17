export type PageHeaderTitleProps = {
  children?: React.ReactNode
}

export default function PageHeaderTitle({ children }: PageHeaderTitleProps) {
  return <div className="flex-auto">{children}</div>
}
