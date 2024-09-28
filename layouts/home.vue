<script lang="ts" setup>
import { useSiteConfig } from 'valaxy';
import { useAddonHitokoto } from 'valaxy-addon-hitokoto';
const config = useSiteConfig()
const { hitokoto } = useAddonHitokoto()
</script>

<template>
  <HairyContainer>
    <HairyNavbar>
      <template #nav>
        <slot name="header-nav" />
      </template>
    </HairyNavbar>
    <HairyHeader
      :headline="config.title"
      :title="config.subtitle"
      :description="`${hitokoto.hitokoto}——${hitokoto.from}`"
    />
    <HairyBody :comment="false">
      <HairyPosts updated pagination :cur-page="parseInt(String($route.params.page || 1))" />
    </HairyBody>
    <HairyFooter />
  </HairyContainer>
</template>
