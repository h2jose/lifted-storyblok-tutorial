<template>
  <nav class="py-6 mx-6 border-b">
    <p class="font-bold pb-2">All Blogs:</p>
    <!-- <pre>{{ blogs }}</pre> -->
    <ol>
      <li class="list-disc list-inside" v-for='blog in blogs' :key='blog.uuid'>
        <a :href="blog.real_path" class="text-blue-500 hover:underline">{{ blog.name }}</a>
      </li>
    </ol>
  </nav>
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

  const StoryBlok = new StoryBlokClient({
    accessToken: import.meta.env.VITE_STORYBLOK_TOKEN
  })
  const data = ref(null)
  const blogs = ref({})

  onMounted( async () => {

    blogs.value = await StoryBlok.get(`cdn/links`, {
      version: import.meta.env.VITE_STORYBLOK_VERSION,
      starts_with: 'blog/',
    }).then( ({data}) => data.links )

    data.value = await StoryBlok.get(`cdn/stories/${location.pathname}`, {
      version: import.meta.env.VITE_STORYBLOK_VERSION
    }).then( ({data}) => data.story.content )

    // data.value = await fetch('https://api.storyblok.com/v2/cdn/stories/landing-page?version=draft&token=ANbaSA3FE4JL6Q4RkY5qPgtt')
    // .then( (response) => response.json() )
    // .then( ({story}) => story.content )


  })


</script>

