import { render } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import PageHeaderAction from "@/features/admin_site/shared/components/PageHeaderAction"
import { Button } from "@/features/admin_site/shared/components/ui/button"

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
