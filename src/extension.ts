import * as vscode from 'vscode'

import RegisterCommands from './commands'

export async function activate (context: vscode.ExtensionContext): Promise<void> {
  RegisterCommands(context)
}

export function deactivate (): void {
  // Do nothing.
}
