export default {
  namespaced: true, // 避免模块冲突
  state: {
    resetTag: false
  },
  mutations: {
    reset (state) { state.resetTag = true },
    initTag (state) { state.resetTag = false }
  },
  getters: {

  },
  actions: {

  }
}
