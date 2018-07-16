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
import { mapGetters } from 'vuex'

//export default {
//  computed: mapGetters({
//    todos: 'todos/todos'
//  }),
//  methods: {
//    addTodo(e) {
//      var text = e.target.value
//      if (text.trim()) {
//        this.$store.commit('todos/add', { text })
//      }
//      e.target.value = ''
//    },
//    ...mapMutations({
//      toggle: 'todos/toggle'
//    })
//  }
//}
export default {
  computed: mapGetters({
    tasks: "tasks/tasks"
  })
}
</script>
