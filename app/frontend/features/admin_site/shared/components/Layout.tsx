import type { ReactNode } from "react"
import usePage from "@/features/admin_site/shared/hooks/usePage"
import AppBreadcrumb from "./AppBreadcrumb"
import AppSidebar, { type AppSidebarProps } from "./AppSidebar"
import { ThemeProvider } from "./ThemeProvider"
import { Separator } from "./ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "./ui/sidebar"

export type LayoutProps = {
  children: ReactNode
}
export type { AppSidebarProps }

export default function Layout({ children }: LayoutProps) {
  const { sidebar, breadcrumb } = usePage().props

  return (
    <ThemeProvider defaultTheme="light">
      <SidebarProvider>
        <AppSidebar contentItems={sidebar.contentItems} />
        <SidebarInset>
          <header className="bg-background sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <AppBreadcrumb items={breadcrumb.items} />
          </header>
          <div className="p-8">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  )
}
