'use strict';

import * as vscode from 'vscode';

export namespace DialogOptions {
    export const open: vscode.MessageItem = { title: 'Open' };
    export const yes: vscode.MessageItem = { title: 'Yes' };
    export const no: vscode.MessageItem = { title: 'No', isCloseAffordance: true };
    export const never: vscode.MessageItem = { title: 'Never' };
    export const singUp: vscode.MessageItem = { title: 'Sign up' };
}

export async function promptForOpenOutputChannel (message: string, type: DialogType = DialogType.info, channel: vscode.OutputChannel): Promise<void> {
  let result: vscode.MessageItem | undefined;
  switch (type) {
    case DialogType.info:
      result = await vscode.window.showInformationMessage(message, DialogOptions.open, DialogOptions.no);
      break;
    case DialogType.warning:
      result = await vscode.window.showWarningMessage(message, DialogOptions.open, DialogOptions.no);
      break;
    case DialogType.error:
      result = await vscode.window.showErrorMessage(message, DialogOptions.open, DialogOptions.no);
      break;
    default:
      break;
  }

  if (result === DialogOptions.open) {
    channel.show();
  }
}

export async function showFileSelectDialog (): Promise<vscode.Uri[] | undefined> {
  const defaultUri: vscode.Uri | undefined = vscode.workspace.rootPath ? vscode.Uri.file(vscode.workspace.rootPath) : undefined;
  const options: vscode.OpenDialogOptions = {
    defaultUri,
    canSelectFiles: true,
    canSelectFolders: false,
    canSelectMany: false,
    openLabel: 'Select'
  };
  return vscode.window.showOpenDialog(options);
}

export enum DialogType {
    info = 'info',
    warning = 'warning',
    error = 'error'
}
