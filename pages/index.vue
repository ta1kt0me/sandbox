<template>
  <div>
    <h1>
      Index {{ name }}
    </h1>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      name: state => state.users.currentUser,
    }),
  },
}
</script>
