import { Head } from "@inertiajs/react"
import AppPagination from "@/components/admin_site/shared/AppPagination"
import Layout from "@/components/admin_site/shared/Layout"
import PageHeader from "@/components/admin_site/shared/PageHeader"
import PageHeaderTitle from "@/components/admin_site/shared/PageHeaderTitle"
import PageHeaderTitleText from "@/components/admin_site/shared/PageHeaderTitleText"
import ArticleTable from "@/features/admin_site/articles/index/components/ArticleTable"
import type {
  Article,
  ArticleColumnNames,
} from "@/features/admin_site/articles/index/types"
import type { Pagination, SharedProps } from "@/types/admin_site"

type IndexSpecificProps = {
  headTitle: string
  pageHeaderTitle: string
  articles: Article[]
  articleColumnNames: ArticleColumnNames
  pagination: Pagination
  noDataLabel: string
}
type IndexProps = SharedProps & IndexSpecificProps

export default function Index({
  sidebar,
  headTitle,
  pageHeaderTitle,
  articles,
  articleColumnNames,
  pagination,
  noDataLabel,
}: IndexProps) {
  return (
    <>
      <Head title={headTitle} />
      <Layout sidebar={sidebar}>
        <div className="mb-4">
          <PageHeader>
            <PageHeaderTitle>
              <PageHeaderTitleText>{pageHeaderTitle}</PageHeaderTitleText>
            </PageHeaderTitle>
          </PageHeader>
        </div>

        <div className="flex">
          <div className="flex-auto">
            {articles.length === 0 ? (
              <output className="my-4 text-center" aria-live="polite">
                {noDataLabel}
              </output>
            ) : (
              <>
                <div className="mb-4">
                  <ArticleTable
                    articles={articles}
                    articleColumnNames={articleColumnNames}
                  />
                </div>

                <div className="mb-4 flex items-center justify-center">
                  <AppPagination pagination={pagination} />
                </div>
              </>
            )}
          </div>
        </div>
      </Layout>
    </>
  )
}
