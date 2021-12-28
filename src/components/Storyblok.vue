<template>

	<pre v-if="data">{{ data.component}}</pre>

	<component :is="data.component" v-if="data" />



  <!-- <nav class="py-6 mx-6 border-b">
    <p class="font-bold pb-2">All Blogs:</p>
    <ol>
      <li class="list-disc list-inside" v-for='blog in blogs' :key='blog.uuid'>
        <a :href="blog.real_path" class="text-blue-500 hover:underline">{{ blog.name }}</a>
        <span> (published {{ formatDate(blog.published_at)}})</span>
      </li>
    </ol>
  </nav>
  <div class="p-6" v-if="data">
    <h1 class="text-3xl font-bold text-gray-600 uppercase">
      {{data.title}}
    </h1>
    <div class="py-6" v-html="resolver.render(data.description)" />

    <img :src="transformImage(data.image.filename,'200x0/filters:quality(70):format(webp)')" alt="" />
  </div> -->

</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import StoryBlokClient from 'storyblok-js-client'
  import RichTextResolver from 'storyblok-js-client/dist/rich-text-resolver.es'
  import { formatDistance } from 'date-fns'

  const resolver = new RichTextResolver()

  const StoryBlok = new StoryBlokClient({
    accessToken: import.meta.env.VITE_STORYBLOK_TOKEN
  })

  const formatDate = (date) => {
    return formatDistance(new Date(date), new Date(), {addSuffix:true} )
  }

  const transformImage = (image, param = '') => {
    return image.replace(
      'https://a.storyblok.com',
      `https://img2.storyblok.com/${param}`
    )
  }

  const data = ref(null)
  const blogs = ref({})

  onMounted( async () => {

    const storyblokBridgeInstance = new StoryblokBridge()
    storyblokBridgeInstance.on('input', (payload) => {
      data.value = payload.story.content
    })

    blogs.value = await StoryBlok.get(`cdn/stories`, {
      version: import.meta.env.VITE_STORYBLOK_VERSION,
      starts_with: 'blog/',
      sort_by: 'published_at:asc'
    }).then( ({data}) => data.stories )

    data.value = await StoryBlok.get(`cdn/stories/${location.pathname}`, {
      version: import.meta.env.VITE_STORYBLOK_VERSION
    }).then( ({data}) => data.story.content )

    // data.value = await fetch('https://api.storyblok.com/v2/cdn/stories/landing-page?version=draft&token=ANbaSA3FE4JL6Q4RkY5qPgtt')
    // .then( (response) => response.json() )
    // .then( ({story}) => story.content )


  })


</script>

