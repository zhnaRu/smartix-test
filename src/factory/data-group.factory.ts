import { DataGroup } from '@/entities/DataGroup'
import { DataGroupDTO } from '@/dto/DataGroup.dto'

export const dataGroupFactory = {
  makeFromDto (dto: DataGroupDTO): DataGroup {
    return {
      id: dto.id ?? 0,
      logo: dto.logo,
      name: dto.name,
      parentId: dto.idParent ?? 0
    }
  }
}
