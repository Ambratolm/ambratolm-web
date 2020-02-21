<template>
  <div id="the-nav">
    <nav class="navbar is-primary is-radiusless">
      <div class="container">
        <div class="navbar-brand">
          <a @click="animateLogo()" ref="logo" class="navbar-item">
            <img
              src="@/assets/images/logos/ambratolm-logo-light.png"
              alt="Ambratolm"
            />
          </a>
          <span
            @click="navbarIsActive = !navbarIsActive"
            :class="{ 'is-active': navbarIsActive }"
            class="navbar-burger burger"
            data-target="navbar"
          >
            <span></span>
            <span></span>
            <span></span>
          </span>
        </div>
        <div
          id="navbar"
          :class="{ 'is-active': navbarIsActive }"
          class="navbar-menu"
        >
          <div class="navbar-start">
            <router-link to="/home" class="navbar-item">
              <span class="icon">
                <i class="fas fa-home"></i>
              </span>
              <span>Home</span>
            </router-link>
            <router-link to="/creations" class="navbar-item">
              <span class="icon">
                <i class="fas fa-copyright"></i>
              </span>
              <span>Creations</span>
            </router-link>
            <!-- Temp:Work in progress -->
            <span class="navbar-item animated pulse infinite slower">
              <span class="has-text-warning">
                <span class="icon">
                  <i class="fas fa-cog fa-spin"></i>
                </span>
                <span class="has-text-weight-bold">Work in progress...</span>
              </span>
            </span>
            <!-- /Temp:Work in progress -->
          </div>
          <div class="navbar-end">
            <router-link to="/about" class="navbar-item">
              <span class="icon">
                <i class="fas fa-info-circle"></i>
              </span>
              <span>About</span>
            </router-link>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import animate from "@/services/animate";

export default {
  name: "MainNav",
  data() {
    return {
      navbarIsActive: false
    };
  },
  methods: {
    animateLogo() {
      const logo = this.$refs.logo;
      animate(logo, "bounce");
    }
  }
};
</script>
