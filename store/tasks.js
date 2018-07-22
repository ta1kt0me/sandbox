import firebase from "~/plugins/firebase";
import { firebaseAction } from "vuexfire";

const db = firebase.database();
const tasksRef = db.ref("tasks");

export const namespaced = true;

export const state = () => ({
  tasks: []
});

export const getters = {
  tasks: state => state.tasks,
};

export const actions = {
  init: firebaseAction(({ bindFirebaseRef, rootState }) => {
    const uid = firebase.auth().currentUser.providerData.find(profile => profile.providerId === "github.com").uid
    bindFirebaseRef(`tasks`, tasksRef.child(uid));
  }),

  add: firebaseAction(({ getters, rootState }, name) => {
    const uid = rootState.users.uid;
    tasksRef.child(uid).push(name);
  }),

  update: firebaseAction(({ rootState }, { key, name }) => {
    const uid = rootState.users.uid;
    tasksRef.child(uid).update({ [key]: { name } });
  }),

  remove: firebaseAction(({ rootState }, key) => {
    const uid = rootState.users.uid;
    tasksRef.child(uid).child(key).remove();
  }),
}
