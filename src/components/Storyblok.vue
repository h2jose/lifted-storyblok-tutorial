<template>
	<component :is="data.component" v-if="data" :blok="data"/>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import StoryBlokClient from 'storyblok-js-client'

  const StoryBlok = new StoryBlokClient({
    accessToken: import.meta.env.VITE_STORYBLOK_TOKEN
  })

  const data = ref(null)

  onMounted( async () => {

    const storyblokBridgeInstance = new StoryblokBridge({
      resolve_relations:'featured-blogs-section.featured_blogs'
    })
    storyblokBridgeInstance.on('input', (payload) => {
      data.value = payload.story.content
    })

    data.value = await StoryBlok.get(`cdn/stories/${location.pathname}`, {
      version: import.meta.env.VITE_STORYBLOK_VERSION,
      resolve_relations:'featured-blogs-section.featured_blogs'
    }).then( ({data}) => data.story.content )

  })


</script>

