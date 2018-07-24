<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
    >
      <v-list dense>
        <v-list-tile @click="signout" v-if="isSignedIn">
          <v-list-tile-action>
            <v-icon>fas fa-sign-out-alt</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Sign Out</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="signin" v-else>
          <v-list-tile-action>
            <v-icon>fab fa-github-alt</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Sign In with GitHub</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="indigo" dark app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Hello! {{name}}😆</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat to="/">Top</v-btn>
        <v-btn flat to="/tasks">Tasks</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout
          justify-center
          align-center
        >
          <v-flex text-xs-center>
            <div>
              <nuxt />
              <li v-if="isSignedIn"><a href="#" @click="signout">Sign out</a></li>
              <li v-else><a href="#" @click="signin">Signin with GitHub</a></li>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer color="indigo" app>
      <v-card class="flex" flat tile>
        <v-card-actions class="grey darken-3 justify-center">
          <span class="white--text">&copy; 2018 - <strong>ta1kt0me</strong></span>
        </v-card-actions>
      </v-card>
    </v-footer>
  </v-app>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { createNamespacedHelpers } from 'vuex'

const usersHelpers = createNamespacedHelpers('users')
const mapUsersGetters = usersHelpers.mapGetters
const mapUsersActions = usersHelpers.mapActions

const tasksHelpers = createNamespacedHelpers('tasks')
const mapTasksActions = tasksHelpers.mapActions

export default {
  data: () => ({
    drawer: false,
  }),

  computed: {
    ...mapState({
      name: state => state.users.currentUser,
    }),

    ...mapUsersGetters({
      isSignedIn: "isSignedIn",
    }),
  },

  methods: {
    ...mapUsersActions({
      createSession: "createSession",
      getSignInUser: "getSignInUser",
      signin: "signin",
      signout: "signout",
    }),

    ...mapTasksActions({
      tasksInit: "init",
    })
  },

  async created () {
    const name = await this.getSignInUser();
    if (name) {
      this.tasksInit();
    }
  },
}
</script>
