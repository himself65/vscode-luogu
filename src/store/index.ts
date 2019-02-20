import { createStore } from 'redux'

function appStore () {

}

export * from './shared'

export const store = createStore(appStore)

export default store
