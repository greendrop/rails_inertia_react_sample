import { render } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import FlashAlert from "@/features/admin_site/shared/components/FlashAlert"

let flash: Record<string, string> = {}

vi.mock("@/features/admin_site/shared/hooks/usePage", () => {
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
