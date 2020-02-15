<template>
  <div id="creations">
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="has-text-centered animated slideInDown">
          <b-field>
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
      <div v-if="categories.length" class="hero-foot">
        <nav class="tabs is-boxed is-centered">
          <ul>
            <li
              v-for="category in categories"
              :key="category.name"
              :class="{ 'is-active': currentCategory === category.name }"
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
                      'is-info is-light': !(currentTag || currentQuery)
                    }"
                  >
                    {{ currentCreationsRelative(category.name).length }}
                  </span>
                </span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="tags is-centered">
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
              <span class="is-capitalized">{{ currentQuery }}</span>
              <button @click="currentQuery = ''" class="delete"></button>
            </div>
          </transition>
        </div>
        <transition
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        >
          <div
            v-if="!currentCreations.length"
            class="notification has-text-centered has-text-grey-light"
          >
            <b-icon pack="far" icon="times-circle" size="is-medium"></b-icon>
            <div class="has-text-weight-bold">No Entries</div>
          </div>
        </transition>
        <div v-if="creations.length">
          <transition-group
            enter-active-class="animated bounceInUp"
            leave-active-class="animated bounceOutDown custom-absolute"
            tag="div"
            class="columns is-multiline  is-centered"
          >
            <div
              v-for="creation in currentCreations"
              :key="creation.name"
              class="column is-one-quarter-tablet is-full-mobile"
            >
              <div
                class="card custom-bulma-card-equal-height custom-card-hover"
              >
                <figure class="card-image image">
                  <img :src="img(creation.image)" :alt="creation.title" />
                </figure>
                <div class="card-content">
                  <h1 class="title is-5">
                    <span class="">
                      <span class="icon">
                        <i :class="creation.icon"></i>
                      </span>
                      <text-highlight :queries="currentQuery">
                        {{ creation.title }}
                      </text-highlight>
                    </span>
                  </h1>
                  <div class="tags custom-overflow">
                    <a
                      v-for="category in arr(creation.categories)"
                      :key="category"
                      @click="currentCategory = category"
                      class="tag is-light is-capitalized"
                      :class="{
                        'is-primary': currentCategory === category
                      }"
                    >
                      {{ category }}
                    </a>
                  </div>
                  <p class="subtitle is-6 custom-overflow">
                    <text-highlight :queries="currentQuery">
                      {{ creation.description }}
                    </text-highlight>
                  </p>
                  <div class="custom-overflow">
                    <article
                      v-for="(link, index) in creation.links"
                      :key="index"
                      class="media"
                      style="margin-bottom: 0;"
                    >
                      <div class="media-left" style="margin: 0 10px 0 0;">
                        <span class="icon is-medium">
                          <i :class="link.icon" class="fa-lg"></i>
                        </span>
                      </div>
                      <div class="media-content">
                        <div class="content">
                          <a
                            :href="link.url"
                            :title="link.title"
                            target="_blank"
                            class="title is-6"
                          >
                            <text-highlight :queries="currentQuery">
                              {{ link.title }}
                            </text-highlight>
                            <span
                              v-if="link.download"
                              title="Download Link"
                              class="tag is-rounded"
                            >
                              <span class="icon is-small">
                                <i class="fas fa-download"></i>
                              </span>
                            </span>
                          </a>
                          <br />
                          <p class="subtitle is-7">
                            <text-highlight :queries="currentQuery">
                              {{ link.description }}
                            </text-highlight>
                          </p>
                        </div>
                      </div>
                    </article>
                  </div>
                </div>
                <div class="card-footer">
                  <div
                    class="card-footer-item"
                    style="justify-content: flex-start;"
                  >
                    <div class="tags custom-overflow">
                      <a
                        v-for="tag in arr(creation.tags)"
                        @click="currentTag = tag"
                        :key="tag"
                        class="tag is-light is-capitalized"
                        :class="{ 'is-primary': tag === currentTag }"
                      >
                        {{ tag }}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
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

Vue.component("text-highlight", TextHighlight);

export default {
  name: "creations",
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
