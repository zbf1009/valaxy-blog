<script lang="ts" setup>
import { useSiteConfig, useFrontmatter, useFullUrl, } from 'valaxy';
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const siteConfig = useSiteConfig()
const showQr = ref(false)
const sponsorBtnTitle = computed(() => {
  return siteConfig.value.sponsor?.title ?? ('我很可爱，请给我钱！')
})
const frontmatter = useFrontmatter()
const url = useFullUrl()
</script>

<template>
  <div class="yun-sponsor-container flex-center flex-col">
    <button
      class="sponsor-button yun-icon-btn"
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

  <ValaxyCopyright v-if="frontmatter.copyright || (frontmatter.copyright !== false && siteConfig.license.enabled)" :url="url" m="y-4" />

  <div class="mb-15">
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

.post-copyright {
    font-size: .9rem;
    padding: .5rem 1rem;
    border-left: 4px solid #ff5252;
    background-color: var(--va-c-bg-dark);
    list-style: none;
    word-break: break-all;
    position: relative;
    overflow: hidden
}

.post-copyright:after {
    pointer-events: none;
    position: absolute;
    color: #fff;
    background: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 496 512'%3E%3Cpath fill='gray' d='M245.8 214.9l-33.2 17.3c-9.4-19.6-25.2-20-27.4-20-22.2 0-33.3 14.6-33.3 43.9 0 23.5 9.2 43.8 33.3 43.8 14.4 0 24.6-7 30.5-21.3l30.6 15.5a73.2 73.2 0 01-65.1 39c-22.6 0-74-10.3-74-77 0-58.7 43-77 72.6-77 30.8-.1 52.7 11.9 66 35.8zm143 0l-32.7 17.3c-9.5-19.8-25.7-20-27.9-20-22.1 0-33.2 14.6-33.2 43.9 0 23.5 9.2 43.8 33.2 43.8 14.5 0 24.7-7 30.5-21.3l31 15.5c-2 3.8-21.3 39-65 39-22.7 0-74-9.9-74-77 0-58.7 43-77 72.6-77C354 179 376 191 389 214.8zM247.7 8C104.7 8 0 123 0 256c0 138.4 113.6 248 247.6 248C377.5 504 496 403 496 256 496 118 389.4 8 247.6 8zm.8 450.8c-112.5 0-203.7-93-203.7-202.8 0-105.5 85.5-203.3 203.8-203.3A201.7 201.7 0 01451.3 256c0 121.7-99.7 202.9-202.9 202.9z'/%3E%3C/svg%3E");
    content: " ";
    height: 10rem;
    width: 10rem;
    right: -2rem;
    top: -2rem;
    opacity: .1
}

</style>
