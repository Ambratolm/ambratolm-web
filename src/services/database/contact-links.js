import crud from "./$crud";

export default {
  getContactLinks() {
    return crud.read("contact-links").then(contactLinks => contactLinks);
  }
};
