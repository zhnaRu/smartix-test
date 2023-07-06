import { DataState } from '@/store/main/data/data-state'
import { Data } from '@/entities/Data'

export const dataMutation = {
  dataUpdate (
    state: DataState,
    data: Data
  ): void {
    state.groups = data.groups
    state.items = data.items
    state.isDataFileLoaded = true
  },

  dataLoading (
    state: DataState,
    payload: {
      key: keyof DataState['dataLoading'],
      state: boolean,
    }
  ): void {
    state.dataLoading[payload.key] = payload.state
  }
}
