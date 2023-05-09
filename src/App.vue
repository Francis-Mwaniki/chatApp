<script setup>
import { ref } from 'vue';
import Auth from './components/Auth.vue';
import End from './components/End.vue';
const isAuth = ref(true);

</script>

<template>
 <div class="">
  <div class=" py-4 fixed top-0 inset-x-0 bg-gray-950 border-b border-orange-600 z-20">
  <div class=" text-white  px-1">
 <div class=" flex flex-row justify-start items-center mx-auto gap-x-7">
  <RouterLink to="/" class="flex flex-row justify-start items-center gap-x-2">
  <img src="../src/assets/logo.png" alt="logo" class=" h-8 w-8"/>
  <div class="text-2xl font-bold">Chat App</div>
  </RouterLink>
  <div class="">Chat with Friends</div>
 </div>
  </div>
  </div>
  <div v-show="isAuth">
    <Auth/>
     
  </div>
  <End/>
 </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
