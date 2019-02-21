const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const resolve = require('path').resolve

module.exports = {
  mode: 'production',
  entry: {
    app: './src/extension.ts'
  },
  output: {
    filename: "extension.js",
    path: resolve(__dirname, 'dist')
  },
  node: {
    fs: 'empty'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  externals: ['vscode'],
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  plugins: [
    new FriendlyErrorsWebpackPlugin({
      clearConsole: true
    })
  ],
  performance: {
    hints: false
  },
  stats: { children: false }
}
