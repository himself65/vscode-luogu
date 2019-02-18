import * as vscode from 'vscode'
import { UserStatus } from '../utils/shared'
import debug from '../utils/debug'

export class LuoguStatusBar implements vscode.Disposable {
  private readonly statusBarItem: vscode.StatusBarItem

  constructor () {
    debug('initializing luoguStatusBarItem.')
    this.statusBarItem = vscode.window.createStatusBarItem()
    this.statusBarItem.command = 'luogu.userInfo'
    debug('init luoguStatusBarItem finished.')
  }

  public updateStatusBar (status: UserStatus): void {
    // todo: update text content
    switch (status) {
      case UserStatus.Login:
        this.statusBarItem.text = '洛谷已登录'
        this.statusBarItem.show()
        break
      case UserStatus.Logout:
      default:
        this.statusBarItem.text = '暂未登陆洛谷账户'
        this.statusBarItem.show()
        break
    }
    debug(`luoguStatusBarItem: userStatus ${UserStatus[status]}.`)
  }

  public dispose (): void {
    debug('luoguStatusBarItem: dispose.')
    // todo
  }
}

export default new LuoguStatusBar()
