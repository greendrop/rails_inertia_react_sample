import { Link } from "@inertiajs/react"
import type { ReactElement } from "react"
import ArticleTable from "@/features/admin_site/articles/index/components/ArticleTable"
import type {
  Article,
  ArticleFieldNames,
} from "@/features/admin_site/articles/index/types"
import AppPagination from "@/features/admin_site/shared/components/AppPagination"
import FlashAlert from "@/features/admin_site/shared/components/FlashAlert"
import Layout from "@/features/admin_site/shared/components/Layout"
import MetaTags from "@/features/admin_site/shared/components/MetaTags"
import PageHeader from "@/features/admin_site/shared/components/PageHeader"
import PageHeaderAction from "@/features/admin_site/shared/components/PageHeaderAction"
import PageHeaderTitle from "@/features/admin_site/shared/components/PageHeaderTitle"
import PageHeaderTitleText from "@/features/admin_site/shared/components/PageHeaderTitleText"
import { Button } from "@/features/admin_site/shared/components/ui/button"
import type { Pagination } from "@/features/admin_site/shared/types"

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
