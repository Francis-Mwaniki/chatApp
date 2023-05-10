<script setup>
import { ref, onMounted } from "vue";
import { Icon } from "@iconify/vue";
import { watchEffect } from "vue";
import { useRouter, useRoute } from "vue-router";
import ButtonLoader from "./components/ButtonLoader.vue";
import End from "./components/End.vue";
import Loader from "./components/Loader.vue";
import Auth from "../src/views/Auth.vue";
import { getAuth } from "firebase/auth";
const isAuth = ref(false);
const router = useRouter();
const route = useRoute();
const auth = getAuth();
const down = "#down";
const loading = ref(false);

const signOut = () => {
  auth.signOut();
  router.push("/");
};
const reload = () => {
  location.reload();
};

onMounted(() => {
  auth.onAuthStateChanged(function (user) {
    if (user) {
      isAuth.value = true;
      router.push("/Dashboard");
    } else {
      isAuth.value = false;
      router.push("/");
    }
  });
});

const scrollToSection = (down) => {
  const targetSection = document.getElementById(`#${down}`);

  if (targetSection) {
    targetSection.scrollIntoView({ behavior: "smooth" });
  }
};
</script>

<template>
  <Teleport to="body">
    <div
      v-if="loading"
      class="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-gray-900 bg-opacity-50"
    >
      <ButtonLoader />
    </div>
  </Teleport>
  <div class="bg-gray-950">
    <div
      class="py-4 fixed top-0 inset-x-0 bg-gray-950 border-b border-orange-600 z-20 md:mb-1 mb-14"
    >
      <div class="text-white px-1">
        <div class="flex flex-row flex-wrap justify-start items-center mx-auto gap-x-7">
          <span class="flex flex-row justify-start items-center gap-x-2">
            <img src="../src/assets/logo.png" alt="logo" class="h-8 w-8" />
            <div class="text-2xl font-bold">Chat App</div>
          </span>
          <div class="">
            <button class="text-white px-1 py-1 underline" v-on:click="reload">
              Reload App
            </button>
          </div>
          <div class="flex flex-row justify-end items-center gap-x-2">
            <div v-if="isAuth" class="flex flex-row justify-end items-center gap-x-2">
              <div class="text-white sm:text-3xl text-sm">{{ auth.currentUser.email }}</div>
              <button class="text-white px-4 py-2 rounded-lg bg-orange-600 mx-2" @click="signOut">
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="!isAuth">
      <div class="flex flex-col justify-center items-center h-screen bg-gray-950">
        <div class="text-4xl font-bold md:flex-row flex-col flex gap-x-2">
          <span class="text-4xl text-orange-800 font-bold mb-4">Welcome! </span
          ><span> Chat App</span>
        </div>
        <div class="text-2xl font-bold">Chat with Friends</div>
        <div class="flex flex-row justify-center items-center gap-x-2">
          <!-- Welcome use scroll down to signin get a gist -->
          <div class="flex flex-col justify-center items-center">
            <p class="text-lg mb-4">
              Please scroll down to sign in <span class="text-3xl">&#x1F606;</span>
            </p>
            <a
              :href="down"
              @click.prevent="scrollToSection('down')"
              class="animate-bounce"
            >
              <Icon icon="uil:arrow-down" class="h-8 w-8 text-orange-600" />
            </a>
          </div>
        </div>
        <Loader />
      </div>

      <!-- scroll down icon -->
    </div>
    <div class="bg-gray-950">
      <router-view></router-view>
    </div>
    <End />
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
