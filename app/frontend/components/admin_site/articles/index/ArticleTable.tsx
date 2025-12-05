import { Table, TableHeader, TableBody, TableRow, TableCell } from '@/components/admin_site/ui/table'
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
          <TableCell>{articleColumnNames.id}</TableCell>
          <TableCell>{articleColumnNames.title}</TableCell>
          <TableCell>{articleColumnNames.status}</TableCell>
          <TableCell>{articleColumnNames.createdAt}</TableCell>
          <TableCell>{articleColumnNames.updatedAt}</TableCell>
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