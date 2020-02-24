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
            <li
              v-for="tab in tabs"
              :key="tab"
              :class="{ 'is-active': tab === currentTab }"
            >
              <a @click="currentTab = tab">
                <span class="icon is-small">
                  <i v-if="tab === 'websites'" class="fas fa-globe"></i>
                  <i v-if="tab === 'profiles'" class="fas fa-user"></i>
                </span>
                <span>
                  <span class="is-capitalized">{{ tab }}</span>
                  <span
                    v-show="tab === currentTab"
                    class="tag is-primary is-rounded"
                    style="margin-left: 5px;"
                  >
                    <span v-if="tab === 'websites'">
                      {{ websites.length }}
                    </span>
                    <span v-if="tab === 'profiles'">
                      {{ profiles.length }}
                    </span>
                  </span>
                </span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </section>
    <section class="section">
      <div v-show="currentTab === 'websites'" class="container">
        <div v-if="websites.length" class="columns is-multiline is-centered">
          <WebsiteCard
            v-for="(website, index) in websites"
            :key="index"
            class="column is-one-quarter"
            :website="website"
          />
        </div>
      </div>
      <div v-show="currentTab === 'profiles'" class="container">
        <div v-if="profiles.length" class="columns is-multiline is-centered">
          <ProfileCard
            v-for="(profile, index) in randomProfiles"
            :key="index"
            :profile="profile"
            class="column is-one-quarter"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// import utils from "@/services/utils";
import WebsiteCard from "@/components/WebsiteCard";
import ProfileCard from "@/components/ProfileCard";
import utils from "@/services/utils";
import { mapGetters } from "vuex";

export default {
  name: "home",
  components: {
    WebsiteCard,
    ProfileCard
  },
  data() {
    return {
      currentTab: "websites",
      tabs: ["websites", "profiles"]
    };
  },
  computed: {
    ...mapGetters(["websites", "profiles"]),
    randomProfiles() {
      return utils.shuffle(this.profiles);
    }
  },
  mounted() {
    if (localStorage.currentTab) {
      this.currentTab = localStorage.currentTab;
    }
  },
  watch: {
    currentTab(newValue) {
      localStorage.currentTab = newValue;
    }
  }
};
</script>
