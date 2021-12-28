<template>
  <nav class="py-6 mx-6 border-b">
    <p class="font- bold pb-2">{{ blok.subtitle }}</p>
  </nav>
</template>

<script setup>
  import { ref, onMounted } from 'vue'

	const props = defineProps({
		blok: Object
	})




</script>