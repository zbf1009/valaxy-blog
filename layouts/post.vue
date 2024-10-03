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
  background: #eeeeee;
  background-image:
    linear-gradient(90deg, #e7e7e7 3%, transparent 0),
    linear-gradient(#e7e7e7 3%, transparent 0);
  background-size: 20px 20px;
  box-shadow: 0 0 1.25vw 0.94vw #fafafa inset;
}
.dark{
  .main{
    background: #202020;
    background-image:
      linear-gradient(90deg, #2f2f2f 3%, transparent 0),
      linear-gradient( #2f2f2f 3%, transparent 0);
    background-size: 20px 20px;
    box-shadow: 0 0 1.25vw 0.94vw #1a1a1d inset;
  }
}
</style>
