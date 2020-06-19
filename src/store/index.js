import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
// 每次修改state时，会在控制台输出
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)
const createPersisted = createPersistedState({
  storage: window.localStorage,
  reducer: (store) => {
    return {
      routes: store.backStatus,
      opened: store.opened,
      msgIsShow:store.msgIsShow,
      userInfo:store.userInfo
    }
  }
})

// 线下调试的时候，开启debug,当运行build时，NODE_DNV是peoduction
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  strict: debug,
  plugins: debug ? [createLogger(), createPersisted] : [createPersisted]
})
