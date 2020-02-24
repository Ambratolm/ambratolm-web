import creationsSvc from "@/services/database/creations";

export default {
  state: {
    creations: []
  },
  getters: {
    creations: state => state.creations,
    filterCreationsByAll: state => (category, tag, query) =>
      creationsSvc.filterCreationsByAll(state.creations, category, tag, query)
  },
  mutations: {
    setCreations(state, creations) {
      state.creations = creations;
    }
  },
  actions: {
    getCreations({ commit }) {
      creationsSvc
        .getCreations()
        .then(creations => commit("setCreations", creations));
    }
  }
};
