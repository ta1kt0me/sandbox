export const namespaced = true;

export const state = () => ({
  currentUser: null
})

export const mutations = {
  setSession(state, loginId) {
    state.currentUser = loginId
  }
}

export const getters = {
  isSignedIn (state) {
    return !!state.currentUser
  },
}

export const actions = {
  createSession({ commit }, loginId) {
    commit("setSession", loginId);
  },

  destroySession({ commit }) {
    commit("setSession", null);
  }
}
