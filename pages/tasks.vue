<template>
  <div>
    <h1>
      Todos
    </h1>
    <v-flex xs12>
      <v-text-field
        v-model="task"
        label="Task name"
        @keyup.enter="addTask"
      />

      <v-text-field
        v-for="task in tasks"
        :key="task['.key']"
        :value="task.name"
        @keypress.enter="(e) => updateTask(e, task['.key'])"
        append-outer-icon="close"
        @click:append-outer="removeTask(task['.key'])"
      />
    </v-flex>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

const tasksHelpers = createNamespacedHelpers('tasks')
const mapTasksGetters = tasksHelpers.mapGetters
const mapTasksActions = tasksHelpers.mapActions

export default {
  data: () => ({
    task: ""
  }),

  computed: {
    ...mapTasksGetters({
      tasks: "tasks",
    }),
  },

  methods: {
    ...mapTasksActions({
      create: "add",
      update: "update",
      destroy: "remove",
    }),

    addTask(event) {
      const name = this.task;
      if (name.trim()) {
        this.create({name});
        this.task = ''
      }
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
    },
  },
}
</script>
