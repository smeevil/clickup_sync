import { EventPayloads } from '@octokit/webhooks';
import { Context } from 'probot';
export declare const getClickUpId: (context: Context<EventPayloads.WebhookPayloadPullRequest>) => string | null;
export declare const updateClickUp: (status: string, context: Context<EventPayloads.WebhookPayloadPullRequest>) => Promise<void>;
