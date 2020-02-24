import crud from "./$crud";

export default {
  getProfiles() {
    return crud.read("profiles").then(profiles => profiles);
  }
};
