export interface ILabel {
  id: number
  node_id: string
  url: string
  name: string
  color: string
  default: boolean
  description: string
}

export interface IConfig {
  clickup_token: string
  label_to_status: IMapping
}

export interface IMapping {
  [key: string]: string
}
