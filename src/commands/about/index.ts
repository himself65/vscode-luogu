import SuperCommand from '../SuperCommand'
import debug from '../../utils/debug'
import { promptForOpenOutputChannel } from '../../utils/uiUtils'

export default new SuperCommand({
  onCommand: 'about',
  handle: async () => {
    debug('About Command clicked.')
    // todo: open webview
    await promptForOpenOutputChannel('欢迎使用vscode-luogu \n\n 开发者：himself65')
  }
})
