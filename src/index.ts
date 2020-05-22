import { WebhookPayloadPullRequest } from '@octokit/webhooks'
import { Application, Context } from 'probot'
import { updateClickUp } from './clickup'
import { mapLabelsToStatus } from './helpers'

const processLabels = async (context: Context<WebhookPayloadPullRequest>): Promise<void> => {
  const { labels } = context.payload.pull_request
  const status = await mapLabelsToStatus(labels, context)
  await mapLabelsToStatus(labels, context)
  await updateClickUp(status, context)
}

export = (app: Application) => {
  app.on('pull_request.labeled', async (context) => {
    await processLabels(context)
  })
}

