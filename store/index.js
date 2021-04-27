export const state = () => ({
  api: false,
  popup: false,
  currentScene: 'center',
  animating: false,
  info: false,
  muted: false,
  scenes: [
    {
      title: 'Touch',
      loaded: false
    },{
      title: 'Taste',
      loaded: false
    },{
      title: 'Smell',
      loaded: false
    },{
      title: 'Hearing',
      loaded: false
    },{
      title: 'Sight',
      loaded: false
    },{
      title: 'Synesthesia',
      loaded: false
    }
  ]
})


export const actions = {
  async nuxtServerInit({ dispatch }) {
    await dispatch('getData')
  },
  async getData({ commit }) {
    const { data } = await this.$axios.get(`${process.env.CMS_URL}`)
    commit('setData', data)
  },
}

export const mutations = {
  setData(state, theData) {
    state.api = theData
  },
  setPopup(state, bool) {
    state.popup = bool
  },
  setInfoPopup(state, bool) {
    state.info = bool
  },
  toggleMuted(state, bool) {
    state.muted = bool
  },
  setAnimating(state, bool) {
    state.animating = bool
  },
  setScene(state, number) {
    state.currentScene = number
  },
  ballLoaded(state, ball) {
    switch (ball) {
      case 1:
        console.log('Ball 1')
        state.scenes[0].loaded = true
        break;
      case 2:
        console.log('Ball 2')
        state.scenes[1].loaded = true
        break;
      case 3:
        console.log('Ball 3')
        state.scenes[2].loaded = true
        break;
      case 4:
        console.log('Ball 4')
        state.scenes[3].loaded = true
        break;
      case 5:
        console.log('Ball 5')
        state.scenes[4].loaded = true
        break;
      case 6:
        console.log('Ball 6')
        state.scenes[5].loaded = true
        break;
      default:
        console.log(`Ball INDEx ${ball}.`);
    }
  }
}
