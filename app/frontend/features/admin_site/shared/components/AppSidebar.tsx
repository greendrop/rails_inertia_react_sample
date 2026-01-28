import AppSidebarContent, {
  type AppSidebarContentItemProps,
} from "./AppSidebarContent"
import { Sidebar, SidebarRail } from "./ui/sidebar"

export type AppSidebarProps = {
  contentItems: AppSidebarContentItemProps[]
}
export type { AppSidebarContentItemProps }

export default function AppSidebar({ contentItems }: AppSidebarProps) {
  return (
    <Sidebar>
      <AppSidebarContent items={contentItems} />
      <SidebarRail />
    </Sidebar>
  )
}
