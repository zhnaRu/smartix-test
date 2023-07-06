import { DataItemProduct } from '@/entities/DataItemProduct'

export interface DataItem {
  id: number,
  groupId: number,
  product: DataItemProduct
}
