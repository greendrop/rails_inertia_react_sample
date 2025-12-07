import { Link } from "@inertiajs/react"
import { Minus, Plus } from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible"
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "../ui/sidebar"

export type AppSidebarContentItemProps = {
  title: string
  url: string
  items?: AppSidebarContentItemProps[]
  depth?: number
}

export default function AppSidebarContentItem({
  title,
  url,
  items,
  depth = 0,
}: AppSidebarContentItemProps) {
  if (items && items.length > 0) {
    return (
      <Collapsible className="group/collapsible">
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton>
              {title}{" "}
              <Plus className="ml-auto group-data-[state=open]/collapsible:hidden" />
              <Minus className="ml-auto group-data-[state=closed]/collapsible:hidden" />
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub>
              {items.map((item) => (
                <AppSidebarContentItem
                  key={item.title}
                  title={item.title}
                  url={item.url}
                  items={item.items}
                  depth={depth + 1}
                />
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    )
  }

  if (depth > 0) {
    return (
      <SidebarMenuSubItem>
        <SidebarMenuButton asChild>
          <Link href={url}>{title}</Link>
        </SidebarMenuButton>
      </SidebarMenuSubItem>
    )
  }

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <Link href={url}>{title}</Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}
