import axios from "axios";
import jsyaml from "js-yaml";

export default {
  get() {
    return {
      categories() {
        return axios
          .get(`data/categories.yml`)
          .then(response => jsyaml.load(response.data));
      }
    };
  },
  find(categories) {
    return {
      byName(categoryName) {
        return categories.find(
          category =>
            category.name.trim().toLowerCase() ===
            categoryName.trim().toLowerCase()
        );
      }
    };
  }
};
