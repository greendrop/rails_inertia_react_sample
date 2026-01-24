import { render } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import PageHeaderAction from "@/components/admin_site/shared/PageHeaderAction"
import { Button } from "@/components/admin_site/ui/button"

describe("PageHeaderAction", () => {
  it("子要素を表示できること（スナップショット）", () => {
    const { container } = render(
      <PageHeaderAction>
        <Button type="button">アクション</Button>
      </PageHeaderAction>,
    )

    expect(container).toMatchSnapshot()
  })
})
