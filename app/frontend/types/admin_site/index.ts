import type { AppSidebarProps } from "@/components/admin_site/shared/AppSidebar"

export type Flash = {
  notice?: string
  alert?: string
}

export type SharedProps = {
  flash: Flash
  sidebar: AppSidebarProps
}
