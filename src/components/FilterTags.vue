<template>
  <div class="tags is-centered">
    <transition
      enter-active-class="animated bounceInRight"
      leave-active-class="animated bounceOutLeft custom-absolute"
    >
      <div
        v-if="currentCategory !== 'all' && currentCategoryObj"
        class="tag is-medium"
        :class="{
          'is-success':
            currentCreations.length &&
            (currentTag || currentQuery),
          'is-primary':
            currentCreationsRelative(currentCategory).length &&
            !(currentTag || currentQuery)
        }"
      >
        <div class="icon">
          <i :class="currentCategoryObj.icon"></i>
        </div>
        <span class="is-capitalized">
          {{ currentCategoryObj.title }}
        </span>
        <button
          v-if="currentCategory !== 'all'"
          @click="$emit('set-category', 'all')"
          class="delete"
        ></button>
      </div>
    </transition>
    <transition
      enter-active-class="animated bounceInRight"
      leave-active-class="animated bounceOutLeft custom-absolute"
    >
      <div
        v-if="currentQuery"
        class="tag is-medium"
        :class="{
          'is-success': currentCreationsRelative(currentCategory)
            .length
        }"
      >
        <div class="icon">
          <i class="fas fa-search"></i>
        </div>
        <span class="is-capitalized">
          {{ currentQuery }}
        </span>
        <button
          @click="$emit('set-query', '');"
          class="delete"
        ></button>
      </div>
    </transition>
    <transition
      enter-active-class="animated bounceInLeft"
      leave-active-class="animated bounceOutRight custom-absolute"
    >
      <div
        v-if="currentTag"
        class="tag is-medium"
        :class="{
          'is-success': currentCreationsRelative(currentCategory)
            .length
        }"
      >
        <div class="icon">
          <i class="fas fa-tag"></i>
        </div>
        <span class="is-capitalized">{{ currentTag }}</span>
        <button @click="$emit('set-tag', '')" class="delete"></button>
      </div>
    </transition>
  </div>
</template>

<script>
// import utils from "@/services/utils";

export default {
  name: "FilterTags",
  props: {
    currentCreations: Array,
    currentCategory: String,
    currentTag: String,
    currentQuery: String,
    currentCategoryObj: Object,
    currentCreationsRelative: Function
  },
  methods: {

  }
};
</script>