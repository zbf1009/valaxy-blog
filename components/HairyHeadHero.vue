<script lang="ts" setup>
import { useFrontmatter } from 'valaxy'
import { computed } from 'vue'

const props = defineProps<{
  headline?: string
  title: string
  description?: string
}>()

const post = useFrontmatter()

const headline = computed(() => props.headline || post.value.headline)
const title = computed(() => props.title || post.value.title)
</script>

<template>
  <div class="flex-center flex-col text-shadow-lg text-white mx-12px text-center">
    <div v-if="headline" class="font-frederick text-size-3.35em lt-sm:text-size-3rem leading-snug">
      {{ headline }}
    </div>
    <div class="text-size-2.5em lt-sm:text-size-2rem title tracking-1 font-custom">
      {{ title }}
    </div>
    <p v-if="description || $slots.description" class="text-size-sm">
      <template v-if="description">
        {{ description }}
      </template>
      <slot v-else name="description" />
    </p>
  </div>
</template>

<style lang="scss" scoped>
.font-custom {
  font-family: "Source Han Serif SC";
  font-weight: 700;
}
</style>
