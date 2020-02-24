import websitesSvc from "@/services/database/websites";

export default {
  state: {
    websites: []
  },
  getters: {
    websites: state => state.websites
  },
  mutations: {
    setWebsites(state, websites) {
      state.websites = websites;
    }
  },
  actions: {
    getWebsites({ commit }) {
      websitesSvc
        .getWebsites()
        .then(websites => commit("setWebsites", websites));
    }
  }
};
