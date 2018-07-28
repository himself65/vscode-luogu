'use strict';

import * as vscode from 'vscode';
import { luoguManager } from './luoguManager';
import { luoguStatusBarItem } from './luoguStatusBarItem';
import { searchProblem } from './commands/search';

export function activate(context: vscode.ExtensionContext) {
    const channel: vscode.OutputChannel = vscode.window.createOutputChannel("Luogu");

    let about = function () {
        vscode.window.showInformationMessage('Developed by Himself65');
    };

    let notice = function () {
        vscode.window.showInformationMessage('功能未完成，敬请期待');
    };

    context.subscriptions.push(
        // vscode.window.registerTreeDataProvider("luoguExplorer", luoguTreeDataProvider),
        vscode.commands.registerCommand("luogu.about", about),
        vscode.commands.registerCommand("luogu.signin", () => notice),
        vscode.commands.registerCommand("luogu.signout", () => notice),
        vscode.commands.registerCommand("luogu.showProblem", () => notice),
        vscode.commands.registerCommand("luogu.searchProblem", () => searchProblem(channel)),
        vscode.commands.registerCommand("luogu.submitSolution", () => notice),
        vscode.commands.registerCommand("luogu.refreshExplorer", () => notice)
    );

    luoguManager.on('statusChanged', () => {
        luoguStatusBarItem.updateStatusBar(luoguManager.getStatus(), luoguManager.getUser());
    });
}

export function deactivate() {
    luoguStatusBarItem.dispose();
}