export type Article = {
  id: number
  title: string
  status: string
  createdAt: string
  updatedAt: string
  showLinkHref: string
  destroyLinkHref: string
}

export type ArticleFieldNames = {
  id: string
  title: string
  status: string
  createdAt: string
  updatedAt: string
  operations: string
}
