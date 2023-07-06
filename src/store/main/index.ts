import { Module } from 'vuex'
import { RootState } from '@/store'
import { dataState, DataState } from '@/store/main/data/data-state'
import { dataMutation } from '@/store/main/data/data-mutation'
import { dataAction } from '@/store/main/data/data-action'

export type MainModule = DataState;
export const mainModule: Module<MainModule, RootState> = {
  namespaced: true,
  state: {
    ...dataState
  },
  mutations: {
    ...dataMutation
  },
  actions: {
    ...dataAction
  }
}
