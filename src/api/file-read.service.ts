import { dataGroupFactory } from '@/factory/data-group.factory'
import { dataItemFactory } from '@/factory/data-item.factory'
import { DataDTO } from '@/dto/Data.dto'

export const fileReadService = {
  fileRead (file: File) {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.addEventListener('load', (event) => {
        resolve((event?.target?.result as string) || '')
      })

      reader.readAsText(file)
    }).then((json) => {
      const data: DataDTO = JSON.parse(json)
      return {
        groups: data.groups.map((item) => dataGroupFactory.makeFromDto(item)),
        items: data.items.map((item) => dataItemFactory.makeFromDto(item))
      }
    })
  }
}
