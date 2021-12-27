<template>
  <div class="p-6" v-if="data">
    <!-- <pre>{{ data }}</pre> -->
    <h1 class="text-3xl font-bold text-gray-600 uppercase">
      {{data.title}}
    </h1>
    <div class="py-6" v-html="resolver.render(data.description)" />

    <img :src="data.image.filename" alt="" />
  </div>

</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import StoryBlokClient from 'storyblok-js-client'
  import RichTextResolver from 'storyblok-js-client/dist/rich-text-resolver.es'

  const resolver = new RichTextResolver()

  const StoryBlok = new StoryBlokClient( {accessToken: 'ANbaSA3FE4JL6Q4RkY5qPgtt'})
  const data = ref(null)

  onMounted( async () => {

    data.value = await StoryBlok.get('cdn/stories/landing-page', {
      version: 'draft'
    }).then( ({data}) => data.story.content )

    // data.value = await fetch('https://api.storyblok.com/v2/cdn/stories/landing-page?version=draft&token=ANbaSA3FE4JL6Q4RkY5qPgtt')
    // .then( (response) => response.json() )
    // .then( ({story}) => story.content )


  })


</script>

