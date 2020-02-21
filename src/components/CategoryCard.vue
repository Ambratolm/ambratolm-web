<template>
  <div>
    <div v-if="category" class="card custom-bulma-card-equal-height">
      <div class="card-image">
        <!-- <figure class="image">
          <img
            :src="img(category.image)"
            alt="currentCategory"
          />
        </figure> -->
        <figure>
          <video
            :src="vid(category.video)"
            :poster="img(category.image)"
            width="100%"
            height="50px"
            type="video/mp4"
            muted
            autoplay
            loop
            style="object-fit: cover;"
          ></video>
        </figure>
      </div>
      <div class="card-content">
        <div class="content">
          <h1 class="title is-5">
            <span class="icon is-medium">
              <i :class="category.icon"></i>
            </span>
            <span>{{ category.title }}</span>
          </h1>
          <h2 class="subtitle is-6">
            <span>{{ category.subtitle }}</span>
          </h2>
          <b-collapse
            :open="false"
            position="is-bottom"
            aria-id="categoryDescription"
          >
            <a
              slot="trigger"
              slot-scope="props"
              aria-controls="categoryDescription"
              :title="category.description"
            >
              <b-icon :icon="!props.open ? 'caret-down' : 'caret-up'"></b-icon>
              {{ !props.open ? "Show more" : "Show less" }}
            </a>
            <p class="has-text-justified">
              {{ category.description }}
            </p>
          </b-collapse>
        </div>
        <a
          v-for="(link, index) in category.links"
          :key="index"
          :href="link.url"
          :tile="link.description"
          target="_blank"
          class="panel-block"
        >
          <span class="panel-icon">
            <i :class="link.icon"></i>
          </span>
          <span>{{ link.title }}</span>
        </a>
      </div>
      <div class="card-footer">
        <div
          class="card-footer-item"
          style="justify-content: flex-start;"
        ></div>
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
    vid(filename) {
      return utils.vid(filename, "default.mp4", "categories");
    },
    arr(text) {
      return utils.arr(text);
    }
  }
};
</script>

<style lang="css" scoped>
.custom-overflow {
  max-height: 100px;
}
</style>
