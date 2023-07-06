import { DataGroupDTO } from '@/dto/DataGroup.dto'
import { DataItemDTO } from '@/dto/DataItem.dto'

export interface DataDTO {
  groups: DataGroupDTO[]
  items: DataItemDTO[]
}
