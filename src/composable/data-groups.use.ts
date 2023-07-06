import {
  computed, ComputedRef
} from 'vue'
import { DataGroup } from '@/entities/DataGroup'
import { storeUse } from '@/composable/store.use'

interface DataGroupsUse {
  dataGroups: ComputedRef<DataGroup[]>
  dataGroupsLoading: ComputedRef<boolean>
}

export const dataGroupsUse = (): DataGroupsUse => {
  const { state } = storeUse()

  return {
    dataGroups: computed<DataGroup[]>(() => state.main.groups),
    dataGroupsLoading: computed<boolean>(() => state.main.dataLoading.readFile)
  }
}
