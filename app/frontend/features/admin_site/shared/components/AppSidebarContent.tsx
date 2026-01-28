import AppSidebarContentItem, {
  type AppSidebarContentItemProps,
} from "./AppSidebarContentItem"
import { SidebarContent, SidebarGroup, SidebarMenu } from "./ui/sidebar"

export type AppSidebarContentProps = {
  items: AppSidebarContentItemProps[]
}
export type { AppSidebarContentItemProps }

export default function AppSidebarContent({ items }: AppSidebarContentProps) {
  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarMenu>
          {items.map((item) => (
            <AppSidebarContentItem
              key={item.title}
              title={item.title}
              url={item.url}
              items={item.items ?? []}
            />
          ))}
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
  )
}
