import { createApp } from 'vue'
import './assets/index.css'
import router from './router'
import NotFound from './NotFound.vue'
router.resolve({
    path: '/404',
    component: NotFound
  })
import App from './App.vue'
const app = createApp(App)
app.use(router)

router.beforeEach((to, from, next) => {
  if (to.matched.length === 0) {
    next('/404')
  } else {
    next()
  }
})


app.mount('#app')
