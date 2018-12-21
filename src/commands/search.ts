import * as vscode from 'vscode'
import { getProblem } from '../utils/api'
import { md } from '../utils/markdown'
import { promptForOpenOutputChannel, DialogType } from '../utils/uiUtils'

export async function search (channel: vscode.OutputChannel, uri?: vscode.Uri): Promise<void> {
  let input = await vscode.window.showInputBox({
    placeHolder: '输入题号',
    validateInput: s => s && s.trim() ? undefined : '输入不能为空'
  })
  if (!input) {
    return
  }
  try {
    await getProblem(input).then(problem => {
      let pannel = vscode.window.createWebviewPanel(problem.getStringPID(), problem.getName(), vscode.ViewColumn.Two)
      let content = md.render(problem.toMarkDown())
      let html = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${problem.getName()}</title>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@9.12.0/build/styles/default.min.css">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.9.0/katex.min.css">
        </head>
        <body>
        ${content}
        </body>
        </html>`
      pannel.webview.html = html
      return problem
    }).then(problem => {
      problem.save()
    }).catch(err => {
      throw err
    })
  } catch (error) {
    console.log(error)
    await promptForOpenOutputChannel(error, DialogType.error, channel)
  }
}
