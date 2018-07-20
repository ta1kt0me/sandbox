<template>
  <div>
    <h1>
      Todos
    </h1>
    <ul>
      <li v-for="(task, index) in tasks" :key="index">
        {{ task.name }}
        <button @click="removeTask(task['.key'])">X</button>
      </li>
    </ul>
    <div>
      <input @keyup.enter="addTask" />
    </div>
    <nuxt-link to="/">Top</nuxt-link>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      tasks: "tasks"
    }),
  },

  methods: {
    addTask(event) {
      const name = event.target.value
      if (name.trim()) {
        this.$store.dispatch('add', { name })
      }
      event.target.value = ''
    },

    removeTask(key) {
      this.$store.dispatch("remove", key);
    }
  },

  mounted() {
    this.$store.dispatch("init")
  },
}
</script>
