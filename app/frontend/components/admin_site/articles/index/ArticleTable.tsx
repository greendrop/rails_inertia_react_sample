import { Table, TableHeader, TableBody, TableRow, TableCell } from '@/components/admin_site/ui/table'
import ArticleTableRow from './ArticleTableRow'
import { Article, ArticleColumnNames } from '@/types/admin_site/articles/index'

export default function ArticleTable({ articles, articleColumnNames }: { articles: Article[], articleColumnNames: ArticleColumnNames }) {
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