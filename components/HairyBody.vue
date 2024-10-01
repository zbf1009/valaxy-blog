<script lang="ts" setup>

withDefaults(
  defineProps<{
    comment?: boolean
  }>(),
  {
    comment: true,
  },
)
</script>

<template>
  <div class="min-h-49vh relative z-5">
    <div class="mx-auto container flex z-1 relative">
      <div class="relative flex-1 pt-2 main min-w-0">
        <slot v-if="$slots.default" />
        <HairyComment v-if="comment" />
      </div>
      <div class="ml-4 w-60 lg:block hidden">
        <div class="sticky top-3.125rem z-1">
          <slot v-if="$slots.slide" name="slide" />
          <HairySidebar v-else />
        </div>
      </div>
    </div>
    <div class="HairyBodyBackground" />
  </div>
</template>

<style lang="scss">
.HairyBodyBackground {
  @apply absolute top-0 max-h-150vh top-5 bottom-0 w-full;
  opacity: 0;
}
.main {
  background: linear-gradient(to bottom,#fafafa 0,#fff 20%) no-repeat top;
  padding: 1.25rem;
  border-radius: 10px
}

.dark {
  .HairyBodyBackground {
    opacity: 0;
  }
  .main {
    background: transparent;
  }
}

.HairyBodyBackground-post {
  background: #f8f8f8;
  background-image:
    linear-gradient(90deg, rgba(200, 200, 200, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(200, 200, 200, 0.1) 1px, transparent 1px),
    linear-gradient(0deg, rgba(200, 200, 200, 0.1) 1px, transparent 1px),
    linear-gradient(0deg, rgba(200, 200, 200, 0.1) 1px, transparent 1px);
  background-size: 20px 20px;
  color: #333;
  line-height: 1.6;
  box-shadow: 0 0 20px 15px #fafafa inset;
}
.dark{
  .HairyBodyBackground-post{
    background: #333;
    color: #ccc;
    line-height: 1.6;
    background-image:
      linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
      linear-gradient(0deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
      linear-gradient(0deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
    background-size: 20px 20px;
    box-shadow: 0 0 20px 15px #1a1a1d inset;
  }
}
</style>
