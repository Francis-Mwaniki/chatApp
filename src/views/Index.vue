<template>
  <div>
    <!-- Sigin -->
    <div class="flex flex-col items-center justify-center h-screen bg-gray-950">
      <!-- transition  -->
      <Transition name="bounce">
        <p
          v-if="errMsg"
          class="text-white bg-red-500 border border-red-800 rounded-lg px-2 py-2"
        >
          {{ errMsg }}
        </p>
      </Transition>
      <Transition name="bounce">
        <p
          v-if="successMsg"
          class="text-white bg-green-500 border border-green-800 rounded-lg px-2 py-2"
        >
          {{ successMsg }}
        </p>
      </Transition>
      <div class="w-full md:w-1/2">
        <div class="text-center">
          <h1 class="text-3xl font-semibold text-white my-2">Sign in to your account</h1>
          <div
            class="bg-gray-950 rounded-lg shadow-lg p-6 mx-auto shadow-orange-700 lg:w-1/2"
          >
            <form @submit.prevent="signIn">
              <div class="mb-4">
                <label class="block text-gray-700 font-bold mb-2" for="email">
                  Email
                </label>
                <input
                  class="w-full border border-orange-400 p-2 rounded-md"
                  id="email"
                  v-model="email"
                  type="email"
                  placeholder="Email address"
                  required
                />
              </div>
              <div class="mb-6">
                <label class="block text-gray-700 font-bold mb-2" for="password">
                  Password
                </label>
                <input
                  class="w-full border border-orange-400 p-2 rounded-md"
                  id="password"
                  v-model="password"
                  type="password"
                  placeholder="Password"
                  required
                />
              </div>
              <div class="flex justify-center mb-6">
                <button
                  class="bg-orange-700 hover:bg-orange-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Login
                </button>
              </div>
            </form>
            <div class="flex justify-center">
              <a href="#" class="mx-2">
                <Icon icon="uil:github" class="h-8 w-8 hover:text-orange-600" />
              </a>
              <a href="#" class="mx-2">
                <Icon icon="uil:discord" class="h-8 w-8 hover:text-orange-600" />
              </a>
            </div>
            <!-- or create new act -->
            <div v-if="!loading">
              <button
                class="text-white flex justify-start items-center"
                @click="$router.push('/Auth')"
              >
                <span class="hover:text-orange-600"> Register</span>
                <Icon icon="uil:arrow-right" class="h-8 w-8 hover:text-orange-600" />
              </button>
            </div>
            <Teleport to="body">
              <div
                v-if="loading"
                class="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-gray-900 bg-opacity-50"
              >
                <ButtonLoader />
              </div>
            </Teleport>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import firebaseConfig from "../utils/firebase";
import ButtonLoader from "../components/ButtonLoader.vue";
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
import { useRouter } from "vue-router";
const provider = new GoogleAuthProvider();
const providerTwitter = new TwitterAuthProvider();
const providerGithub = new GithubAuthProvider();
const auth = getAuth();
const router = useRouter();
const email = ref("");
const password = ref("");
const loading = ref(false);
const errMsg = ref(); // ERROR MESSAGE
const successMsg = ref(); // SUCCESS MESSAGE
const signIn = () => {
  // we also renamed this method
  loading.value = true;
  signInWithEmailAndPassword(auth, email.value, password.value) // THIS LINE CHANGED
    .then((data) => {
      successMsg.value = "Successfully logged in!";
      console.log("Successfully logged in!" + data);
      // redirect to the
      setTimeout(() => {
        router.push("/Dashboard");
      }, 2000);
    })
    .catch((error) => {
      loading.value = false;
      switch (error.code) {
        case "auth/invalid-email":
          errMsg.value = "Invalid email";
          break;
        case "auth/user-not-found":
          errMsg.value = "No account with that email was found";
          break;
        case "auth/wrong-password":
          errMsg.value = "Incorrect password";
          break;
        default:
          errMsg.value = "Email or password was incorrect";
          break;
      }
    });
};
</script>

<style scoped>
/*
  Enter and leave animations can use different
  durations and timing functions.
*/
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>
