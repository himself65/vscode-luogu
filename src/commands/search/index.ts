import * as vscode from 'vscode'
import SuperCommand from '../SuperCommand'
import { searchProblem } from '../../utils/api'
import Problem from '../../model/Problem'

const generateHTML = (problem: Problem) => `
<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${problem.name}</title>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@9.12.0/build/styles/default.min.css">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.9.0/katex.min.css">
        </head>
        <body>
        ${problem.toMarkDown()}
        </body>
</html>`

export default new SuperCommand({
  onCommand: 'showProblem',
  handle: async () => {
    const pid = await vscode.window.showInputBox({
      placeHolder: '输入题号'
    }).then(res => res ? res.toUpperCase() : null)
    if (!pid) {
      await vscode.window.showErrorMessage('非法题号')
      return
    }
    const problem = await searchProblem(pid).then(res => new Problem(res))
    const panel = vscode.window.createWebviewPanel(problem.stringPID, problem.name, vscode.ViewColumn.Two)
    panel.webview.html = generateHTML(problem)
  }
})
