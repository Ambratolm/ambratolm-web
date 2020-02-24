import profilesSvc from "@/services/database/profiles";

export default {
  state: {
    profiles: []
  },
  getters: {
    profiles: state => state.profiles
  },
  mutations: {
    setProfiles(state, profiles) {
      state.profiles = profiles.reverse();
    }
  },
  actions: {
    getProfiles({ commit }) {
      profilesSvc
        .getProfiles()
        .then(profiles => commit("setProfiles", profiles));
    }
  }
};
