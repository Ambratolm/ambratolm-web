<template>
  <div id="home">
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container has-text-centered">
          <figure class="custom-center animated slideInDown">
            <img
              class="image"
              src="@/assets/images/logos/ambratolm-logo-light.png"
              alt="Ambratolm"
              style="width: 300px;"
            />
          </figure>
          <h2 class="subtitle animated slideInUp">
            Making cool things for cool multimedias
          </h2>
        </div>
      </div>
      <div class="hero-foot">
        <nav class="tabs is-boxed is-centered">
          <ul>
            <li :class="{ 'is-active': tab === 'websites' }">
              <a @click="tab = 'websites'">
                <span class="icon is-small">
                  <i class="fas fa-globe"></i>
                </span>
                <span>
                  <span>Websites </span>
                  <span
                    v-show="tab === 'websites'"
                    class="tag is-info is-light is-rounded"
                  >
                    {{ websites.length }}
                  </span>
                </span>
              </a>
            </li>
            <li :class="{ 'is-active': tab === 'profiles' }">
              <a @click="tab = 'profiles'">
                <span class="icon is-small">
                  <i class="fas fa-user"></i>
                </span>
                <span>
                  <span>Profiles </span>
                  <span
                    v-show="tab === 'profiles'"
                    class="tag is-info is-light is-rounded"
                  >
                    {{ profiles.length }}
                  </span>
                </span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </section>
    <section class="section">
      <div v-show="tab === 'websites'" class="container">
        <div v-if="websites.length" class="columns is-multiline is-centered">
          <div
            v-for="(website, index) in websites"
            :key="index"
            class="column is-one-quarter"
          >
            <div
              class="card custom-bulma-card-equal-height animated bounceInUp"
            >
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
                    <span>Open Website </span>
                  </a>
                </div>
              </footer>
            </div>
          </div>
        </div>
      </div>
      <div v-show="tab === 'profiles'" class="container">
        <div v-if="profiles.length" class="columns is-multiline is-centered">
          <div
            v-for="(profile, index) in profiles"
            :key="index"
            class="column is-one-quarter"
          >
            <div
              class="card custom-bulma-card-equal-height animated bounceInUp"
            >
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
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import utils from "@/services/utils";
import websitesSvc from "@/services/websites";
import profilesSvc from "@/services/profiles";

export default {
  name: "home",
  created() {
    const self = this;
    websitesSvc
      .get()
      .websites()
      .then(websites => (self.websites = websites));
    profilesSvc
      .get()
      .profiles()
      .then(profiles => {
        self.profiles = profiles;
        self.profiles.reverse();
      });
  },
  data() {
    return {
      tab: "websites",
      websites: [],
      profiles: []
    };
  },
  methods: {
    img(filename) {
      return utils.img(filename, "default.jpg", "websites");
    }
  },
  mounted() {
    if (localStorage.tab) {
      this.tab = localStorage.tab;
    }
  },
  watch: {
    tab(newValue) {
      localStorage.tab = newValue;
    }
  }
};
</script>
