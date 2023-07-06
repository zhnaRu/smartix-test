import Vue from 'vue'
import Vuex from 'vuex'
import { mainModule, MainModule } from '@/store/main'

Vue.use(Vuex)

export type RootState = {
  value: any;
  main: MainModule,
};

export default new Vuex.Store<RootState>({
  modules: {
    main: mainModule
  }
})
