<template>
  <div>
    <h1>
      Index {{ name }}
    </h1>
    <nuxt-link to="/tasks">Tasks</nuxt-link>
    <br />
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      name: (state) => state.user.currentUser,
    }),
  },
}
</script>
