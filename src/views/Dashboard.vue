<template>
  <div class="flex flex-col justify-between bg-gray-950 min-h-screen">
    <div
      class="inset-x-0 bottom-1/2 top-1/2 mx-auto flex justify-center items-center bg-gray-950"
      v-if="messages.length === 0"
    >
      You have no Messages Yet!!
    </div>
    <div
      class="bg-gray-950 border border-orange-600 m-3 md:mx-auto md:w-3/4 p-3 my-32 shadow-orange-700 shadow-lg"
      v-if="messages.length !== 0"
    >
      <!-- here -->
      <div
        class="chat chat-start bg-gray-950"
        v-for="message in messages"
        :key="message.id"
      >
        <div class="chat-image avatar">
          <div class="w-10 rounded-full">
            <img
              v-if="loggedUser.photoURL"
              :src="`${
                loggedUser.photoURL
                  ? loggedUser.photoURL
                  : 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png'
              }`"
            />
            <h2
              v-else
              class="w-14 h-12 bg-orange-600 pr-3 rounded-full flex justify-center text-[#fff] items-center mx-auto"
            >
              {{
                loggedUser.email.charAt(0).toUpperCase() +
                loggedUser.email.charAt(1).toUpperCase()
              }}
            </h2>
          </div>
        </div>
        <div class="chat-header">
          {{ loggedUser.email?.split("@")[0] }}
          <time class="text-xs opacity-50">{{ formatDate(message.id) }}</time>
        </div>
        <div class="chat-bubble">{{ message.text }}</div>
        <div class="chat-footer opacity-50">Delivered</div>
        <div class="chat-footer opacity-50" v-if="leftMsg">
          {{ leftMsg }}
        </div>
      </div>
    </div>

    <div
      class="fixed inset-x-0 md:inset-x-4 bottom-4 mx-auto flex justify-between items-center my-3 mb-7 shadow-black shadow-lg flex-row bg-gray-950 pb-4"
    >
      <!-- v-on:keyup.enter="sendMessage" -->
      <!--  -->
      <textarea
        v-on:keyup.enter="sendMessage"
        class="mx-auto w-full md:w-3/4 px-4 py-2 rounded-lg border-2 border-orange-500 focus:outline-none focus:ring-orange-600 focus:border-orange-600"
        v-model="text"
        placeholder="Type your message here"
      ></textarea>
      <!-- send button -->
      <button
        class="border border-orange-500 rounded-full text-white hover:bg-orange-700 px-4 py-4 md:left-28"
        v-on:click="sendMessage"
      >
        <Icon icon="mdi:send" class="w-9 h-9" />
      </button>
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";
import moment from "moment";
import { ref, onMounted } from "vue";
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
import { Icon } from "@iconify/vue";
const provider = new GoogleAuthProvider();
const providerTwitter = new TwitterAuthProvider();
const providerGithub = new GithubAuthProvider();
const auth = getAuth();
export default {
  data() {
    return {
      joined: false,

      leftMsg: "",
      text: "",
      currentUser: "",
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
    $route() {
      location.reload();
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
    const loggedUser = ref("");
    const formatDate = (date) => {
      return moment(date).fromNow();
    };
    const authListener = auth.onAuthStateChanged((user) => {
      if (user) {
        isAuth.value = true;
      } else {
        isAuth.value = false;
        router.push("/");
      }
    });
    onBeforeUnmount(() => {
      // clear up listener
      authListener();
    });
    onMounted(() => {
      auth.onAuthStateChanged(function (user) {
        if (user) {
          loggedUser.value = user;
          isAuth.value = true;
        } else {
          isAuth.value = false;
          router.push("/");
        }
      });
    });
    return { isAuth, formatDate, loggedUser };
  },
  created() {
    this.currentUser = getAuth().currentUser ? auth.currentUser.email : "Anonymous";
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
      this.text = "" || null;
    },
    addMessage() {
      const message = {
        id: new Date().getTime(),
        text: this.text,
        user: this.currentUser,
      };
      this.messages = this.messages.concat(message);
      this.socketInstance.emit("message", message);

      this.text = "";
    },
  },
  components: { Icon },
};
</script>

<style scoped></style>
