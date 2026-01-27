import { render } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import AppBreadcrumb, {
  type AppBreadcrumbItem,
} from "@/features/admin_site/shared/components/AppBreadcrumb"

const items: AppBreadcrumbItem[] = [
  {
    key: "home",
    label: "ホーム",
    href: "/admin",
    isActive: false,
  },
  {
    key: "articles",
    label: "記事一覧",
    href: "/admin/articles",
    isActive: false,
  },
  {
    key: "detail",
    label: "記事詳細",
    href: "/admin/articles/1",
    isActive: true,
  },
]

describe("AppBreadcrumb", () => {
  it("正しくレンダリングされる（スナップショット）", () => {
    const { container } = render(<AppBreadcrumb items={items} />)
    expect(container).toMatchSnapshot()
  })
})
