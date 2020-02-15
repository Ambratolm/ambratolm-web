<template>
  <div id="main-footer">
    <footer class="footer">
      <div class="columns is-multiline is-centered has-text-centered">
        <div class="column is-one-third">
          <p class="heading">Contact</p>
          <div class="buttons is-centered">
            <a
              v-for="(contactLink, index) in contactLinks"
              :key="index"
              :href="contactLink.url"
              :title="contactLink.title"
              target="_blank"
            >
              <span class="icon is-large has-text-dark">
                <i :class="contactLink.icon" class="fa-2x"></i>
              </span>
            </a>
          </div>
        </div>
        <div class="column is-one-third custom-center">
          <figure class="image is-64x64 animated pulse infinite">
            <img
              src="@/assets/images/logos/ambratolm-symbol-muted.png"
              alt="Ambratolm"
            />
          </figure>
        </div>
        <div class="column is-one-third">
          <p class="heading">Profiles</p>
          <div class="buttons is-centered">
            <a
              v-for="(profile, index) in profiles.slice(0, contactLinks.length)"
              :key="index"
              :href="profile.url"
              :title="profile.title"
              target="_blank"
            >
              <span class="icon is-large has-text-dark">
                <i :class="profile.icon" class="fa-2x"></i>
              </span>
            </a>
          </div>
        </div>
        <div class="column is-full">
          <hr />
          <p>
            <strong>Ambratolm Web</strong> by <strong>Ambratolm</strong><br />
            &copy; <a href="">Ambratolm</a> {{ new Date().getFullYear() }}
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import utils from "@/services/utils";
import contactSvc from "@/services/contact";
import profilesSvc from "@/services/profiles";

export default {
  name: "MainFooter",
  created() {
    const self = this;
    contactSvc
      .get()
      .contactLinks()
      .then(contactLinks => {
        self.contactLinks = contactLinks;
        utils.shuffle(self.contactLinks);
      });
    profilesSvc
      .get()
      .profiles()
      .then(profiles => {
        self.profiles = profiles;
        utils.shuffle(self.profiles);
      });
  },
  data() {
    return {
      contactLinks: [],
      profiles: []
    };
  },
  methods: {}
};
</script>
