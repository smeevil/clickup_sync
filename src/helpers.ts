import { WebhookPayloadPullRequest } from '@octokit/webhooks'
import { Context } from 'probot'
import { getLabelMapping } from './config'
import { ILabel } from './interfaces'

export const mapLabelsToStatus = async (labels: ILabel[], context: Context<WebhookPayloadPullRequest>): Promise<string> => {
  const mapping = await getLabelMapping(context)
  const keys = Object.keys(mapping)
  const ordered: { [index: number]: string } = {}

  labels.forEach((label) => {
    const index = keys.indexOf(label.name)
    if (index !== -1) {
      ordered[index] = mapping[label.name]
    }
  })

  const lastKey = parseInt(Object.keys(ordered).pop() as string)
  return ordered[lastKey]
}

