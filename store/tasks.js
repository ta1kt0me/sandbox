import firebase from "~/plugins/firebase";
import { firebaseAction } from "vuexfire";

const db = firebase.database();
const tasksRef = db.ref("/tasks");

export const state = () => ({
  tasks: [
    { name: "test" }
  ]
})

export const getters = {
  tasks(state) {
    return state.list
  }
}

export const actions = {
  init: firebaseAction(({ bindFirebaseRef }, cb) => {
    bindFirebaseRef("tasks", tasksRef, { readyCallback: cb });
  }),
}
