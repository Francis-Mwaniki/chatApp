import { createRouter, createWebHistory } from 'vue-router'
import Login from "../../pages/Login.vue"
import Chat from "../../pages/Chat.vue"

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/Login',
      component: Login,
    },
    {
        path: '/Chat',
        component: Chat,
    },

  
  ],
})