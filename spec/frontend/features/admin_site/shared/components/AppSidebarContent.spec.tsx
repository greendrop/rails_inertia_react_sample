import { render } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import AppSidebarContent, {
  type AppSidebarContentProps,
} from "@/features/admin_site/shared/components/AppSidebarContent"
import { SidebarProvider } from "@/features/admin_site/shared/components/ui/sidebar"

const items: AppSidebarContentProps["items"] = [
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

describe("AppSidebarContent", () => {
  it("正しくレンダリングされる（スナップショット）", () => {
    const { container } = render(
      <SidebarProvider>
        <AppSidebarContent items={items} />
      </SidebarProvider>,
    )
    expect(container).toMatchSnapshot()
  })
})
