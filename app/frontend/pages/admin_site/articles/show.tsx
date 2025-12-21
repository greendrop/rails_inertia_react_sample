import { Head } from "@inertiajs/react"
import type { ReactElement } from "react"
import Layout from "@/components/admin_site/shared/Layout"
import PageHeader from "@/components/admin_site/shared/PageHeader"
import PageHeaderTitle from "@/components/admin_site/shared/PageHeaderTitle"
import PageHeaderTitleText from "@/components/admin_site/shared/PageHeaderTitleText"
import ArticleDefinitionList from "@/features/admin_site/articles/show/components/ArticleDefinitionList"
import type {
  Article,
  ArticleFieldNames,
} from "@/features/admin_site/articles/show/types"

type ShowProps = {
  headTitle: string
  pageHeaderTitle: string
  article: Article
  articleFieldNames: ArticleFieldNames
}

export default function Show({
  headTitle,
  pageHeaderTitle,
  article,
  articleFieldNames,
}: ShowProps) {
  return (
    <>
      <Head title={headTitle} />
      <div className="mb-4">
        <PageHeader>
          <PageHeaderTitle>
            <PageHeaderTitleText>{pageHeaderTitle}</PageHeaderTitleText>
          </PageHeaderTitle>
        </PageHeader>
      </div>

      <div className="flex">
        <div className="flex-auto">
          <ArticleDefinitionList
            article={article}
            articleFieldNames={articleFieldNames}
          />
        </div>
      </div>
    </>
  )
}

Show.layout = (page: ReactElement) => <Layout>{page}</Layout>
