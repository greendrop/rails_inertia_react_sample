import { Link } from "@inertiajs/react"
import type { ReactElement } from "react"
import AppPagination from "@/components/admin_site/shared/AppPagination"
import FlashAlert from "@/components/admin_site/shared/FlashAlert"
import Layout from "@/components/admin_site/shared/Layout"
import MetaTags from "@/components/admin_site/shared/MetaTags"
import PageHeader from "@/components/admin_site/shared/PageHeader"
import PageHeaderAction from "@/components/admin_site/shared/PageHeaderAction"
import PageHeaderTitle from "@/components/admin_site/shared/PageHeaderTitle"
import PageHeaderTitleText from "@/components/admin_site/shared/PageHeaderTitleText"
import { Button } from "@/components/admin_site/ui/button"
import ArticleTable from "@/features/admin_site/articles/index/components/ArticleTable"
import type {
  Article,
  ArticleFieldNames,
} from "@/features/admin_site/articles/index/types"
import type { Pagination } from "@/types/admin_site"

type IndexProps = {
  pageHeaderTitle: string
  articles: Article[]
  articleFieldNames: ArticleFieldNames
  pagination: Pagination
  noDataLabel: string
  showLinkLabel: string
  newLinkLabel: string
  newLinkHref: string
  destroyButtonLabel: string
  destroyConfirmMessage: string
}

export default function Index({
  pageHeaderTitle,
  articles,
  articleFieldNames,
  pagination,
  noDataLabel,
  showLinkLabel,
  newLinkLabel,
  newLinkHref,
  destroyButtonLabel,
  destroyConfirmMessage,
}: IndexProps) {
  return (
    <>
      <MetaTags />
      <div className="mb-4">
        <PageHeader>
          <PageHeaderTitle>
            <PageHeaderTitleText>{pageHeaderTitle}</PageHeaderTitleText>
          </PageHeaderTitle>
          <PageHeaderAction>
            <Button asChild>
              <Link href={newLinkHref}>{newLinkLabel}</Link>
            </Button>
          </PageHeaderAction>
        </PageHeader>
      </div>

      <div className="mb-4">
        <FlashAlert />
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
                  articleFieldNames={articleFieldNames}
                  showLinkLabel={showLinkLabel}
                  destroyButtonLabel={destroyButtonLabel}
                  destroyConfirmMessage={destroyConfirmMessage}
                />
              </div>

              <div className="mb-4 flex items-center justify-center">
                <AppPagination pagination={pagination} />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

Index.layout = (page: ReactElement) => <Layout>{page}</Layout>
