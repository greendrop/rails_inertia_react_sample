import type { ReactElement } from "react"
import FlashAlert from "@/components/admin_site/shared/FlashAlert"
import Layout from "@/components/admin_site/shared/Layout"
import MetaTags from "@/components/admin_site/shared/MetaTags"
import PageHeader from "@/components/admin_site/shared/PageHeader"
import PageHeaderTitle from "@/components/admin_site/shared/PageHeaderTitle"
import PageHeaderTitleText from "@/components/admin_site/shared/PageHeaderTitleText"

type ShowProps = {
  pageHeaderTitle: string
}

export default function Show({ pageHeaderTitle }: ShowProps) {
  return (
    <>
      <MetaTags />
      <div className="mb-4">
        <PageHeader>
          <PageHeaderTitle>
            <PageHeaderTitleText>{pageHeaderTitle}</PageHeaderTitleText>
          </PageHeaderTitle>
        </PageHeader>
      </div>

      <div className="mb-4">
        <FlashAlert />
      </div>
    </>
  )
}

Show.layout = (page: ReactElement) => <Layout>{page}</Layout>
