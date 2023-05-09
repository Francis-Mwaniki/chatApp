import { createRouter, createWebHistory } from 'vue-router'
import Index from "./views/Index.vue"
import  Auth from "./views/Auth.vue"
import ZChat from "./views/ZChat.vue"

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Index,
    },
    {
        path: '/Auth',
        component: Auth,
    },
    
    {
        path: '/ZChat',
        component: ZChat,
    },

  
  ],
})