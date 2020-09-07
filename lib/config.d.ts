import { EventPayloads } from '@octokit/webhooks';
import { Context } from 'probot';
import { IMapping } from './interfaces';
export declare const getClickUpToken: (context: Context<EventPayloads.WebhookPayloadPullRequest>) => Promise<any>;
export declare const getLabelMapping: (context: Context<EventPayloads.WebhookPayloadPullRequest>) => Promise<IMapping>;
