import * as types from './mutation-types'

const mutations = {
  [types.SET_ROUTES] (state, routes) {
    state.routes = routes
  },
  [types.SET_OPENED] (state, opened) {
    state.opened = opened
  },
  [types.SET_MSGISSHOW] (state, msgIsShow) {
    state.msgIsShow = msgIsShow
  },
  [types.SET_USERINFO] (state, userInfo) {
    state.userInfo = userInfo
  }
}

export default mutations
