import { DataDTO } from '@/dto/Data.dto'
import { Data } from '@/entities/Data'
import { dataGroupFactory } from '@/factory/data-group.factory'
import { dataItemFactory } from '@/factory/data-item.factory'

export const dataFactory = {
  makeFromDto (dto: DataDTO): Data {
    return {
      groups: dto.groups.map((item) => dataGroupFactory.makeFromDto(item)),
      items: dto.items.map((item) => dataItemFactory.makeFromDto(item))
    }
  }
}
