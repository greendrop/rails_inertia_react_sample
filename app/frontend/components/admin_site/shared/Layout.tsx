import { ReactNode } from "react";
import AppSidebar, { AppSidebarProps } from "./AppSidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { Separator } from "../ui/separator";

export type LayoutProps = {
  children: ReactNode;
  sidebar: AppSidebarProps;
};
export type { AppSidebarProps };

export default function Layout({ children, sidebar }: LayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar contentItems={sidebar.contentItems} />
      <SidebarInset>
        <header className="bg-background sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
        </header>
        <main className="p-8">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
