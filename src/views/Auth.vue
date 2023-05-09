<template>
  <div>
    <!-- Sigin -->
    <div class="flex flex-col items-center justify-center h-screen bg-gray-950">
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
          <h1 class="text-3xl font-semibold text-white my-2">Sign up to your account</h1>
          <div
            class="bg-gray-950 rounded-lg shadow-lg p-6 mx-auto shadow-orange-700 lg:w-1/2"
          >
            <form @submit.prevent="register">
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
                  Sign Up
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
            <button
              class="text-white flex justify-start items-center"
              @click="$router.push('/')"
            >
              <Icon icon="uil:arrow-left" class="h-8 w-8 hover:text-orange-600" />
              <span class="hover:text-orange-600"> Login</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from "@iconify/vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import firebaseConfig from "../utils/firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  TwitterAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
const provider = new GoogleAuthProvider();
const providerTwitter = new TwitterAuthProvider();
const providerGithub = new GithubAuthProvider();
const auth = getAuth();
export default {
  components: {
    Icon,
  },
  setup() {
    const email = ref("");
    const password = ref("");
    const router = useRouter();
    const isLoggedIn = ref(true);
    const errMsg = ref("");
    const successMsg = ref("");
    // runs after firebase is initialized
    auth.onAuthStateChanged(function (user) {
      if (user) {
        isLoggedIn.value = true; // if we have a user
        router.push("/ZChat");
      } else {
        isLoggedIn.value = false; // if we do not
        router.push("/Auth");
      }
    });
    const signOut = () => {
      auth.signOut();
    };
    /* handleSignInGoogle() {
      signInWithPopup(auth, provider)
        .then((result) => {
          let user = result.user;
          console.log(user);
          this.goo = true;
          this.authUser = true;
          this.message = user.displayName + " " + user.email + " " + " is verified ";

          // ...
          this.isSignedIn = true;
        })
        .catch((error) => {
          console.log(error);
        });
    }, */
    const register = async () => {
      try {
        const user = await createUserWithEmailAndPassword(
          auth,
          email.value,
          password.value
        );
        if (user) {
          successMsg.value = "User created successfully";
          setTimeout(() => {
            successMsg.value = "";
          }, 2000);
          router.push("/ZChat");
        }
      } catch (error) {
        switch (error.code) {
          case "auth/invalid-email":
            errMsg.value = "Invalid email";
            break;
          case "auth/user-not-found":
            errMsg.value = "No account with that email was found";
            break;
          case "auth/email-already-in-use":
            errMsg.value = "Email is already in use";
            break;
          default:
            errMsg.value = "Email or password was incorrect";
            break;
        }
      }
    };
    return { email, password, register, errMsg, successMsg };
  },
};
</script>

<style scoped>
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
