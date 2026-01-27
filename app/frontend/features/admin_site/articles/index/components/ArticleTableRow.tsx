import { Link, router } from "@inertiajs/react"
import { Button } from "@/features/admin_site/shared/components/ui/button"
import {
  TableCell,
  TableRow,
} from "@/features/admin_site/shared/components/ui/table"
import type { Article } from "../types"

export type ArticleTableRowProps = {
  article: Article
  showLinkLabel: string
  destroyButtonLabel: string
  destroyConfirmMessage: string
}

export default function ArticleTableRow({
  article,
  showLinkLabel,
  destroyButtonLabel,
  destroyConfirmMessage,
}: ArticleTableRowProps) {
  const handleDestroy = () => {
    if (!window.confirm(destroyConfirmMessage)) {
      return
    }

    router.delete(article.destroyLinkHref)
  }

  return (
    <TableRow>
      <TableCell>{article.id}</TableCell>
      <TableCell>{article.title}</TableCell>
      <TableCell>{String(article.status)}</TableCell>
      <TableCell>{new Date(article.createdAt).toLocaleString()}</TableCell>
      <TableCell>{new Date(article.updatedAt).toLocaleString()}</TableCell>
      <TableCell>
        <div className="flex flex-wrap gap-2">
          <Button asChild variant="outline">
            <Link href={article.showLinkHref}>{showLinkLabel}</Link>
          </Button>
          <Button type="button" variant="destructive" onClick={handleDestroy}>
            {destroyButtonLabel}
          </Button>
        </div>
      </TableCell>
    </TableRow>
  )
}
