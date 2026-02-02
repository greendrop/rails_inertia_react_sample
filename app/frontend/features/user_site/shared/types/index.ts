export type Flash = {
  notice?: string
  alert?: string
}

export type Errors = Record<string, string[]>

export type SharedProps = {
  flash: Flash
  errors: Errors
}
