<template>
  <div v-if="!joined" class="flex items-center justify-center min-h-screen">
    <div class="w-64">
      <input
        type="text"
        class="w-full h-10 px-2 text-lg font-semibold mb-2 rounded border-orange-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        v-model="currentUser"
        placeholder="Enter your name"
      />
      <button
        class="w-full h-10 bg-orange-600 text-white rounded hover:bg-orange-700"
        v-on:click="join"
      >
        Join
      </button>
    </div>
  </div>
  <div v-if="joined" class="flex flex-col justify-between">
    <div
      class="bg-gray-950 border border-orange-600 m-3 p-3 my-32 shadow-orange-700 shadow-lg"
      v-show="messages.length !== 0"
      v-if="isAuth"
    >
      <!-- here -->
      <div class="chat chat-start" v-for="message in messages" :key="message.id">
        <div class="chat-image avatar">
          <div class="w-10 rounded-full">
            <img
              src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600"
            />
          </div>
        </div>
        <div class="chat-header">
          {{ message.user }}
          <time class="text-xs opacity-50">12:45</time>
        </div>
        <div class="chat-bubble">{{ message.text }}</div>
        <div class="chat-footer opacity-50">Delivered</div>
        <div class="chat-footer opacity-50" v-if="leftMsg">
          {{ leftMsg }}
        </div>
      </div>
    </div>
    <div
      class="fixed inset-x-0 bottom-6 mx-auto flex justify-center items-center my-3 mb-7 shadow-black shadow-lg"
    >
      <!-- v-on:keyup.enter="sendMessage" -->
      <!--  -->
      <textarea
        v-on:keyup.enter="sendMessage"
        class="mx-auto w-full md:w-3/4 px-4 py-2 rounded-lg border-2 border-orange-500 focus:outline-none focus:ring-orange-600 focus:border-orange-600"
        v-model="text"
        placeholder="Type your message here"
      ></textarea>
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";
import { onBeforeUnmount } from "vue";
import firebaseConfig from "../utils/firebase";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  TwitterAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import router from "../router";
const provider = new GoogleAuthProvider();
const providerTwitter = new TwitterAuthProvider();
const providerGithub = new GithubAuthProvider();
const auth = getAuth();
export default {
  data() {
    return {
      joined: false,
      currentUser: "",
      leftMsg: "",
      text: "",
      messages: [],
    };
  },
  /*watch if user left function */
  watch: {
    joined() {
      if (!this.joined) {
        this.messages = [];
      }
    },
    /* listen for socket disconnect if user left */
    socketInstance() {
      this.socketInstance.on("disconnect", () => {
        "user:left",
          (data) => {
            this.leftMsg = data;
          };
      });
    },
  },
  setup() {
    const isAuth = ref(false);
    const authListener = auth.onAuthStateChanged(function (user) {
      if (!user) {
        // not logged in
        alert("you must be logged in to view this. redirecting to the home page");
      }
    });
    onBeforeUnmount(() => {
      // clear up listener
      authListener();
    });
    onMounted(() => {
      auth.onAuthStateChanged(function (user) {
        if (user) {
          isAuth.value = true;
        } else {
          isAuth.value = false;
          router.push("/");
        }
      });
    });
    return { isAuth };
  },
  methods: {
    join() {
      this.joined = true;
      this.socketInstance = io("http://localhost:3000");

      this.socketInstance.on("message:received", (data) => {
        this.messages = this.messages.concat(data);
      });
    },

    sendMessage() {
      this.addMessage();

      this.text = "";
    },
    addMessage() {
      const message = {
        id: new Date().getTime(),
        text: this.text,
        user: this.currentUser,
      };

      this.messages = this.messages.concat(message);
      this.socketInstance.emit("message", message);
    },
  },
};
</script>

<style scoped></style>
