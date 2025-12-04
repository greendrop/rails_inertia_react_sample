import { Head } from '@inertiajs/react'
import Layout from '@/components/admin_site/Layout'
import ArticleTable from '@/components/admin_site/articles/index/ArticleTable'
import { Article, ArticleColumnNames } from '@/types/admin_site/articles'

type IndexProps = {
  articles: Article[]
  articleColumnNames: ArticleColumnNames
}

export default function Index({ articles, articleColumnNames }: IndexProps) {
  return (
    <>
      <Head title="記事一覧" />
      <Layout>
        <div>
          <h1>記事一覧</h1>

          <ArticleTable articles={articles} articleColumnNames={articleColumnNames} />
        </div>
      </Layout>
    </>
  )
}
