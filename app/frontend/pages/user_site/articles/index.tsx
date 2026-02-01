import type { ReactElement } from "react"
import Articles from "@/features/user_site/articles/components/Articles"
import type { Article } from "@/features/user_site/articles/types"
import FlashAlert from "@/features/user_site/shared/components/FlashAlert"
import Layout from "@/features/user_site/shared/components/Layout"
import MetaTags from "@/features/user_site/shared/components/MetaTags"
import PageHeader from "@/features/user_site/shared/components/PageHeader"
import PageHeaderTitle from "@/features/user_site/shared/components/PageHeaderTitle"
import PageHeaderTitleText from "@/features/user_site/shared/components/PageHeaderTitleText"

export type IndexProps = {
  pageHeaderTitle: string
  articles: Article[]
  noDataLabel: string
  readMoreLabel: string
}

export default function Index({
  pageHeaderTitle,
  articles,
  noDataLabel,
  readMoreLabel,
}: IndexProps) {
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
        {articles.length === 0 ? (
          <output className="my-4 text-center" aria-live="polite">
            {noDataLabel}
          </output>
        ) : (
          <Articles articles={articles} readMoreLabel={readMoreLabel} />
        )}
      </section>
    </>
  )
}

Index.layout = (page: ReactElement) => <Layout>{page}</Layout>
