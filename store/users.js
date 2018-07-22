import axios from "axios";
import firebase from "~/plugins/firebase";

export const namespaced = true;

export const state = () => ({
  currentUser: null,
  uid: null,
})

export const mutations = {
  setSession(state, { loginId, uid }) {
    state.currentUser = loginId;
    state.uid = uid;
  }
}

export const getters = {
  isSignedIn (state) {
    return !!state.uid
  },
  currentUser () {
    return state.currentUser;
  },
  uid () {
    return state.uid;
  },
}

export const actions = {
  signin() {
    const provider = new firebase.auth.GithubAuthProvider();
    firebase.auth().signInWithPopup(provider);
  },

  async signout({ commit }) {
    try {
      commit("setSession", { uid: null, loginId: null });
      await firebase.auth().signOut();
      console.log("signed out");
    } catch(error) {
      console.log(error);
      console.log("couldn't sign out");
    }
  },

  async getSignInUser({ dispatch }) {
    const fetchUser = () => {
      return new Promise((resolve, reject) => {
        firebase.auth().onAuthStateChanged(user => {
          if (user && user.providerData) {
            resolve(user);
          } else {
            console.log("sign failed");
            reject();
          }
        });
      });
    }

    const user = await fetchUser();
    if (user !== null) {
      const uid = user.providerData[0].uid;
      dispatch("createSession", uid);
    }
  },

  async createSession({ commit }, uid) {
    try {
      const response = await axios.get(`https://api.github.com/user/${uid}`)
      commit("setSession", { uid, loginId: response.data.login });
      console.log("signed in");
    } catch(error) {
      console.log(error);
      console.log("couldn't get login id from GitHub");
    }
  },
}
