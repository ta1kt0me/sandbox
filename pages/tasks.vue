<template>
  <div>
    <h1>
      Todos
    </h1>
    <ul>
      <li v-for="(task, index) in tasks" :key="index">
        {{ task.name }}
      </li>
    </ul>
    <nuxt-link to="/">Top</nuxt-link>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  mounted() {
    this.$store.dispatch("tasks/init")
  },

  computed: mapGetters({
    tasks: "tasks/tasks"
  })
}
</script>
