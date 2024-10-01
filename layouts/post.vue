<script lang="ts" setup>
import { ElTag, dayjs } from 'element-plus'
import { useFrontmatter, useRuntimeConfig } from 'valaxy'
import { useRouter } from 'vue-router'
import { computed } from 'vue'

defineProps<{
  header?: {
    title?: string
    headline?: string
    description?: string
  }
}>()

const runtimeConfig = useRuntimeConfig()
const addonWaline = computed(() => runtimeConfig.value.addons['valaxy-addon-waline'])
const router = useRouter()
const post = useFrontmatter()

function displayTag(tag: string) {
  router.push(`/tags/${tag}`)
}
</script>

<template>
  <HairyContainer>
    <HairyNavbar />
    <HairyHeader :title="post.title">
      <template #description>
        <div class="flex gap-2">
          <span>发表于 {{ dayjs(post.date).format('YYYY-MM-DD') }}</span>
          <span>本文字数 {{ post.wordCount }} 字</span>
          <span>阅读时长 {{ post.readingTime }} 分钟</span>
        </div>
        <div v-if="post.tags?.length" class="tags flex-center gap-2 mt-2">
          <ElTag v-for="(tag) in post.tags" :key="tag" class="dark:bg-dark-50 cursor-pointer" @click="displayTag(tag)">
            {{ tag ? $t(tag, {}, { missingWarn: false }) : '' }}
          </ElTag>
        </div>
      </template>
    </HairyHeader>
    <HairyBody>
      <template #default>
        <div class="main">
          <HairyImageGlobal>
            <router-view />
          </HairyImageGlobal>
          <HairyPostFooter v-if="addonWaline.options?.pageview" />
        </div>
      </template>
      <template #slide>
        <HairyTabbar />
      </template>
    </HairyBody>
    <HairyFooter />
  </HairyContainer>
</template>

<style lang="scss" scoped>

.main {
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
  .main{
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
