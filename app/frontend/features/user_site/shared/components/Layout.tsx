import type { ReactNode } from "react"
import { ThemeProvider } from "./ThemeProvider"

export type LayoutProps = {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <ThemeProvider defaultTheme="light">
      <main className="mx-auto max-w-3xl py-8 px-4 md:px-0">{children}</main>
    </ThemeProvider>
  )
}
