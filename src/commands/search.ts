"use strict";

import * as vscode from 'vscode';
import { getProblem } from '../utils/api';
import * as markdownit from 'markdown-it';

export async function searchProblem(channel: vscode.OutputChannel, uri?: vscode.Uri): Promise<void> {
    let input = await vscode.window.showInputBox({ placeHolder: '输入题号' });

    if (!input) { return; }

    await getProblem(input, problem => {
        let pannel = vscode.window.createWebviewPanel(problem.getStringPID(), problem.getName(), vscode.ViewColumn.One);
        // new vscode.MarkdownString(problem.toMarkDown());
        let md = new markdownit("default");
        let str = md.render(problem.toMarkDown());
        console.log(str);
        pannel.webview.html = ` <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${problem.getName()}</title>
        </head>
        <body>
        ${str}
        </body>
        </html>`;
    });
}
