import { DataItemProductDTO } from '@/dto/DataItemProduct.dto'

export interface DataItemDTO {
  id: number,
  idGroup: number | null,
  product: DataItemProductDTO
}
