<template>
  <div>
    Hello {{name}}
    <nuxt />
    <li v-if="isSignedIn"><a href="#" @click="signout">Sign out</a></li>
    <li v-else><a href="#" @click="signin">Signin with GitHub</a></li>
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
