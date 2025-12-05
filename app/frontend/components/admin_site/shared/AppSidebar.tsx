import { Sidebar, SidebarContent, SidebarRail } from "../ui/sidebar";
import AppSidebarContent, { AppSidebarContentItemProps } from "./AppSidebarContent";

export type AppSidebarProps = {
  contentItems: AppSidebarContentItemProps[];
};
export type { AppSidebarContentItemProps };

export default function AppSidebar({ contentItems }: AppSidebarProps) {

  return (
    <Sidebar>
      <SidebarContent>
        <AppSidebarContent items={contentItems} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}