<template>
	<component
		:is="component.component"
		v-for="component in blok.components"
		:blok="component"
	 />

	 <pre>{{blok}}</pre>
</template>

<script setup>
  import { defineProps } from 'vue'
	const props = defineProps({
		blok: Object
	})
</script>

