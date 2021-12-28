<template>
  <nav class="py-6 mx-6 border-b">
    <p class="font- bold pb-2">{{ blok.title }}</p>
    <ol>
      <li class="list-disc list-inside" v-for='blog in blogs' :key='blog.uuid'>
        <a :href="blog.real_path" class="text-blue-500 hover:underline">{{ blog.name }}</a>
        <span> (published {{ formatDate(blog.published_at)}})</span>
      </li>
    </ol>
  </nav>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import StoryBlokClient from 'storyblok-js-client'
  import { formatDistance } from 'date-fns'

	const props = defineProps({
		blok: Object
	})


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
  })


</script>