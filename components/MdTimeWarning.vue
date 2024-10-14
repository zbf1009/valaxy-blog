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
 * when the post is updated more than 30 days ago, show a warning
 * default 30 days, you can set `time_warning` in frontmatter to change it
 */
const time_warning = computed(() => {
  const thirtyDaysInMilliseconds = 30 * 24 * 60 * 60 * 1000;
  const diff = differenceInMilliseconds(new Date(), published.value)

  if (typeof fm.value.time_warning === 'boolean' && fm.value.time_warning) {
    // 布尔值且为 true，使用默认的30天
    return diff >= thirtyDaysInMilliseconds;
  } else if (typeof fm.value.time_warning === 'number') {
    // 数字类型，如果大于30天则使用该数字，否则使用默认的30天
    const customDays = fm.value.time_warning;
    const thresholdInMilliseconds = Math.max(thirtyDaysInMilliseconds, customDays * 24 * 60 * 60 * 1000);
    return diff >= thresholdInMilliseconds;
  }
  // 其他所有情况，警告关闭
  return false;
})
</script>

<template>
  <blockquote v-if="time_warning" style="opacity: 0.8;">
    {{ t('post.time_warning', { ago }) }}
  </blockquote>
</template>
