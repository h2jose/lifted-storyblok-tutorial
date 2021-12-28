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
Object.entries(components).forEach( ([path, definition]) => {
	const componentName = path.split('/').pop().replace(/\..+/,'')
	app.component(componentName, definition.default)
})

app.directive('editable', {
  beforeMount(el, binding) {
    if (typeof binding.value._editable === 'undefined') {
      return
    }
    const options = JSON.parse(
      binding.value._editable.replace('<!--#storyblok#', '').replace('-->', '')
    )
    el.setAttribute('data-blok-c', JSON.stringify(options))
    el.setAttribute('data-blok-uid', `${options.id}-${options.uid}`)
    const className = 'storyblok__outline'
    if (el.classList) {
      el.classList.add(className)
    } else if (!new RegExp(`\\b${className}\\b`).test(el.className)) {
      el.className += ` ${className}`
    }
  },
})


app.mount('#app')
