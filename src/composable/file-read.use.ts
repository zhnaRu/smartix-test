import { storeUse } from '@/composable/store.use'
import { computed, ComputedRef } from 'vue'

type FileReadUse = () => ({
  fileRead: (events: File) => Promise<boolean>,
  fileReadLoading: ComputedRef<boolean>
})

export const fileReadUse: FileReadUse = () => {
  const { state, dispatch } = storeUse()

  return {
    fileRead: (event: File) => (
      dispatch('main/fetchDataFile', event)
    ),
    fileReadLoading: computed<boolean>(() => (
      state.main.dataLoading.readFile
    ))
  }
}
