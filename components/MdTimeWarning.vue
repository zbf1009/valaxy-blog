<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { useFrontmatter } from 'valaxy'
import { useI18n } from 'vue-i18n'
import { zhCN } from 'date-fns/locale';
import { differenceInMilliseconds, formatDistanceToNow, format } from 'date-fns'

const fm = useFrontmatter()
const { t, locale } = useI18n({
  legacy: false,
  locale: 'zh-CN',
  messages: {
    'zh-CN': {
      'post.time_warning': '文章发布于 {ago}，部分内容可能已过时或需要更新，参考时请注意。'
    }
  }
});

const published = computed(() => fm.value.date || new Date())
const ago = ref('')

watch(locale, () => {
  const fromNow = formatDistanceToNow(published.value, { addSuffix: true, locale: zhCN })
  ago.value = /^\d/.test(fromNow) ? ` ${fromNow}` : fromNow
}, { immediate: true })

/**
 * when the post is updated more than 180 days ago, show a warning
 * default 180 days, you can set `time_warning` in frontmatter to change it
 */
const time_warning = computed(() => {
  const thirtyDaysInMilliseconds = 30 * 24 * 60 * 60 * 1000;
  const diff = differenceInMilliseconds(new Date(), published.value)
  /**
   * if `time_warning` is a number, compare the time difference
   * if `time_warning` is a boolean, show warning by flag
   */
  if (typeof fm.value.time_warning === 'boolean') {
    // 如果是布尔值，检查是否发布超过30天
    return diff >= thirtyDaysInMilliseconds;
  } else if (typeof fm.value.time_warning === 'number') {
    // 如果是数字，与30天比较
    return diff > thirtyDaysInMilliseconds;
  }
  return false; // 默认不显示警告
})
</script>

<template>
  <blockquote v-if="time_warning" style="opacity: 0.8;">
    {{ t('post.time_warning', { ago }) }}
  </blockquote>
</template>
