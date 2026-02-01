import { Link } from "@inertiajs/react"
import { Button } from "@/features/user_site/shared/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/features/user_site/shared/components/ui/card"
import type { Article } from "../types"

type ArticleCardProps = {
  article: Article
  readMoreLabel: string
}

export default function ArticleCard({
  article,
  readMoreLabel,
}: ArticleCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{article.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{article.body}</p>
      </CardContent>
      <CardFooter>
        <div className="w-full flex justify-end">
          <Button asChild variant="link">
            <Link href={article.showLinkHref}>{readMoreLabel}</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
