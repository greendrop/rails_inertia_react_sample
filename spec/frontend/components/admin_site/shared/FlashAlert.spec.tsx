import { render } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import FlashAlert from "@/components/admin_site/shared/FlashAlert"

let flash: Record<string, string> = {}

vi.mock("@/hooks/admin_site/usePage", () => {
  return {
    default: () => {
      return {
        props: {
          flash,
        },
      }
    },
  }
})

describe("FlashAlert", () => {
  it("flashが空の場合、正しくレンダリングされる（スナップショット）", () => {
    flash = {}

    const { container } = render(<FlashAlert />)

    expect(container).toMatchSnapshot()
  })

  it("flashが存在する場合、正しくレンダリングされる（スナップショット）", () => {
    flash = {
      notice: "保存しました",
      alert: "保存に失敗しました",
    }

    const { container } = render(<FlashAlert />)

    expect(container).toMatchSnapshot()
  })
})
