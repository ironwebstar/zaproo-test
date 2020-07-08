export const state = () => ({
  content: null
})

export const actions = {
  nuxtServerInit ({ commit }, { req, query }) {
    commit('SET_CONTENT', '')
  },

  async parseURL ({ commit }, payload) {
    const { url } = payload
    if (url) {
      const res = await this.$axios.$get(`https://cors-anywhere.herokuapp.com/${url}`)
      commit('SET_CONTENT', res)
    }
  }
}

export const mutations = {
  SET_CONTENT (state, data) {
    state.content = data
  }
}

export const getters = {
  content (state) {
    return state.content
  }
}
