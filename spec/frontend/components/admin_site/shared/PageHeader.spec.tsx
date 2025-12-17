import { render } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import PageHeader from "@/components/admin_site/shared/PageHeader"
import PageHeaderTitle from "@/components/admin_site/shared/PageHeaderTitle"
import PageHeaderTitleText from "@/components/admin_site/shared/PageHeaderTitleText"

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
