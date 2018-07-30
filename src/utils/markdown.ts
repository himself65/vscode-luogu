import * as markdownit from 'markdown-it';
import * as markdownitkatex from '@luogu-dev/markdown-it-katex';
import * as markdownhighlight from 'markdown-it-highlightjs';

export const md = new markdownit().use(markdownitkatex).use(markdownhighlight);
