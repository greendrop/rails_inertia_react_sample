import { render } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import AppSidebar, {
  type AppSidebarContentItemProps,
} from "@/components/admin_site/shared/AppSidebar"
import { SidebarProvider } from "@/components/admin_site/ui/sidebar"

const contentItems: AppSidebarContentItemProps[] = [
  {
    title: "記事",
    url: "/admin/articles",
    items: [
      {
        title: "記事一覧",
        url: "/admin/articles/list",
      },
    ],
  },
  {
    title: "ダッシュボード",
    url: "/admin/dashboard",
  },
]

describe("AppSidebar", () => {
  it("正しくレンダリングされる（スナップショット）", () => {
    const { container } = render(
      <SidebarProvider>
        <AppSidebar contentItems={contentItems} />
      </SidebarProvider>,
    )
    expect(container).toMatchSnapshot()
  })
})
