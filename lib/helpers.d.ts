import { EventPayloads } from '@octokit/webhooks';
import { Context } from 'probot';
import { ILabel } from './interfaces';
export declare const mapLabelsToStatus: (labels: ILabel[], context: Context<EventPayloads.WebhookPayloadPullRequest>) => Promise<string>;
