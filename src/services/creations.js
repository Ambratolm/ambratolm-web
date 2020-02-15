import axios from "axios";
import jsyaml from "js-yaml";
import Fuse from "fuse.js";

export default {
  get() {
    let self = this;
    return {
      creation(creationName) {
        return axios
          .get(`data/creations/${creationName}.yml`)
          .then(response => jsyaml.load(response.data));
      },
      creationsNames() {
        return axios
          .get("data/creations.yml")
          .then(response => jsyaml.load(response.data));
      },
      creations() {
        let creations = [];
        return self.get().creationsNames().then(creationsNames => {
          if (creationsNames) {
            creationsNames.forEach(creationName =>
              self
                .get().creation(creationName)
                .then(creation => creations.push(creation))
            );
          }
          return creations;
        });
      }
    }
  },
  filter(creations) {
    let self = this;
    return {
      byCategory(category = "") {
        category = category.trim().toLowerCase();
        if (category && category !== "all") {
          creations = creations.filter(creation => {
            if (typeof creation.categories === "string") {
              return creation.categories
                .trim()
                .toLowerCase()
                .split(",")
                .map(item => item.trim())
                .includes(category);
            }
          });
        }
        return creations;
      },
      byTag(tag = "") {
        tag = tag.trim().toLowerCase();
        if (tag) {
          creations = creations.filter(creation => {
            if (typeof creation.tags === "string") {
              return creation.tags
                .trim()
                .toLowerCase()
                .split(",")
                .map(item => item.trim())
                .includes(tag);
            }
          });
        }
        return creations;
      },
      byQuery(query = "") {
        query = query.trim().toLowerCase();
        if (query) {
          const fuse = new Fuse(creations, {
            keys: [
              "title",
              "description",
              "tags",
              "links.title",
              "links.description",
              "links.url"
            ]
          });
          creations = fuse.search(query);
        }
        return creations;
      },
      byAll(category = "", tag = "", query = "") {
        creations = self.filter(creations).byCategory(category);
        creations = self.filter(creations).byTag(tag);
        creations = self.filter(creations).byQuery(query);
        return creations;
      }
    };
  }
};
