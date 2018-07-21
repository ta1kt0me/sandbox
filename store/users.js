import axios from "axios";
import firebase from "~/plugins/firebase";

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
  signin() {
    const provider = new firebase.auth.GithubAuthProvider();
    firebase.auth().signInWithPopup(provider);
  },

  async signout({ commit }) {
    try {
      commit("setSession", null);
      await firebase.auth().signOut();
      console.log("signed out");
    } catch(error) {
      console.log(error);
      console.log("couldn't sign out");
    }
  },

  getSignInUser({ dispatch }) {
    firebase.auth().onAuthStateChanged(user => {
      if (user && user.providerData) {
        const uid = user.providerData[0].uid;
        dispatch("createSession", uid);
      } else {
        console.log("sign failed");
      }
    });
  },

  async createSession({ commit }, uid) {
    try {
      const response = await axios.get(`https://api.github.com/user/${uid}`)
      commit("setSession", response.data.login);
      console.log("signed in");
    } catch(error) {
      console.log(error);
      console.log("couldn't get login id from GitHub");
    }
  },
}
