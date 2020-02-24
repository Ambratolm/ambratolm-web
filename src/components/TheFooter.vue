<template>
  <div id="the-footer">
    <footer class="footer">
      <div class="columns is-multiline is-centered has-text-centered">
        <div class="column is-one-third">
          <p class="heading">Contact</p>
          <div class="buttons is-centered">
            <a
              v-for="(contactLink, index) in randomContactLinks"
              :key="index"
              :href="contactLink.url"
              :content="contactLink.title"
              v-tippy="{ arrow: true, placement: 'bottom' }"
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
              v-for="(profile, index) in randomProfiles"
              :key="index"
              :href="profile.url"
              :content="profile.title"
              v-tippy="{ arrow: true, placement: 'bottom' }"
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

export default {
  name: "TheFooter",
  props: {
    contactLinks: Array,
    profiles: Array
  },
  computed: {
    randomContactLinks() {
      return utils.shuffle(this.contactLinks);
    },
    randomProfiles() {
      return utils.shuffle(this.profiles).slice(0, this.contactLinks.length);
    }
  }
};
</script>
