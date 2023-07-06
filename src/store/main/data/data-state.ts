import { DataGroup } from '@/entities/DataGroup'
import { DataItem } from '@/entities/DataItem'

export interface DataState {
  groups: DataGroup[],
  items: DataItem[],
  isDataFileLoaded: boolean,

  dataLoading: {
    readFile: boolean,
  },
}

export const dataState: DataState = {
  groups: [],
  items: [],
  isDataFileLoaded: false,

  dataLoading: {
    readFile: false
  }
}
