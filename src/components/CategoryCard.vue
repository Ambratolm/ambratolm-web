<template>
  <div v-if="category" class="card custom-bulma-card-equal-height">
    <div class="card-image">
      <figure class="image">
        <img
          :src="img(category.image)"
          alt="currentCategory"
        />
      </figure>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <div class="icon is-large">
            <i :class="category.icon" class="fa-3x"></i>
          </div>
        </div>
        <div class="media-content">
          <p class="title is-4">{{ category.title }}</p>
          <p class="subtitle is-6">
            By Ambratolm
          </p>
        </div>
      </div>
      <div class="content has-text-justified custom-overflow">
        {{ category.description }}
      </div>
    </div>
    <div class="card-footer">
      <div class="card-footer-item" style="justify-content: flex-start;">
        <div class="tags custom-overflow">
          <a
            v-for="tag in arr(category.tags)"
            @click="$emit('set-tag', tag)"
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
</template>

<script>
import utils from "@/services/utils";

export default {
  name: "CategoryCard",
  props: {
    category: Object,
    currentTag: String
  },
  methods: {
    img(filename) {
      return utils.img(filename, "default.png", "categories");
    },
    arr(text) {
      return utils.arr(text);
    }
  }
};
</script>
