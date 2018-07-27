"use strict";

import * as vscode from 'vscode';
import { getProblem } from '../utils/api';
// import { Problem } from '../data/Problem';
// TODO
// import { } from 'markdown-palettes'; 

export async function searchProblem(channel: vscode.OutputChannel, uri?: vscode.Uri): Promise<void> {
    let input = await vscode.window.showInputBox({ placeHolder: '输入题号' });

    if (!input) { return; }

    await getProblem(input, problem => {
        let pannel = vscode.window.createWebviewPanel(problem.getStringPID(), problem.getName(), vscode.ViewColumn.One);
        pannel.webview.html = problem.toHTML();
        console.log(pannel.webview.html);
    });
}
