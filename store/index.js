import { options } from './../scripts/site_data.json'

export const state = () => ({
  api: options,
  popup: false,
  currentScene: 'center',
  animating: false,
  info: false,
  muted: false,
  videoDone: false,
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
    // await dispatch('getData')
  },
  async getData({ commit }) {
    // console.log(options)
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
  setInfoPopup(state) {
    state.info = !state.info
  },
  toggleMuted(state) {
    state.muted = !state.muted
  },
  setAnimating(state, bool) {
    state.animating = bool
  },
  setScene(state, number) {
    state.currentScene = number
  },
  setVideoDone(state) {
    state.videoDone = true
  },
  ballLoaded(state, ball) {
    switch (ball) {
      case 1:
        //console.log('Touch')
        state.scenes[0].loaded = true
        break;
      case 2:
        //console.log('Taste')
        state.scenes[1].loaded = true
        break;
      case 3:
        //console.log('Smell')
        state.scenes[2].loaded = true
        break;
      case 4:
        //console.log('Hearing')
        state.scenes[3].loaded = true
        break;
      case 5:
        //console.log('Sight')
        state.scenes[4].loaded = true
        break;
      case 6:
        //console.log('Synesthesia')
        state.scenes[5].loaded = true
        break;
      default:
        //console.log(`Ball INDEx ${ball}.`);
    }
  }
}
