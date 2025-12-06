import { Head } from '@inertiajs/react'
import Layout from '@/components/admin_site/shared/Layout'
import ArticleTable from '@/components/admin_site/articles/index/ArticleTable'
import { Article, ArticleColumnNames } from '@/types/admin_site/articles'
import { SharedProps } from '@/types/admin_site'

type IndexSpecificProps = {
  articles: Article[]
  articleColumnNames: ArticleColumnNames
}
type IndexProps = SharedProps & IndexSpecificProps;

export default function Index({ sidebar, articles, articleColumnNames }: IndexProps) {
  return (
    <>
      <Head title="記事一覧" />
      <Layout sidebar={sidebar}>
        <div>
          <h1>記事一覧</h1>

          <ArticleTable articles={articles} articleColumnNames={articleColumnNames} />
        </div>
      </Layout>
    </>
  )
}
