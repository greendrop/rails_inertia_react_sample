import { Minus, Plus } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubItem } from "../ui/sidebar";
import { Link } from "@inertiajs/react";

export type AppSidebarContentItemProps = {
  title: string;
  url: string;
  children?: AppSidebarContentItemProps[];
  depth?: number;
};

export default function AppSidebarContentItem({ title, url, children, depth = 0 }: AppSidebarContentItemProps) {
  if (children && children.length > 0) {
    return (
      <Collapsible
        key={title}
        className="group/collapsible"
      >
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
              {children.map((child) => (
                <AppSidebarContentItem
                  key={child.title}
                  title={child.title}
                  url={child.url}
                  children={child.children}
                  depth={depth + 1}
                />
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    );
  }

  if (depth > 0) {
    return (
      <SidebarMenuSubItem key={title}>
        <SidebarMenuButton asChild>
          <Link href={url}>{title}</Link>
        </SidebarMenuButton>
      </SidebarMenuSubItem>
    );
  }

  return (
    <SidebarMenuItem key={title}>
      <SidebarMenuButton asChild>
        <Link href={url}>{title}</Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}