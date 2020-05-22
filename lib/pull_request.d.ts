import { WebhookPayloadPullRequest } from '@octokit/webhooks';
import { Context } from 'probot';
export declare const getClickUpToken: (context: Context<WebhookPayloadPullRequest>) => Promise<any>;
export declare const processLabels: (context: Context<WebhookPayloadPullRequest>) => Promise<void>;
export declare const getClickUpId: (title: string) => string | null;
export declare const mapLabelsToStatus: (labels: ILabel[], context: Context<WebhookPayloadPullRequest>) => Promise<string>;
export declare const updateClickUp: (taskId: string, context: Context<WebhookPayloadPullRequest>) => Promise<void>;
