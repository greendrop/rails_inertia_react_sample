import { SidebarContent, SidebarGroup, SidebarMenu } from "../ui/sidebar";
import AppSidebarContentItem, { AppSidebarContentItemProps } from "./AppSidebarContentItem";

export type AppSidebarContentProps = {
  items: AppSidebarContentItemProps[];
};
export type { AppSidebarContentItemProps };

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
              children={item.children}
            />
          ))}
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
  );
}


