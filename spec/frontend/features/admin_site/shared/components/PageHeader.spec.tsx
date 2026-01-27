import { render } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import PageHeader from "@/features/admin_site/shared/components/PageHeader"
import PageHeaderTitle from "@/features/admin_site/shared/components/PageHeaderTitle"
import PageHeaderTitleText from "@/features/admin_site/shared/components/PageHeaderTitleText"

describe("PageHeader", () => {
  it("正しくレンダリングされること（スナップショット）", () => {
    const { container } = render(
      <PageHeader>
        <PageHeaderTitle>
          <PageHeaderTitleText>タイトル</PageHeaderTitleText>
        </PageHeaderTitle>
      </PageHeader>,
    )
    expect(container).toMatchSnapshot()
  })
})
