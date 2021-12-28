import { createApp } from 'vue'
import Root from './App.vue'
import './index.css'
import LandingPage from './components/LandingPage.vue'
import BlogPage from './components/BlogPage.vue'

const app = createApp(Root)
app.component('landing-page', LandingPage)
app.component('blog-page', BlogPage)

app.mount('#app')
