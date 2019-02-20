import * as vscode from 'vscode'

import debug from '../utils/debug'
import Search from './search'
import Submit from './submit'
import About from './about'
import { isMaster } from 'cluster'

const commands = [About, Search, Submit]

export { commands }

export function registerCommands (context: vscode.ExtensionContext) {
  for (const idx in commands) {
    const command = commands[idx]
    debug(`register command: ${command.onCommand}.`)
    context.subscriptions.push(
      vscode.commands.registerCommand(
        `luogu.${command.onCommand}`,
        () => {
          command.callback()
        })
    )
  }
  debug('All commands registered.')
}

export default registerCommands
