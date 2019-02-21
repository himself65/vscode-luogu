import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import json from 'rollup-plugin-json'
import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript'

export default {
  input: './src/extension.ts',
  output: {
    file: 'dist/extension.js',
    format: 'cjs'
  },
  external: ['marked', 'lodash'],
  plugins: [
    resolve(),
    commonjs(),
    json(),
    typescript(),
    terser()
  ]
}
