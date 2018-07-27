import * as vscode from 'vscode';

export interface ILuoguPickBarItem {
    updatePickrBar(selected: vscode.QuickPickItem): void;
}

class LuoguQuickPickItem implements ILuoguPickBarItem {
    private readonly quickPickItem: vscode.StatusBarItem;
    private languageItems: vscode.QuickPickItem[] = [];

    constructor() {
        this.quickPickItem = vscode.window.createStatusBarItem();
        this.languageItems.push(
            { label: 'Auto' },
            { label: 'C++11' },
            { label: 'C++' },
            { label: 'C' },
            { label: 'Java' },
            { label: 'Node.js' },
            { label: 'Java' },
            { label: 'Python2' },
            { label: 'Python3' }
        );
        // TODO 将pickItem显示文本为用户选择的语言
        this.quickPickItem.show();
    }

    updatePickrBar(selected: vscode.QuickPickItem): void {
        this.quickPickItem.text = selected.label;
    }

    dispose(): void {
        this.quickPickItem.dispose();
    }
}

export const luoguQuickPickItem = new LuoguQuickPickItem();