/**
 * @author katsuji
 * @time 2022-01-04
 * @description 定义store对象
 */

import Vue from 'vue'
import Vuex from 'vuex'
import storePlugin from 'vuex-persistedstate'
import common from './common'
Vue.use(Vuex)

const store = new Vuex.Store({
  plugins: [
    storePlugin({
      storage: window.sessionStorage
    })
  ],

  modules: {
    common
  }
})

export default store
