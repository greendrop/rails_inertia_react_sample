import { TableCell, TableRow } from "@/components/admin_site/ui/table"
import type { Article } from "@/types/admin_site/articles/index"

export type ArticleTableRowProps = {
  article: Article
}

export default function ArticleTableRow({ article }: ArticleTableRowProps) {
  return (
    <TableRow>
      <TableCell>{article.id}</TableCell>
      <TableCell>{article.title}</TableCell>
      <TableCell>{String(article.status)}</TableCell>
      <TableCell>{new Date(article.createdAt).toLocaleString()}</TableCell>
      <TableCell>{new Date(article.updatedAt).toLocaleString()}</TableCell>
    </TableRow>
  )
}
