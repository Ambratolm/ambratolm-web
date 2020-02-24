<template>
  <div id="app" class="animated fadeIn">
    <TheNavBar />
    <router-view />
    <TheFooter :contact-links="contactLinks" :profiles="profiles" />
  </div>
</template>

<script>
import TheNavBar from "@/components/TheNavBar";
import TheFooter from "@/components/TheFooter";
import { mapGetters } from "vuex";

export default {
  name: "app",
  components: {
    TheNavBar,
    TheFooter
  },
  created() {
    this.$store.dispatch("getWebsites");
    this.$store.dispatch("getProfiles");
    this.$store.dispatch("getContactLinks");
    this.$store.dispatch("getCategories");
    this.$store.dispatch("getCreations");
  },
  computed: {
    ...mapGetters(["contactLinks", "profiles"])
  }
};
</script>

<style lang="scss">
@import "main";
</style>
