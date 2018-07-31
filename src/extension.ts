'use strict';

import * as vscode from 'vscode';
import { luoguUserManager } from './luoguUserManager';
import { luoguStatusBarItem } from './luoguStatusBarItem';
import { search } from './commands/search';
import { submit } from './commands/submit';
import { promptForOpenOutputChannel, DialogType } from './utils/uiUtils';

export function activate(context: vscode.ExtensionContext) {
    const channel: vscode.OutputChannel = vscode.window.createOutputChannel("Luogu");

    let about = function () {
        promptForOpenOutputChannel('Developed by Himself65', DialogType.info, channel);
    };

    let notice = function () {
        promptForOpenOutputChannel('这部分还没有写完QAQ', DialogType.info, channel);
    };

    // TAG: showProblem 与 searchProblem 功能不同
    // 前者通过 Explorer 访问题目，后者直接搜索题目
    // TODO: 之后会整合功能
    context.subscriptions.push(
        // vscode.window.registerTreeDataProvider("luoguExplorer", luoguTreeDataProvider),
        vscode.commands.registerCommand("luogu.about", about),
        vscode.commands.registerCommand("luogu.signin", () => luoguUserManager.signIn(channel)),
        vscode.commands.registerCommand("luogu.signout", () => luoguUserManager.signOut(channel)),
        vscode.commands.registerCommand("luogu.showProblem", notice),
        vscode.commands.registerCommand("luogu.searchProblem", () => search(channel)),
        vscode.commands.registerCommand("luogu.submitSolution", () => submit(channel)),
        vscode.commands.registerCommand("luogu.refreshExplorer", notice)
    );

    luoguStatusBarItem.updateStatusBar(luoguUserManager.getStatus(), luoguUserManager.getUser());
    luoguUserManager.on('stateChanged', () => {
        luoguStatusBarItem.updateStatusBar(luoguUserManager.getStatus(), luoguUserManager.getUser());
    });
}

export function deactivate() {
    luoguStatusBarItem.dispose();
}
