

<template>
    <div>
    <!-- Sigin -->
    <div class="flex flex-col items-center justify-center h-screen bg-gray-900">
    <div class=" w-full md:w-1/2">
    <div class="text-center">
    <h1 class="text-3xl font-semibold  text-white my-2">Sign in to your account</h1>
    <div class="bg-gray-950 rounded-lg shadow-lg p-6 mx-auto shadow-orange-700  lg:w-1/2">
        <p v-if="errMsg">{{ errMsg }}</p>
  <form @submit.prevent="signIn">

    <div class="mb-4">
      <label class="block text-gray-700 font-bold mb-2" for="email">
        Email
      </label>
      <input class="w-full border border-orange-400 p-2 rounded-md" id="email" v-model="email" type="email" placeholder="Email address" required>
    </div>
    <div class="mb-6">
      <label class="block text-gray-700 font-bold mb-2" for="password">
        Password
      </label>
      <input class="w-full border border-orange-400 p-2 rounded-md" id="password" v-model="password" type="password" placeholder="Password" required>
    </div>
    <div class="flex justify-center mb-6">
      <button class="bg-orange-700 hover:bg-orange-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
        Sign Up
      </button>
    </div>
  </form>
  <div class="flex justify-center">
    <a href="#" class="mx-2">
        <Icon icon="uil:github" class=" h-8 w-8 hover:text-orange-600" />
    </a>
    <a href="#" class="mx-2">
        <Icon icon="uil:discord"  class="h-8 w-8 hover:text-orange-600"/>
    </a>
  </div>
</div>

    </div>
    </div>
    </div>


    </div>
</template>
<script setup>
  import { ref } from 'vue'
  import firebaseConfig from "../src/utils/firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signOut,
  TwitterAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
const provider = new GoogleAuthProvider();
const providerTwitter = new TwitterAuthProvider();
const providerGithub = new GithubAuthProvider();
const auth = getAuth();
  const email = ref('')
  const password = ref('')
  const errMsg = ref() // ERROR MESSAGE
  const signIn = () => { // we also renamed this method
      signInWithEmailAndPassword(email.value, password.value) // THIS LINE CHANGED
      .then((data) => {
        console.log('Successfully logged in!' + data);
       // redirect to the feed
      })
      .catch(error => {
        switch (error.code) {
          case 'auth/invalid-email':
              errMsg.value = 'Invalid email'
              break
          case 'auth/user-not-found':
              errMsg.value = 'No account with that email was found'
              break
          case 'auth/wrong-password':
              errMsg.value = 'Incorrect password'
              break
          default:
              errMsg.value = 'Email or password was incorrect'
              break
        }
      });
  }
</script>

<style scoped>

</style>