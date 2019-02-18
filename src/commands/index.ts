import * as vscode from 'vscode'

import Search from './search'
import Submit from './submit'

const commands = [Search, Submit]

export { commands }

export function registerCommands (context: vscode.ExtensionContext) {
  for (const idx in commands) {
    const command = commands[idx]
    context.subscriptions.push(
      vscode.commands.registerCommand(
        command.onCommand,
        () => command.callback())
    )
  }
}

export default registerCommands
