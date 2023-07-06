
import { DataItemProductDTO } from '@/dto/DataItemProduct.dto'
import { DataItemProduct } from '@/entities/DataItemProduct'

export const dataItemProductFactory = {
  makeFromDto (dto: DataItemProductDTO): DataItemProduct {
    return {
      description: dto.description || '',
      id: dto.id,
      name: dto.name,
      price: dto.price,
      unitType: dto.unitType || '',
      weight: dto.weight || 0
    }
  }
}
