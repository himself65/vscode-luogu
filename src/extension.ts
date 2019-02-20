import * as vscode from 'vscode'
import debug from './utils/debug'

import RegisterCommands from './commands'
import RegisterViews from './views'

export async function activate (context: vscode.ExtensionContext): Promise<void> {
  debug('initializing luogu-vscode.')

  RegisterCommands(context)
  RegisterViews(context)
  console.log('init luogu-vscode success.')
}

export function deactivate (): void {
  // Do nothing.
}
