import Vuex from 'vuex'
import { firebaseMutations } from "vuexfire";

import * as users from "./users";
import * as tasks from "./tasks";

const store = () => {
  return new Vuex.Store({
    state: {},
    getters: {},
    mutations: firebaseMutations,
    actions: {},
    modules: {
      users,
      tasks,
    }
  });
};

export default store;
