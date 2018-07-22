import firebase from "~/plugins/firebase";
import { firebaseAction } from "vuexfire";

const db = firebase.database();
const tasksRef = db.ref("tasks")
const taskRef = uid => tasksRef.child(uid)

export const namespaced = true;

export const state = () => ({
  tasks: []
});

export const getters = {
  tasks: state => state.tasks,
};

export const actions = {
  init: firebaseAction(({ bindFirebaseRef, rootState }) => {
    const uid = firebase.auth().currentUser.uid
    bindFirebaseRef(`tasks`, taskRef(uid));
  }),

  add: firebaseAction(({ getters, rootState }, name) => {
    const uid = rootState.users.uid;
    taskRef(uid).push(name);
  }),

  update: firebaseAction(({ rootState }, { key, name }) => {
    const uid = rootState.users.uid;
    taskRef(uid).update({ [key]: { name } });
  }),

  remove: firebaseAction(({ rootState }, key) => {
    const uid = rootState.users.uid;
    taskRef(uid).child(key).remove();
  }),
}
