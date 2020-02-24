import categoriesSvc from "@/services/database/categories";

export default {
  state: {
    categories: []
  },
  getters: {
    categories: state => state.categories,
    findCategoryByName: state => categoryName =>
      categoriesSvc.findCategoryByName(state.categories, categoryName)
  },
  mutations: {
    setCategories(state, categories) {
      state.categories = categories;
    }
  },
  actions: {
    getCategories({ commit }) {
      categoriesSvc
        .getCategories()
        .then(categories => commit("setCategories", categories));
    }
  }
};
