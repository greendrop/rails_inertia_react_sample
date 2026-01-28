import type { ReactElement } from "react"
import FlashAlert from "@/features/admin_site/shared/components/FlashAlert"
import Layout from "@/features/admin_site/shared/components/Layout"
import MetaTags from "@/features/admin_site/shared/components/MetaTags"
import PageHeader from "@/features/admin_site/shared/components/PageHeader"
import PageHeaderTitle from "@/features/admin_site/shared/components/PageHeaderTitle"
import PageHeaderTitleText from "@/features/admin_site/shared/components/PageHeaderTitleText"

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
