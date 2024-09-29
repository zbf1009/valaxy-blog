<script lang="ts" setup>
import type { PageData, Post } from 'valaxy'
import { useSiteConfig, useFrontmatter } from 'valaxy'
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { zhCN } from "date-fns/locale"
import { differenceInMilliseconds, formatDistanceToNow } from 'date-fns'

const fm = useFrontmatter()
const { t, locale } = useI18n({
  legacy: false,
  locale: 'zh-CN'
})
const updated = computed(() => fm.value.updated || fm.value.date || new Date())
const ago = ref('')

watch(locale, () => {
  const fromNow = formatDistanceToNow(updated.value, { addSuffix: true,locale:zhCN })
  ago.value = /^\d/.test(fromNow) ? ` ${fromNow}` : fromNow
}, { immediate: true })

/**
 * when the post is updated more than 180 days ago, show a warning
 * default 180 days, you can set `time_warning` in frontmatter to change it
 */
const time_warning = computed(() => {
  const diff = differenceInMilliseconds(new Date(), updated.value)
  /**
   * if `time_warning` is a number, compare the time difference
   * if `time_warning` is a boolean, show warning by flag
   */
  if (typeof fm.value.time_warning === 'number')
    return diff > fm.value.time_warning
  else
    return fm.value.time_warning
})
defineProps<{
  frontmatter: Post
  data?: PageData
}>()
const siteConfig = useSiteConfig()
</script>

<template>
  <main>
    <div w="full" flex="~">
      <slot name="main">
        <div class="content" flex="~ col grow" w="full" p="l-4 lt-md:0">
          <slot name="main-header" />
          <slot name="main-header-after" />

          <slot name="main-content">
            <div class="markdown-body prose max-w-none pb-8">
              <ValaxyMd :frontmatter="frontmatter">
                <blockquote v-if="time_warning" class="yun-time-warning">
                  {{ t('post.time_warning', { ago }) }}
                </blockquote>
                <slot name="main-content-md" />
                <slot />
              </ValaxyMd>
            </div>
            <slot name="main-content-after" />
          </slot>
        </div>

        <slot name="main-nav-before" />

        <slot name="main-nav" />

        <slot name="main-nav-after" />

        <slot v-if="siteConfig.comment.enable && frontmatter.comment !== false" name="comment" />

        <slot name="footer" />
      </slot>
    </div>

    <slot name="aside" />
  </main>
</template>
