import { DataGroup } from '@/entities/DataGroup'
import { DataItem } from '@/entities/DataItem'

export interface Data {
  groups: DataGroup[]
  items: DataItem[]
}
