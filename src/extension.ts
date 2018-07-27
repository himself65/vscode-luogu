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

    context.subscriptions.push(
        // vscode.window.registerTreeDataProvider("luoguExplorer", luoguTreeDataProvider),
        vscode.commands.registerCommand("luogu.about", about),
        vscode.commands.registerCommand("luogu.signin", () => luoguManager.signIn(channel)),
        vscode.commands.registerCommand("luogu.signout", () => luoguManager.signOut(channel)),
        vscode.commands.registerCommand("luogu.showProblem", () => { }),
        vscode.commands.registerCommand("luogu.searchProblem", () => searchProblem(channel)),
        vscode.commands.registerCommand("luogu.submitSolution", () => { }),
        vscode.commands.registerCommand("luogu.refreshExplorer", () => { })
    );

    luoguManager.on('statusChanged', () => {
        luoguStatusBarItem.updateStatusBar(luoguManager.getStatus(), luoguManager.getUser());
    });
}

export function deactivate() {
    luoguStatusBarItem.dispose();
}