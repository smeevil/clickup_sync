import { WebhookPayloadPullRequest } from '@octokit/webhooks';
import { Context } from 'probot';
import { ILabel } from './interfaces';
export declare const mapLabelsToStatus: (labels: ILabel[], context: Context<WebhookPayloadPullRequest>) => Promise<string>;
