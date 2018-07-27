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
        this.statusBarItem.command = "leetcode.getProblemState";
        this.statusBarItem.hide();
    }

    updateStatusBar(status: UserStatus, user?: string): void {
        console.log('Updating StatusBar.');
        switch (status) {
            case UserStatus.SignedIn:
                this.statusBarItem.text = `Luogu: ${user}`;
                this.statusBarItem.show();
                break;
            case UserStatus.SignedOut:
            default:
                this.statusBarItem.hide();
        }
    }

    dispose(): void {
        this.statusBarItem.dispose();
    }
}

export const luoguStatusBarItem: ILuoguStatusBarItem = new LuoguStatusBarItem();