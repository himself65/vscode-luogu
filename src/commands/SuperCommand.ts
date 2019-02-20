import debug from '../utils/debug'

export default class {
  public readonly onCommand!: string

  constructor (props: { onCommand: string, handle: Function }) {
    Object.assign(this, props)
  }

  private handle!: Function

  public callback = () => {
    debug(`${this.onCommand} start.`)
    this.handle()
    debug(`${this.onCommand} end.`)
  }
}
