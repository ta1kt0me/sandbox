<template>
  <div>
    <h1>
      Todos
    </h1>
    <ul>
      <li v-for="(task) in tasks" :key="task['.key']">
        <input :value="task.name" @keypress.enter="(e) => updateTask(e, task['.key'])" />
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
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters("tasks", {
      tasks: "tasks",
    }),
  },

  methods: {
    ...mapActions("tasks", {
      init: "init",
      create: "add",
      update: "update",
      destroy: "remove",
    }),

    addTask(event) {
      const name = event.target.value
      if (name.trim()) {
        this.create({name});
      }
      event.target.value = ''
    },

    updateTask(event, key) {
      const name = event.target.value;

      if (name.trim()) {
        this.update({key, name});
      } else {
        this.destroy(key);
      }

      event.target.blur();
    },

    removeTask(key) {
      this.destroy(key);
    }
  },

  mounted() {
    this.init();
  },
}
</script>
