import crud from "./$crud";

export default {
  getWebsites() {
    return crud.read("websites").then(websites => websites);
  }
};
