'use strict';

import * as vscode from 'vscode';
import * as path from 'path';
import { submitSolution } from '../utils/api';
import { Languages, UserStatus } from '../shared';
import { getSelectedLanguage } from '../utils/workspaceUtils';
import { luoguUserManager } from '../luoguUserManager';

/**
 * 提交题目答案
 * @param {vscode.OutputChannel} channel
 * @param {vscode.Uri} uri
 *
 * @returns {Promise<void>}
 */
export async function submit (channel: vscode.OutputChannel, uri?: vscode.Uri): Promise<void> {
  let edtior = vscode.window.activeTextEditor;
  if (!edtior) { vscode.window.showErrorMessage('您没有打开任何文件，请重试'); return; }
  if (luoguUserManager.getStatus() === UserStatus.SignedOut) { vscode.window.showErrorMessage('您没有登录，请重试'); return; }
  let text = edtior.document.getText();
  const filePath = edtior.document.fileName;
  const fileFName = path.parse(filePath).base;
  const O2: boolean = await vscode.window.showQuickPick(['否', '是'], {
        placeHolder: '是否开启O2优化 (非 C/C++/Pascal 切勿开启)'
    }).then(ans => {
      if (ans === '是') {
        return true;
      } else {
        return false;
      }
    });
  const langs = Object.keys(Languages).filter(k => typeof Languages[k as any] === 'number');
  const selected = await vscode.window.showQuickPick(langs).then((value) => {
    const v = getSelectedLanguage(value);
    return (v === -1 || !v) ? 0 : v;
  });
  const id = await vscode.window.showInputBox({
    placeHolder: '输入提交到的题目ID',
    validateInput: s => s && s.trim() ? undefined : '输入不能为空'
  });
  if (!id) {
    return;
  }
  try {
    vscode.window.showInformationMessage(`${fileFName} 正在提交到 ${id}...`);
    await submitSolution(id, text, selected, O2).then(rid => {
      vscode.window.showInformationMessage('提交成功');
      const url = `https://www.luogu.org/record/show?rid=${rid}`;
      let pannel = vscode.window.createWebviewPanel(`${rid}`, `${rid}`, vscode.ViewColumn.Two);
      let html = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${rid}</title>
        </head>
        <body>
        <h1>暂不支持即时查看，请手动打开链接访问测评地址</h1>
        <a href=${url} target="_blank">${rid}</a>
        </body>
        </html>`;
      pannel.webview.html = html;
    });
  } catch (error) {
    vscode.window.showErrorMessage('提交失败');
    console.error(error);
  }
}
