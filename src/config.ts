import { WebhookPayloadPullRequest } from '@octokit/webhooks'
import { Context } from 'probot'
import { IConfig, IMapping } from './interfaces'

const getConfig = async (context: Context<WebhookPayloadPullRequest>): Promise<IConfig> => {
  return await context.config('clickup_sync.yml') as IConfig
}

export const getClickUpToken = async (context: Context<WebhookPayloadPullRequest>): Promise<any> => {
  const config = await getConfig(context)
  return config['clickup_token']
}

export const getLabelMapping = async (context: Context<WebhookPayloadPullRequest>): Promise<IMapping> => {
  const config = await getConfig(context)
  return config['label_to_status'] as IMapping
}
