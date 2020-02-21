<template>
  <div>
    <div class="card custom-bulma-card-equal-height animated bounceInUp">
      <div class="has-ribbon-bottom has-ribbon-left">
        <figure class="card-image image">
          <img :src="img(website.image)" :alt="website.title" />
        </figure>
        <div class="ribbon is-small is-capitalized">
          <span>
            <span class="icon">
              <i class="fas fa-globe"></i>
            </span>
            <span>{{ website.language }}</span>
          </span>
        </div>
      </div>
      <div class="card-content">
        <h1 class="title is-size-6">
          <span class="icon">
            <i :class="website.icon"></i>
          </span>
          {{ website.title }}
        </h1>
        <p class="subtitle is-size-7">
          {{ website.description }}
        </p>
      </div>
      <footer class="card-footer">
        <div class="card-footer-item">
          <a
            :href="website.url"
            :title="website.url"
            class="button is-fullwidth"
            target="_blank"
          >
            <span class="icon">
              <i class="fas fa-external-link-alt"></i>
            </span>
            <span>Open Website</span>
          </a>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import utils from "@/services/utils";

export default {
  name: "WebsiteCard",
  props: {
    website: Object
  },
  methods: {
    img(filename) {
      return utils.img(filename, "default.jpg", "websites");
    }
  }
};
</script>
