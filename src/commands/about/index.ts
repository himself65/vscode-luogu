import SuperCommand from '../SuperCommand'
import debug from '../../utils/debug'

export default new SuperCommand({
  onCommand: 'about',
  handle: () => {
    debug('About Command clicked.')
  }
})
