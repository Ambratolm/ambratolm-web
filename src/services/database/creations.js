import crud from "./$crud";
import Fuse from "fuse.js";

export default {
  getCreation(creationName) {
    return crud.read(`creations/${creationName}`).then(creation => creation);
  },
  getCreationsNames() {
    return crud.read("creations").then(creationsNames => creationsNames);
  },
  getCreations() {
    let creations = [];
    return this.getCreationsNames().then(creationsNames => {
      if (creationsNames) {
        creationsNames.forEach(creationName =>
          this.getCreation(creationName).then(creation =>
            creations.push(creation)
          )
        );
      }
      return creations;
    });
  },
  filterCreationsByCategory(creations, category = "") {
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
  filterCreationsByTag(creations, tag = "") {
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
  filterCreationsByQuery(creations, query = "") {
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
  filterCreationsByAll(creations, category = "", tag = "", query = "") {
    creations = this.filterCreationsByCategory(creations, category);
    creations = this.filterCreationsByTag(creations, tag);
    creations = this.filterCreationsByQuery(creations, query);
    return creations;
  }
};
