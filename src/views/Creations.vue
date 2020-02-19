<template>
  <div id="creations">
    <div class="hero video is-primary">
      <div class="hero-body animated fadeIn">
        <div class="container has-text-centered">
          <h1 class="title animated slideInRight">
            Creations by Ambratolm
          </h1>
          <b-field class="animated slideInLeft">
            <b-input
              v-model="currentQuery"
              :placeholder="`Search ${creations.length} creations`"
              type="search"
              icon="search"
              style="margin: 0 20%;"
            >
            </b-input>
          </b-field>
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
        <div class="tags is-centered">
          <transition
            enter-active-class="animated bounceInRight"
            leave-active-class="animated bounceOutLeft"
          >
            <div
              v-if="currentCategory !== 'all' && currentCategoryObj"
              class="tag is-medium"
              :class="{
                'is-success':
                  currentCreations.length && (currentTag || currentQuery),
                'is-primary':
                  currentCreationsRelative(currentCategory).length &&
                  !(currentTag || currentQuery)
              }"
            >
              <div class="icon">
                <i :class="currentCategoryObj.icon"></i>
              </div>
              <span class="is-capitalized">
                {{ currentCategoryObj.title }}
              </span>
              <button
                v-if="currentCategory !== 'all'"
                @click="currentCategory = 'all'"
                class="delete"
              ></button>
            </div>
          </transition>
          <transition
            enter-active-class="animated bounceInRight"
            leave-active-class="animated bounceOutLeft"
          >
            <div
              v-if="currentQuery"
              class="tag is-medium"
              :class="{
                'is-success': currentCreationsRelative(currentCategory).length
              }"
            >
              <div class="icon">
                <i class="fas fa-search"></i>
              </div>
              <span class="is-capitalized">
                {{ currentQuery }}
              </span>
              <button @click="currentQuery = ''" class="delete"></button>
            </div>
          </transition>
          <transition
            enter-active-class="animated bounceInLeft"
            leave-active-class="animated bounceOutRight"
          >
            <div
              v-if="currentTag"
              class="tag is-medium"
              :class="{
                'is-success': currentCreationsRelative(currentCategory).length
              }"
            >
              <div class="icon">
                <i class="fas fa-tag"></i>
              </div>
              <span class="is-capitalized">{{ currentTag }}</span>
              <button @click="currentTag = ''" class="delete"></button>
            </div>
          </transition>
          <transition
            enter-active-class="animated bounceInLeft"
            leave-active-class="animated bounceOutRight"
          >
            <div
              v-if="!currentCreations.length"
              class="tag is-danger is-medium"
            >
              <div class="icon">
                <i class="far fa-times-circle"></i>
              </div>
              <span class="is-capitalized">No entries</span>
            </div>
          </transition>
        </div>
        <div v-if="creations.length">
          <transition-group
            enter-active-class="animated bounceInUp"
            leave-active-class="animated bounceOutDown custom-absolute"
            tag="div"
            class="columns is-multiline is-centered"
          >
            <div
              key="category"
              class="column is-one-quarter-tablet is-full-mobile"
            >
              <CategoryCard
                :category="currentCategoryObj"
                :current-tag="currentTag"
                @set-tag="currentTag = $event"
              />
            </div>
            <div
              v-for="creation in currentCreations"
              :key="creation.name"
              class="column is-one-quarter-tablet is-full-mobile"
            >
              <CreationCard
                :creation="creation"
                :current-category="currentCategory"
                :current-tag="currentTag"
                :current-query="currentQuery"
                @set-category="currentCategory = $event"
                @set-tag="currentTag = $event"
              />
            </div>
          </transition-group>
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

Vue.component("text-highlight", TextHighlight);

export default {
  name: "creations",
  components: {
    CategoryCard,
    CreationCard
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
      creations: [],
      categories: []
    };
  },
  computed: {
    currentCreations() {
      return creationsSvc
        .filter(this.creations)
        .byAll(this.currentCategory, this.currentTag, this.currentQuery);
    },
    currentCategoryObj() {
      return categoriesSvc.find(this.categories).byName(this.currentCategory);
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
      localStorage.currentCategory = newValue;
    },
    currentTag(newValue) {
      localStorage.currentTag = newValue;
    },
    currentQuery(newValue) {
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
.custom-absolute {
  position: absolute;
}
.custom-overflow {
  max-height: 200px;
  overflow-x: hidden;
  overflow-y: auto;
}
.custom-card-hover {
  transition: box-shadow 0.5s;
}
.custom-card-hover:hover {
  box-shadow: 0 0 10px #888888;
}
</style>
