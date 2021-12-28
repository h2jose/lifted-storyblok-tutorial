import { createApp } from 'vue'
import Root from './App.vue'
import './index.css'
// import LandingPage from './components/LandingPage.vue'
// import BlogPage from './components/BlogPage.vue'
// import BlogsSection from './components/BlogsSection.vue'
// import OtroBlogsSection from './components/OtroBlogsSection.vue'

const app = createApp(Root)
// app.component('landing-page', LandingPage)
// app.component('blog-page', BlogPage)
// app.component('blogs-section', BlogsSection)
// app.component('otro-blogs-sections', OtroBlogsSection)

const components = import.meta.globEager('./components/**/*.global.vue')
console.log(components)

Object.entries(components).forEach( ([path, definition]) => {
	console.log(path)
	const componentName = path.split('/').pop().replace(/\..+/,'')
	console.log(componentName)
	app.component(componentName, definition.default)
})


app.mount('#app')
