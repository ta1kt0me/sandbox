<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
    >
      <v-list dense>
        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon>contact_mail</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Contact</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Application</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout
          justify-center
          align-center
        >
          <v-flex text-xs-center>
            <v-tooltip right>
            </v-tooltip>
            <div>
              Hello {{name}}
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
    drawer: true,
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
    await this.getSignInUser();
    this.tasksInit();
  },
}
</script>
