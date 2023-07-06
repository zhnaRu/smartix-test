import {
  computed, ComputedRef
} from 'vue'
import { DataItem } from '@/entities/DataItem'
import { storeUse } from '@/composable/store.use'

interface DataItemsUse {
  dataItems: ComputedRef<DataItem[]>
  dataItemsLoading: ComputedRef<boolean>
}

export const dataItemsUse = (): DataItemsUse => {
  const { state } = storeUse()

  return {
    dataItems: computed<DataItem[]>(() => state.main.items),
    dataItemsLoading: computed<boolean>(() => state.main.dataLoading.readFile)
  }
}
