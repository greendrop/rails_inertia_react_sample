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

describe("Layout", () => {
  it("正しくレンダリングされる（スナップショット）", () => {
    const { container } = render(
      <Layout sidebar={sidebar}>
        <div>テスト用コンテンツ</div>
      </Layout>,
    )
    expect(container).toMatchSnapshot()
  })
})
