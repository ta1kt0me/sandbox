import firebase from "~/plugins/firebase";
import { firebaseAction } from "vuexfire";

const db = firebase.database();
const usersRef = db.ref("/users");

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
  init: firebaseAction(({ bindFirebaseRef }, cb) => {
    bindFirebaseRef("tasks", tasksRef, { readyCallback: cb });
  }),

  createSession({ commit }, loginId) {
    commit("setSession", loginId);
  },

  destroySession({ commit }) {
    commit("setSession", null);
  }
}
