<template>
  <div class="p-6" v-if="data">
    <h1 class="text-3xl font-bold text-gray-600 uppercase">
      {{data.title}}
    </h1>
    <p class="py-6">
      {{ data.description  }}
    </p>
    <img :src="data.image.filename" alt="" />
  </div>

</template>

<script setup>
  import { ref, onMounted } from 'vue'

  const data = ref(null)

  onMounted( async () => {
    data.value = await fetch('https://api.storyblok.com/v2/cdn/stories/landing-page?version=draft&token=ANbaSA3FE4JL6Q4RkY5qPgtt')
    .then( (response) => response.json() )
    .then( ({story}) => story.content )
  })


</script>

