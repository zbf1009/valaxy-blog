<script lang="ts" setup>
import { useSiteConfig } from 'valaxy';
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute()
const siteConfig = useSiteConfig()
const showQr = ref(false)
const sponsorBtnTitle = computed(() => {
  return siteConfig.value.sponsor?.title ?? ('我很可爱，请给我钱！')
})
</script>

<template>
  <div class="yun-sponsor-container flex-center flex-col">
    <button
      class="sponsor-button yun-icon-btn bg-light-1 dark:bg-transparent"
      :title="sponsorBtnTitle" text="red-400" @click="showQr = !showQr"
    >
      <div i-ri-heart-line  />
    </button>

    <div class="qrcode-container qrcode flex-center flex-col" m="y-4" :class="showQr && 'show'">
      <div v-if="siteConfig.sponsor.description" class="sponsor-description" mb="4" text="sm">
        {{ siteConfig.sponsor.description }}
      </div>
      <div class="flex justify-around">
        <a
          v-for="method, i in siteConfig.sponsor.methods" :key="i"
          class="flex-center flex-col animate-iteration-1 animate-fade-in"
          :href="method.url" target="_blank"
          :style="`color:${method.color}`"
        >
          <img class="sponsor-method-img" border="~ rounded" p="1" loading="lazy" :src="method.url" :title="method.name">
          <div text="xl" m="2" :class="method.icon" />
        </a>
      </div>
    </div>
  </div>

  <div class="mb-15">
    <div class="border-t border-gray-200 dark:border-gray-600" />
    <div class="flex items-center justify-end mt-2">
      <div class="i-ri-eye-fill mr-2" />
      阅读次数 <span class="waline-pageview-count mx-2" :data-path="route.path" /> 次
    </div>
  </div>
</template>

<style lang="scss">

.sponsor-button {

  div {
    transform: scale(1.5);
    transition: transform var(--va-transition-duration) ease-in-out;
  }

  &:hover {
    div {
      transform: scale(1.7);
    }
  }

  a {
    &:hover {
      border: none;
    }
  }
}

.qrcode-container {
  overflow: hidden;
  height: 0;
  transition: height var(--va-transition-duration) ease-in-out;

  &.show {
    height: 260px;
  }
}

.sponsor-description {
  color: get-css-var('c-gray');
}

.sponsor-method-img {
  width: 12rem;
  max-width: 90%;
  aspect-ratio: 1;
}
</style>
