import { EventPayloads } from '@octokit/webhooks'
import { Context } from 'probot'
import { IConfig, IMapping } from './interfaces'

const getConfig = async (context: Context<EventPayloads.WebhookPayloadPullRequest>): Promise<IConfig> => {
  return await context.config('clickup_sync.yml') as IConfig
}

export const getClickUpToken = async (context: Context<EventPayloads.WebhookPayloadPullRequest>): Promise<any> => {
  const config = await getConfig(context)
  return config ? config['clickup_token'] : 'fake-clickup-token'
}

export const getLabelMapping = async (context: Context<EventPayloads.WebhookPayloadPullRequest>): Promise<IMapping> => {
  const config = await getConfig(context)
  return config ? config['label_to_status'] as IMapping : {} as IMapping
}
