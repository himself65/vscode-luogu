import * as vscode from 'vscode'
import luoguStatusBar from './luoguStatusBar'
import luoguChannel from './luoguChannel'

export function registerViews (context: vscode.ExtensionContext) {
  context.subscriptions.push(
    luoguStatusBar,
    luoguChannel
  )
}

export default registerViews
