import store, { RootState } from '@/store/index'

export const storeUse = () => ({
  state: store.state as RootState,
  getters: store.getters,
  commit: store.commit,
  dispatch: store.dispatch
})
