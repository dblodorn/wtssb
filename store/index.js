export const state = () => ({
  api: false,
  popup: false,
  scene: 1
})


export const actions = {
  async nuxtServerInit({ dispatch }) {
    await dispatch('getData')
  },
  async getData({ commit }) {
    const { data } = await this.$axios.get(`${process.env.CMS_URL}`)
    commit('setData', data)
  }
}

export const mutations = {
  setData(state, theData) {
    state.api = theData
  },
  setPopup(state, bool) {
    state.popup = bool
  },
  setScene(state, number) {
    state.scene = number
  }
}
