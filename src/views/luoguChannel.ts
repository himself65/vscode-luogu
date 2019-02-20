import * as vscode from 'vscode'

class LuoguChannel implements vscode.Disposable {
  readonly name: string = 'luogu'
  private readonly channel: vscode.OutputChannel = vscode.window.createOutputChannel('luogu')

  public appendLine (message: string): void {
    this.channel.appendLine(message)
  }

  public append (message: string): void {
    this.channel.append(message)
  }

  public show (): void {
    this.channel.show()
  }

  public clear (): void {
    this.channel.clear()
  }

  public hide (): void {
    this.channel.hide()
  }

  public dispose (): void {
    this.channel.dispose()
  }
}

export const luoguChannel = new LuoguChannel()

export default luoguChannel
