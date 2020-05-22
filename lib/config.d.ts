import { WebhookPayloadPullRequest } from '@octokit/webhooks';
import { Context } from 'probot';
import { IMapping } from './interfaces';
export declare const getClickUpToken: (context: Context<WebhookPayloadPullRequest>) => Promise<any>;
export declare const getLabelMapping: (context: Context<WebhookPayloadPullRequest>) => Promise<IMapping>;
