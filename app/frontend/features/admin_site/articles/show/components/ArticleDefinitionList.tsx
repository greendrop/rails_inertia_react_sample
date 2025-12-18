import type { Article, ArticleFieldNames } from "../types"

export type ArticleDefinitionListProps = {
  article: Article
  articleFieldNames: ArticleFieldNames
}

export default function ArticleDefinitionList({
  article,
  articleFieldNames,
}: ArticleDefinitionListProps) {
  return (
    <>
      <dl className="md:flex md:gap-4 mb-2">
        <dt className="font-bold w-1/4">{articleFieldNames.id}</dt>
        <dd className="w-3/4">{article.id}</dd>
      </dl>
      <dl className="md:flex md:gap-4 mb-2">
        <dt className="font-bold w-1/4">{articleFieldNames.title}</dt>
        <dd className="w-3/4">{article.title}</dd>
      </dl>
      <dl className="md:flex md:gap-4 mb-2">
        <dt className="font-bold w-1/4">{articleFieldNames.status}</dt>
        <dd className="w-3/4">{article.status}</dd>
      </dl>
      <dl className="md:flex md:gap-4 mb-2">
        <dt className="font-bold w-1/4">{articleFieldNames.body}</dt>
        <dd className="w-3/4">{article.body}</dd>
      </dl>
      <dl className="md:flex md:gap-4 mb-2">
        <dt className="font-bold w-1/4">{articleFieldNames.createdAt}</dt>
        <dd className="w-3/4">
          {new Date(article.createdAt).toLocaleString()}
        </dd>
      </dl>
      <dl className="md:flex md:gap-4 mb-2">
        <dt className="font-bold w-1/4">{articleFieldNames.updatedAt}</dt>
        <dd className="w-3/4">
          {new Date(article.updatedAt).toLocaleString()}
        </dd>
      </dl>
    </>
  )
}
