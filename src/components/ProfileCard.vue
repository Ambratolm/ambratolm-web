<template>
  <div>
    <div class="card custom-bulma-card-equal-height animated bounceInUp">
      <div class="card-content">
        <div class="media">
          <div class="media-left">
            <span class="icon is-large">
              <i :class="profile.icon" class="fa-3x"></i>
            </span>
          </div>
          <div class="media-content">
            <p class="title is-5">{{ profile.title }}</p>
            <p class="subtitle is-6">@{{ profile.username }}</p>
          </div>
        </div>
        <p class="subtitle is-size-7">
          {{ profile.description }}
        </p>
      </div>
      <footer class="card-footer">
        <div class="card-footer-item">
          <a
            :href="profile.url"
            :title="profile.url"
            class="button is-fullwidth"
            target="_blank"
          >
            <span class="icon">
              <i class="fas fa-external-link-alt"></i>
            </span>
            <span>Open Page</span>
          </a>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
// import utils from "@/services/utils";

export default {
  name: "ProfileCard",
  props: {
    profile: Object
  },
  methods: {}
};
</script>
