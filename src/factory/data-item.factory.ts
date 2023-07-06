import { DataItemDTO } from '@/dto/DataItem.dto'
import { DataItem } from '@/entities/DataItem'
import { dataItemProductFactory } from '@/factory/data-item-product.factory'

export const dataItemFactory = {
  makeFromDto (dto: DataItemDTO): DataItem {
    return {
      groupId: dto.idGroup ?? 0,
      id: dto.id,
      product: dataItemProductFactory.makeFromDto(dto.product)
    }
  }
}
