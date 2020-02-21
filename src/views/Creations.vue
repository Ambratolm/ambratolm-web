<template>
  <div id="creations">
    <div class="hero is-primary">
      <div class="hero-body animated fadeIn">
        <div class="container has-text-centered">
          <h1 class="title animated pulse infinite slower">
            <span>Ambratolm</span>
            <span class="icon is-large">
              <i class="fas fa-copyright"></i>
            </span>
            <span>Creations</span>
          </h1>
          <b-field position="is-centered">
            <b-input
              v-model="currentQuery"
              :placeholder="`Search ${creations.length} creations`"
              type="search"
              icon="search"
              style="margin: 0 20%;"
            >
            </b-input>
          </b-field>
          <!-- <b-field position="is-centered">
            <p class="control">
              <button class="button">
                <b-icon icon="crown"></b-icon>
              </button>
            </p>
            <p class="control">
              <button class="button">
                <b-icon icon="crow"></b-icon>
              </button>
            </p>
            <p class="control">
              <button class="button">
                <b-icon icon="info"></b-icon>
              </button>
            </p>
          </b-field> -->
        </div>
      </div>
      <div class="hero-foot">
        <nav v-if="categories.length" class="tabs is-boxed is-centered">
          <ul>
            <li
              v-for="category in categories"
              :key="category.name"
              :class="{
                'is-active': currentCategory === category.name
              }"
            >
              <a
                @click="currentCategory = category.name"
                :title="category.description"
              >
                <span class="icon">
                  <i :class="category.icon"></i>
                </span>
                <span>
                  <span>
                    {{ category.title }}
                  </span>
                  <span
                    v-show="
                      currentTag ||
                        currentQuery ||
                        currentCategory === category.name
                    "
                    class="tag is-rounded"
                    :class="{
                      'is-success has-text-weight-bold':
                        (currentTag || currentQuery) &&
                        currentCreationsRelative(category.name).length,
                      'is-primary':
                        !(currentTag || currentQuery) &&
                        currentCreationsRelative(category.name).length
                    }"
                    style="margin-left: 5px;"
                  >
                    {{ currentCreationsRelative(category.name).length }}
                  </span>
                </span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    <section class="section">
      <div class="container">
        <div class="columns is-multiline is-centered">
          <CategoryCard
            :category="currentCategoryObj"
            :current-tag="currentTag"
            @set-tag="currentTag = $event"
            class="column is-3 is-full-mobile"
          />
          <div v-if="creations.length" class="column is-9 is-full-mobile">
            <div class="columns is-multiline is-centered">
              <div class="column is-full is-full-mobile">
                <FilterTags
                  v-show="filterIsUsed"
                  :current-creations="currentCreations"
                  :current-category="currentCategory"
                  :current-tag="currentTag"
                  :current-query="currentQuery"
                  :current-category-obj="currentCategoryObj"
                  :current-creations-relative="currentCreationsRelative"
                  @set-category="currentCategory = $event"
                  @set-tag="currentTag = $event"
                  @set-query="currentQuery = $event"
                />
                <b-pagination
                  v-show="
                    currentCreationsRelative(currentCategory).length > perPage
                  "
                  :total="currentCreationsRelative(currentCategory).length"
                  :current.sync="currentPage"
                  :per-page="perPage"
                  range-before="5"
                  range-after="5"
                  order="is-centered"
                  icon-prev="chevron-left"
                  icon-next="chevron-right"
                >
                </b-pagination>
                <transition
                  enter-active-class="animated bounceInUp"
                  leave-active-class="animated bounceOutDown"
                >
                  <div
                    v-if="!currentCreations.length"
                    class="box has-text-centered has-text-grey-light"
                  >
                    <div>
                      <span class="icon is-medium">
                        <i class="far fa-times-circle fa-2x"></i>
                      </span>
                    </div>
                    <div class="is-capitalized has-text-weight-bold">
                      No entries
                    </div>
                  </div>
                </transition>
                <transition-group
                  enter-active-class="animated bounceInUp"
                  leave-active-class="animated bounceOutDown custom-absolute"
                  tag="div"
                  class="columns"
                >
                  <CreationCard
                    v-for="creation in currentCreations"
                    :key="creation.name"
                    :creation="creation"
                    :current-category="currentCategory"
                    :current-tag="currentTag"
                    :current-query="currentQuery"
                    @set-category="currentCategory = $event"
                    @set-tag="currentTag = $event"
                    class="column is-one-third-tablet is-full-mobile"
                  />
                </transition-group>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Vue from "vue";
import TextHighlight from "vue-text-highlight";
import utils from "@/services/utils";
import categoriesSvc from "@/services/categories";
import creationsSvc from "@/services/creations";
import CategoryCard from "@/components/CategoryCard";
import CreationCard from "@/components/CreationCard";
import FilterTags from "@/components/FilterTags";

Vue.component("text-highlight", TextHighlight);

export default {
  name: "creations",
  components: {
    CategoryCard,
    CreationCard,
    FilterTags
  },
  created() {
    const self = this;
    categoriesSvc
      .get()
      .categories()
      .then(categories => (self.categories = categories));
    creationsSvc
      .get()
      .creations()
      .then(creations => (self.creations = creations));
  },
  data() {
    return {
      currentCategory: "all",
      currentTag: "",
      currentQuery: "",
      currentPage: 1,
      perPage: 3,
      creations: [],
      categories: []
    };
  },
  computed: {
    currentCreations() {
      return creationsSvc
        .filter(this.creations)
        .byAll(this.currentCategory, this.currentTag, this.currentQuery)
        .slice(
          (this.currentPage - 1) * this.perPage,
          (this.currentPage - 1) * this.perPage + this.perPage
        );
    },
    currentCategoryObj() {
      return categoriesSvc.find(this.categories).byName(this.currentCategory);
    },
    filterIsUsed() {
      return (
        this.currentCategory !== "all" || this.currentTag || this.currentQuery
      );
    }
  },
  methods: {
    currentCreationsRelative(category, tag, query) {
      return creationsSvc
        .filter(this.creations)
        .byAll(
          category || this.currentCategory,
          tag || this.currentTag,
          query || this.currentQuery
        );
    },
    img(filename) {
      return utils.img(filename, "default.png", "creations");
    },
    arr(text) {
      return utils.arr(text);
    }
  },
  mounted() {
    if (localStorage.currentCategory) {
      this.currentCategory = localStorage.currentCategory;
    }
    if (localStorage.currentTag) {
      this.currentTag = localStorage.currentTag;
    }
    if (localStorage.currentQuery) {
      this.currentQuery = localStorage.currentQuery;
    }
  },
  watch: {
    currentCategory(newValue) {
      this.currentPage = 1;
      localStorage.currentCategory = newValue;
    },
    currentTag(newValue) {
      this.currentPage = 1;
      localStorage.currentTag = newValue;
    },
    currentQuery(newValue) {
      this.currentPage = 1;
      localStorage.currentQuery = newValue;
    }
  }
};
</script>

<style lang="css" scoped>
.column {
  transition: all 1s;
  display: inline-block;
}
</style>
