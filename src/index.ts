import { Application } from 'probot' // eslint-disable-line no-unused-vars

export = (app: Application) => {
  app.on('pull_request.labeled', async (context) => {
    console.log('received')
    console.log(JSON.stringify(context))
    // const issueComment = context.issue({ body: 'Thanks for opening this issue!' })
    // await context.github.issues.createComment(issueComment)
  })
}
