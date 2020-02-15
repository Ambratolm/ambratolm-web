<template>
  <div id="app" class="animated fadeIn">
    <TheNavBar />
    <router-view />
    <TheFooter />
  </div>
</template>

<script>
import TheNavBar from "@/components/TheNavBar";
import TheFooter from "@/components/TheFooter";

export default {
  name: "app",
  components: {
    TheNavBar,
    TheFooter
  }
};
</script>

<style lang="scss">
@import "main";
</style>
