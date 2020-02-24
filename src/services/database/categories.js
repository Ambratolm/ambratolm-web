import crud from "./$crud";

export default {
  getCategories() {
    return crud.read("categories").then(categories => categories);
  },
  findCategoryByName(categories, categoryName) {
    return categories.find(
      category =>
        category.name.trim().toLowerCase() === categoryName.trim().toLowerCase()
    );
  }
};
