export const state = () => ({
  list: [
    { name: "test" }
  ]
})

export const getters = {
  tasks(state) {
    return state.list
  }
}
