import { Head } from "@inertiajs/react"
import Layout from "@/components/admin_site/shared/Layout"
import PageHeader from "@/components/admin_site/shared/PageHeader"
import PageHeaderTitle from "@/components/admin_site/shared/PageHeaderTitle"
import PageHeaderTitleText from "@/components/admin_site/shared/PageHeaderTitleText"
import ArticleDefinitionList from "@/features/admin_site/articles/show/components/ArticleDefinitionList"
import type {
  Article,
  ArticleFieldNames,
} from "@/features/admin_site/articles/show/types"
import type { SharedProps } from "@/types/admin_site"

type ShowSpecificProps = {
  headTitle: string
  pageHeaderTitle: string
  article: Article
  articleFieldNames: ArticleFieldNames
}

export type ShowProps = SharedProps & ShowSpecificProps

export default function Show({
  sidebar,
  headTitle,
  pageHeaderTitle,
  breadcrumb,
  article,
  articleFieldNames,
}: ShowProps) {
  return (
    <>
      <Head title={headTitle} />
      <Layout sidebar={sidebar} breadcrumb={breadcrumb}>
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
      </Layout>
    </>
  )
}
