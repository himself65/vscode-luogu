"use strict";

import * as vscode from "vscode";
import { UserStatus } from "./shared";

export interface ILuoguStatusBarItem {
    updateStatusBar(status: UserStatus, user?: string): void;
    dispose(): void;
}

class LuoguStatusBarItem implements ILuoguStatusBarItem {
    private readonly statusBarItem: vscode.StatusBarItem;

    constructor() {
        console.log('Init LuoguStatusBarItem');
        this.statusBarItem = vscode.window.createStatusBarItem();
        this.statusBarItem.text = "Signed Out";
        this.statusBarItem.command = "leetcode.getProblemState";
    }

    updateStatusBar(status: UserStatus, user?: string) {
        console.log('Updating StatusBar.');
        switch (status) {
            case UserStatus.SignedIn:
                this.statusBarItem.text = `Luogu: ${user}`;
                break;
            case UserStatus.SignedOut:
            default:
                this.statusBarItem.text = 'Signed Out';
        }
    }

    dispose() {
        this.statusBarItem.dispose();
    }
}

export const luoguStatusBarItem: ILuoguStatusBarItem = new LuoguStatusBarItem();