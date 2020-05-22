import { WebhookPayloadPullRequest } from '@octokit/webhooks';
import { Context } from 'probot';
export declare const getClickUpId: (context: Context<WebhookPayloadPullRequest>) => string | null;
export declare const updateClickUp: (status: string, context: Context<WebhookPayloadPullRequest>) => Promise<void>;
