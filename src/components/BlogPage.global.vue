<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold text-gray-600 uppercase">
      {{blok.title}}
    </h1>
    <div class="py-6" v-html="resolver.render(blok.description)" />

    <img :src="transformImage(blok.image.filename,'200x0/filters:quality(70):format(webp)')" alt="" />
  </div>

</template>

<script setup>
  import { defineProps } from 'vue'
	import RichTextResolver from 'storyblok-js-client/dist/rich-text-resolver.es'

	const props = defineProps({
		blok: Object
	})

	const resolver = new RichTextResolver()

  const transformImage = (image, param = '') => {
    return image.replace(
      'https://a.storyblok.com',
      `https://img2.storyblok.com/${param}`
    )
  }
</script>

