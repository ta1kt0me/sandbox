<template>
  <div>
    Hello {{name}}
    <nuxt />
    <li v-if="isSignedIn"><a href="#" @click="signout">Sign out</a></li>
    <li v-else><a href="#" @click="signin">Signin with GitHub</a></li>
  </div>
</template>

<script>
import firebase from "~/plugins/firebase";
import axios from "axios";
import { mapState, mapGetters } from "vuex";

export default {
  computed: {
    ...mapState({
      name: state => state.users.currentUser,
    }),

    ...mapGetters({
      isSignedIn: "isSignedIn"
    }),
  },

  methods: {
    createSession(loginId) {
      this.$store.dispatch("createSession", loginId);
      console.log("signed in");
    },

    signin() {
      const provider = new firebase.auth.GithubAuthProvider();
      firebase.auth().signInWithPopup(provider);
    },

    async signout() {
      try {
        this.$store.dispatch("destroySession");
        await firebase.auth().signOut();
        console.log("signed out")
      } catch(error) {
        console.log(error);
        console.log("couldn't sign out");
      }
    },
  },

  created () {
    const getUserName = async uid => {
      try {
        const response = await axios.get(`https://api.github.com/user/${uid}`)
        return this.createSession(response.data.login);
      } catch(error) {
        console.log(error);
        console.log("couldn't get login id from GitHub");
      }
    };

    firebase.auth().onAuthStateChanged(user => {
      if (user && user.providerData) {
        const uid = user.providerData[0].uid;
        getUserName(uid);
      } else {
        console.log("sign failed")
      }
    });
  },
}
</script>
