<template>
  <div>
    <h1>
      Hello {{ name }}
    </h1>
    <nuxt-link to="/tasks">Tasks</nuxt-link>
  </div>
</template>

<script>
export default {
  data: () => {
    return { name: "world" }
  }
}
</script>
