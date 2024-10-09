<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { useFrontmatter } from 'valaxy'
import { useI18n } from 'vue-i18n'
import { zhCN } from 'date-fns/locale';
import { differenceInMilliseconds, formatDistanceToNow } from 'date-fns'

const fm = useFrontmatter()
const { t, locale } = useI18n({
  legacy: false,
  locale: 'zh-CN',
  messages: {
    'zh-CN': {
      'post.time_warning': '文章最后编辑于 {ago}，部分内容可能已过时或需要更新，参考时请注意。'
    }
  }
});

const updated = computed(() => fm.value.updated || fm.value.date || new Date())
const ago = ref('')

watch(locale, () => {
  const fromNow = formatDistanceToNow(updated.value, { addSuffix: true, locale: zhCN })
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
</script>

<template>
  <blockquote v-if="time_warning" op="80">
    {{ t('post.time_warning', { ago }) }}
  </blockquote>
</template>
