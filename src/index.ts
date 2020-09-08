import { EventPayloads } from '@octokit/webhooks'
import { Application, Context } from 'probot'
import { updateClickUp } from './clickup'
import { mapLabelsToStatus } from './helpers'

const processLabels = async (context: Context<EventPayloads.WebhookPayloadPullRequest>): Promise<void> => {
  console.log("context in processLabels", JSON.stringify(context))
  const { labels } = context.payload.pull_request
  const status = await mapLabelsToStatus(labels, context)
  await mapLabelsToStatus(labels, context)
  await updateClickUp(status, context)
}

export = (app: Application) => {
  app.on("*", async (context) => {
    console.log('incoming message', JSON.stringify(context))
    context.log.info({ event: context.event, action: context.payload.action });
  })

  app.on('pull_request.labeled', async (context) => {
    await processLabels(context)
  })
}

