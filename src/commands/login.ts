import * as vscode from 'vscode';
import { loginUser } from '../utils/api';
// import { showError } from '../shared';

export async function login(channel: vscode.OutputChannel, uri?: vscode.Uri) {
    let username = await vscode.window.showInputBox({ placeHolder: '输入您的用户名' });
    let password = await vscode.window.showInputBox({ placeHolder: '输入账户密码', password: true });
    await loginUser(username, password, cookie => {
        loginUser(username, password);
    });
}
