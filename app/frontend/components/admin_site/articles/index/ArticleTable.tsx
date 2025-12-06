import { Table, TableHeader, TableBody, TableRow, TableHead } from '@/components/admin_site/ui/table'
import ArticleTableRow from './ArticleTableRow'
import { Article, ArticleColumnNames } from '@/types/admin_site/articles/index'

export type ArticleTableProps = {
  articles: Article[]
  articleColumnNames: ArticleColumnNames
}

export default function ArticleTable({ articles, articleColumnNames }: ArticleTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{articleColumnNames.id}</TableHead>
          <TableHead>{articleColumnNames.title}</TableHead>
          <TableHead>{articleColumnNames.status}</TableHead>
          <TableHead>{articleColumnNames.createdAt}</TableHead>
          <TableHead>{articleColumnNames.updatedAt}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {articles.map((article) => (
          <ArticleTableRow key={article.id} article={article} />
        ))}
      </TableBody>
    </Table>
  )
}