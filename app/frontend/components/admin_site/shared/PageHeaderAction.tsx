export type PageHeaderActionProps = {
  children?: React.ReactNode
}

export default function PageHeaderAction({ children }: PageHeaderActionProps) {
  return <div className="flex flex-none items-center gap-2">{children}</div>
}
