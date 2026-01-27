import type { ReactElement } from "react"
import Layout from "@/components/admin_site/shared/Layout"

export default function Show() {
  return <div />
}

Show.layout = (page: ReactElement) => <Layout>{page}</Layout>
