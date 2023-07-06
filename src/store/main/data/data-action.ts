import { ActionTree } from 'vuex'
import { RootState } from '@/store'
import { fileReadService } from '@/api/file-read.service'
import { DataState } from '@/store/main/data/data-state'

export const dataAction: ActionTree<DataState, RootState> = {
  async fetchDataFile ({ commit }, file: File) {
    commit('dataLoading', { key: 'readFile', state: true })
    await fileReadService.fileRead(file)
      .then((res) => {
        commit('dataUpdate', res)
      })
      .finally(() => commit('dataLoading', { key: 'readFile', state: false }))
  }
}
