<script setup>
import { ref, onMounted } from "vue";
import { Icon } from "@iconify/vue";
import { useRouter } from "vue-router";
import End from "./components/End.vue";
import Auth from "../src/views/Auth.vue";
import { getAuth } from "firebase/auth";
const isAuth = ref(false);
const router = useRouter();
const auth = getAuth();

const signOut = () => {
  auth.signOut();
};
onMounted(() => {
  auth.onAuthStateChanged(function (user) {
    if (user) {
      isAuth.value = true;
      router.push("/ZChat");
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
  <div class="">
    <div class="py-4 fixed top-0 inset-x-0 bg-gray-950 border-b border-orange-600 z-20">
      <div class="text-white px-1">
        <div class="flex flex-row justify-start items-center mx-auto gap-x-7">
          <RouterLink to="/" class="flex flex-row justify-start items-center gap-x-2">
            <img src="../src/assets/logo.png" alt="logo" class="h-8 w-8" />
            <div class="text-2xl font-bold">Chat App</div>
          </RouterLink>
          <div class="">Chat with Friends</div>
        </div>
      </div>
      <div class="flex flex-row justify-end items-center gap-x-2">
        <div v-if="isAuth" class="flex flex-row justify-end items-center gap-x-2">
          <div class="text-white">{{ auth.currentUser.displayName }}</div>
          <div class="text-white">{{ auth.currentUser.email }}</div>
          <button class="text-white btn bg-orange-600" @click="signOut">Sign Out</button>
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
          </div>
        </div>
        <div class="flex flex-col justify-center items-center">
          <div class="flex flex-col justify-center items-center">
            <a
              :href="down"
              @click.prevent="scrollToSection('down')"
              class="animate-bounce"
            >
              <Icon icon="uil:arrow-down" class="h-8 w-8 text-orange-600" />
            </a>
          </div>

          <div class="inline-flex justify-center items-center flex-row gap-x-3">
            <div
              class="flex flex-row justify-center items-center mx-auto gap-x-2 h-3 w-3 rounded-full bg-orange-600 text-orange-600"
            ></div>
            <div
              class="flex flex-row justify-center items-center mx-auto gap-x-2 h-3 w-3 rounded-full bg-orange-600 text-orange-600"
            ></div>
            <div
              class="flex flex-row justify-center items-center mx-auto gap-x-2 h-3 w-3 rounded-full bg-orange-600 text-orange-600"
            ></div>
            <div
              class="flex flex-row justify-center items-center mx-auto gap-x-2 h-3 w-3 rounded-full bg-orange-600 text-orange-600"
            ></div>
            <div
              class="flex flex-row justify-center items-center mx-auto gap-x-2 h-3 w-3 rounded-full bg-orange-600 text-orange-600"
            ></div>
          </div>
        </div>
      </div>

      <!-- scroll down icon -->
    </div>
    <div>
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
