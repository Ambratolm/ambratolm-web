import contactLinksSvc from "@/services/database/contact-links";

export default {
  state: {
    contactLinks: []
  },
  getters: {
    contactLinks: state => state.contactLinks
  },
  mutations: {
    setContactLinks(state, contactLinks) {
      state.contactLinks = contactLinks;
    }
  },
  actions: {
    getContactLinks({ commit }) {
      contactLinksSvc
        .getContactLinks()
        .then(contactLinks => commit("setContactLinks", contactLinks));
    }
  }
};
