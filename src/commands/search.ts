"use strict";

import * as vscode from 'vscode';
import { getProblem } from '../utils/api';
import { md } from '../utils/markdown';

export async function searchProblem(channel: vscode.OutputChannel, uri?: vscode.Uri): Promise<void> {
    let input = await vscode.window.showInputBox({ placeHolder: '输入题号' });

    if (!input) { return; }

    await getProblem(input, problem => {
        let pannel = vscode.window.createWebviewPanel(problem.getStringPID(), problem.getName(), vscode.ViewColumn.Two);
        let content = md.render(problem.toMarkDown());
        let html = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${problem.getName()}</title>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@9.12.0/build/styles/default.min.css">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.9.0/katex.min.css">
        </head>
        <body>
        ${content}
        </body>
        </html>`;
        pannel.webview.html = html;
    });
}
