import { router } from "@inertiajs/react"
import type { ReactElement } from "react"
import ArticleDefinitionList from "@/features/admin_site/articles/show/components/ArticleDefinitionList"
import type {
  Article,
  ArticleFieldNames,
} from "@/features/admin_site/articles/show/types"
import FlashAlert from "@/features/admin_site/shared/components/FlashAlert"
import Layout from "@/features/admin_site/shared/components/Layout"
import MetaTags from "@/features/admin_site/shared/components/MetaTags"
import PageHeader from "@/features/admin_site/shared/components/PageHeader"
import PageHeaderAction from "@/features/admin_site/shared/components/PageHeaderAction"
import PageHeaderTitle from "@/features/admin_site/shared/components/PageHeaderTitle"
import PageHeaderTitleText from "@/features/admin_site/shared/components/PageHeaderTitleText"
import { Button } from "@/features/admin_site/shared/components/ui/button"

type ShowProps = {
  pageHeaderTitle: string
  article: Article
  articleFieldNames: ArticleFieldNames
  editButtonLabel: string
  editLinkHref: string
  destroyButtonLabel: string
  destroyConfirmMessage: string
  destroyLinkHref: string
}

export default function Show({
  pageHeaderTitle,
  article,
  articleFieldNames,
  editButtonLabel,
  editLinkHref,
  destroyButtonLabel,
  destroyConfirmMessage,
  destroyLinkHref,
}: ShowProps) {
  const handleDestroy = () => {
    if (!window.confirm(destroyConfirmMessage)) {
      return
    }

    router.delete(destroyLinkHref)
  }

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
              <a href={editLinkHref}>{editButtonLabel}</a>
            </Button>
            <Button type="button" variant="destructive" onClick={handleDestroy}>
              {destroyButtonLabel}
            </Button>
          </PageHeaderAction>
        </PageHeader>
      </div>

      <div className="mb-4">
        <FlashAlert />
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
