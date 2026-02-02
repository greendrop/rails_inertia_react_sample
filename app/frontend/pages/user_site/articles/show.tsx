import type { ReactElement } from "react"
import type { Article } from "@/features/user_site/articles/index/types"
import ArticleCard from "@/features/user_site/articles/show/components/ArticleCard"
import FlashAlert from "@/features/user_site/shared/components/FlashAlert"
import Layout from "@/features/user_site/shared/components/Layout"
import MetaTags from "@/features/user_site/shared/components/MetaTags"
import PageHeader from "@/features/user_site/shared/components/PageHeader"
import PageHeaderTitle from "@/features/user_site/shared/components/PageHeaderTitle"
import PageHeaderTitleText from "@/features/user_site/shared/components/PageHeaderTitleText"

type ShowProps = {
  pageHeaderTitle: string
  article: Article
}

export default function Show({ pageHeaderTitle, article }: ShowProps) {
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

      <section>
        <ArticleCard article={article} />
      </section>
    </>
  )
}

Show.layout = (page: ReactElement) => <Layout>{page}</Layout>
