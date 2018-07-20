import firebase from "~/plugins/firebase";
import { firebaseAction } from "vuexfire";

const db = firebase.database();
const tasksRef = db.ref("tasks");

export const state = () => ({
  tasks: []
});

export const getters = {
  tasks: state => state.tasks
};

export const actions = {
  init: firebaseAction(({ bindFirebaseRef }) => {
    bindFirebaseRef("tasks", tasksRef);
  }),

  add: firebaseAction((context, name) => {
    tasksRef.push(name);
  }),
}
