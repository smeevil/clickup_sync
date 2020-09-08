import { EventPayloads } from '@octokit/webhooks'
import fetch, { Response } from 'node-fetch'
import { Context } from 'probot'
import { getClickUpToken } from './config'

export const getClickUpId = (context: Context<EventPayloads.WebhookPayloadPullRequest>): string | null => {
  // console.log("context in getClickUpId", JSON.stringify(context))
  // CU-7pm31p-fdafadsfas
  // 7pm31p-fdafadsfas


  // const [ id ] = context.payload.pull_request.head.ref.split('-')
  const matches = context.payload.pull_request.head.ref.match(/^((CU-.*?)|(.*?))-/)
  const id = matches ? matches[1].replace(/^CU-/, '') : null
  console.log(`extracted ${id} from ${context.payload.pull_request.head.ref}`)
  return id
}

export const updateClickUp = async (status: string, context: Context<EventPayloads.WebhookPayloadPullRequest>): Promise<void> => {
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

