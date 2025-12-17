import { Link } from "@inertiajs/react"
import { Button } from "@/components/admin_site/ui/button"
import { TableCell, TableRow } from "@/components/admin_site/ui/table"
import type { Article } from "../types"

export type ArticleTableRowProps = {
  article: Article
  showLinkLabel: string
}

export default function ArticleTableRow({
  article,
  showLinkLabel,
}: ArticleTableRowProps) {
  return (
    <TableRow>
      <TableCell>{article.id}</TableCell>
      <TableCell>{article.title}</TableCell>
      <TableCell>{String(article.status)}</TableCell>
      <TableCell>{new Date(article.createdAt).toLocaleString()}</TableCell>
      <TableCell>{new Date(article.updatedAt).toLocaleString()}</TableCell>
      <TableCell>
        <Button asChild variant="outline">
          <Link href={article.showLinkHref}>{showLinkLabel}</Link>
        </Button>
      </TableCell>
    </TableRow>
  )
}
