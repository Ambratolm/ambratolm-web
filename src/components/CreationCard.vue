<template>
  <div>
    <div class="card custom-card-hover custom-bulma-card-equal-height">
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
            @click="$emit('set-category', category)"
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
        <div class="card-footer-item" style="justify-content: flex-start;">
          <div class="tags custom-overflow">
            <a
              v-for="tag in arr(creation.tags)"
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
  </div>
</template>

<script>
import utils from "@/services/utils";

export default {
  name: "CreationCard",
  props: {
    creation: Object,
    currentCategory: String,
    currentTag: String,
    currentQuery: String
  },
  methods: {
    img(filename) {
      return utils.img(filename, "default.png", "creations");
    },
    arr(text) {
      return utils.arr(text);
    }
  }
};
</script>

<style lang="css" scoped>
.custom-overflow {
  max-height: 200px;
}
</style>
