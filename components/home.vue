<script lang="ts" setup>
import { useSiteConfig } from 'valaxy'
const config = useSiteConfig()
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
      :description="`how are you doing?`"
    />
    <HairyBody :comment="false">
      <HairyPosts updated pagination :cur-page="parseInt(String($route.params.page || 1))" />
    </HairyBody>
    <HairyFooter />
  </HairyContainer>
</template>
