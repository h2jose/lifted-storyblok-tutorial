<template>
	<div>{{ blok.title }}</div>
	<br>
	<ol>
		<li v-for="blog in blok.featured_blogs" :key="blog.uuid">
			<a :href="`/${blog.full_slug}`">
				<img :src="blog.content.image.filename" class="w-[200]" />
				{{ blog.name }}
			</a>
		</li>
	</ol>

</template>

<script setup>
	import {defineProps} from 'vue'

	const props = defineProps({
		blok: Object
	})

</script>