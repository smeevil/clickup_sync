import { Response } from 'node-fetch'
import { Application, Context } from 'probot'
import { WebhookPayloadPullRequest } from '@octokit/webhooks'

const fetch = require('node-fetch')

interface ILabel {
  id: number
  node_id: string
  url: string
  name: string
  color: string
  default: boolean
  description: string
}

export = (app: Application) => {
  app.on('pull_request.labeled', async (context) => {
    await processLabels(context.payload.pull_request.labels, context)
    // const issueComment = context.issue({ body: 'Thanks for opening this issue!' })
    // await context.github.issues.createComment(issueComment)
  })
}

const processLabels = async (labels: ILabel[], context: Context<WebhookPayloadPullRequest>): Promise<void> => {
  await mapLabelsToStatus(labels, context)
  const id = getClickUpId(context.payload.pull_request.title)
  if (id) updateClickUp(id)
}

const getClickUpId = (title: string): string | null => {
  const matches = title.match(/#([aA-zZ0-9]+)/)
  return matches?.length == 2 ? matches[1] : null
}

const mapLabelsToStatus = async (_labels: ILabel[], context: Context<WebhookPayloadPullRequest>): Promise<string> => {
  const config = await context.config('clickup_sync.yml')
  console.log('got config', config)
  return 'bla'

}
const updateClickUp = (taskId: string) => {
  console.log('updating ', taskId)

  const url = `https://api.clickup.com/api/v2/task/${taskId}`
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'pk_4583724_AE5Y0KNSK02EA6VT7LKFW5SM51LE1S2U'
  }

  const data = { status: 'refined' }
  // fetch(url, { method: 'PUT', headers: headers, body: JSON.stringify(data) })
  //   .then((res: Response) => {
  //     return res.json()
  //   })
  //   .then((json: any) => {
  //     console.log(json)
  //   })
}
