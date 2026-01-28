import { render } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import AppSidebarContentItem, {
  type AppSidebarContentItemProps,
} from "@/features/admin_site/shared/components/AppSidebarContentItem"
import { SidebarProvider } from "@/features/admin_site/shared/components/ui/sidebar"

const items: AppSidebarContentItemProps = {
  title: "記事",
  url: "#",
  items: [
    {
      title: "記事一覧",
      url: "/admin/articles",
    },
  ],
}

describe("AppSidebarContentItem", () => {
  it("正しくレンダリングされる（スナップショット）", () => {
    const { container } = render(
      <SidebarProvider>
        <AppSidebarContentItem {...items} />
      </SidebarProvider>,
    )
    expect(container).toMatchSnapshot()
  })
})
