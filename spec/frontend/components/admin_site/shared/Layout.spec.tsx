import { render } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import Layout, {
  type AppSidebarProps,
} from "@/components/admin_site/shared/Layout"

const sidebar: AppSidebarProps = {
  contentItems: [
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
  ],
}
const breadcrumb = {
  items: [
    { key: "homes#show", label: "ホーム", href: "/admin", isActive: true },
  ],
}

describe("Layout", () => {
  it("正しくレンダリングされる（スナップショット）", () => {
    const { container } = render(
      <Layout sidebar={sidebar} breadcrumb={breadcrumb}>
        <div>テスト用コンテンツ</div>
      </Layout>,
    )
    expect(container).toMatchSnapshot()
  })
})
