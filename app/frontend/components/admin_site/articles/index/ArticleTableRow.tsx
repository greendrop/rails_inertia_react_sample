import { TableRow, TableCell } from '@/components/admin_site/ui/table'
import { Article } from '@/types/admin_site/articles/index'

export default function ArticleTableRow({ article }: { article: Article }) {
  return (
    <TableRow>
      <TableCell>{article.title}</TableCell>
      <TableCell>{String(article.status)}</TableCell>
      <TableCell>{new Date(article.created_at).toLocaleString()}</TableCell>
      <TableCell>{new Date(article.updated_at).toLocaleString()}</TableCell>
    </TableRow>
  )
}
