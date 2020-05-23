import { WebhookPayloadPullRequest } from '@octokit/webhooks'
import fetch, { Response } from 'node-fetch'
import { Context } from 'probot'
import { getClickUpToken } from './config'

export const getClickUpId = (context: Context<WebhookPayloadPullRequest>): string | null => {
  // const { title } = context.payload.pull_request
  // const matches = title.match(/#([aA-zZ0-9]+)/)
  // return matches?.length == 2 ? matches[1] : null
  const [ id ] = context.payload.pull_request.head.ref.split('-')
  console.log(`extracted ${id} from ${context.payload.pull_request.head.ref}`)
  return id
}

export const updateClickUp = async (status: string, context: Context<WebhookPayloadPullRequest>): Promise<void> => {
  const token = await getClickUpToken(context)
  const taskId = getClickUpId(context)
  if (!taskId) {
    console.log('Could not find task id :(')
    return
  }

  console.log(`setting status for ${taskId} to ${status}`)

  const url = `https://api.clickup.com/api/v2/task/${taskId}`
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': token
  }

  const data = { status }
  fetch(url, { method: 'PUT', headers: headers, body: JSON.stringify(data) })
    .then((res: Response) => {
      return res.json()
    })
    .then((json: any) => {
      console.log(json)
    })
}

