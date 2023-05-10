<template>
  <div
    class="mx-auto flex justify-center items-center bg-gray-950 flex-col inset-0 fixed"
    v-if="!joined"
  >
    <!-- join button -->
    <button
      class="border border-orange-500 rounded-full text-white hover:bg-orange-700 px-4 py-4"
      v-on:click="join"
    >
      Join Chat
    </button>
    <h3>You have not Joined DeChat!!</h3>
  </div>
  <div class="flex flex-col justify-between bg-gray-950 min-h-screen">
    <div
      class="bg-gray-950 border border-orange-600 m-3 md:mx-auto md:w-3/4 p-3 my-32 shadow-orange-700 shadow-lg"
      v-if="joined"
    >
      <!-- here -->

      <Transition name="bounce">
        <p
          v-if="successMsg"
          class="text-white bg-green-500 border border-green-800 rounded-lg px-2 py-2 max-w-md mx-auto flex-row justify-center items-center"
        >
          <p class="text-center">{{ successMsg }}</p>
        </p>
      </Transition>
      <div class="inset-0 fixed flex justify-center items-center mx-auto" v-if="loading">
        <ButtonLoader />
      </div>
      <div
        v-if="messages.length === 0"
        class="mx-auto flex justify-center items-center bg-gray-950 flex-col"
      >
        You have no Messages Yet!!
      </div>
      <div v-else>
        <div
          class="chat bg-gray-950 border-b border-gray-400 pb-2"
          :class="message.user == loggedUser.email ? 'chat-start' : 'chat-end'"
          v-for="message in messages"
          :key="message.id"
        >
          <div class="">
            <div class="chat-image avatar">
              <div class="w-10 rounded-full">
                <img
                  v-if="message"
                  :src="`${
                    message.img
                      ? message.img
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
          </div>
          <div class="chat-header">
            <div class="flex justify-center items-center mx-auto gap-x-1 flex-row">
              {{ message.user?.split("@")[0] }}
              <div>-</div>
              <time class="text-xs opamessage-50">{{
                formatDate(new Date(message.date))
              }}</time>
            </div>
          </div>
          <div class="chat-bubble">{{ message.text }}</div>
          <div class="chat-footer opamessage-50">
            <div
              class="flex justify-center items-center mx-auto gap-x-4"
              :class="message.user == loggedUser.email ? 'flex-row' : 'flex-row-reverse'"
            >
              <div class="flex flex-row justify-center items-center mx-auto">
                <span class="text-sm">Delivered</span>
                <Icon icon="mdi:check-all" class="w-4 h-4 text-green-500" />
              </div>
              <button
                class="flex flex-row justify-center items-center mx-auto"
                @click="deleteMessage(message.id)"
                v-if="message.user == loggedUser.email"
              >
                <span class="text-sm">Delete</span>
                <Icon icon="mdi:delete" class="w-4 h-4 text-red-500" />
              </button>
            </div>
          </div>

          <div class="chat-footer opamessage-50" v-if="leftMsg">
            {{ leftMsg }}
          </div>
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
        :disabled="!joined"
        v-model="text"
        placeholder="Type your message here"
      ></textarea>
      <!-- send button -->
      <button
        class="border border-orange-500 rounded-full text-white hover:bg-orange-700 px-4 py-4 md:left-28"
        :class="joined === true ? 'bg-orange-500' : 'bg-gray-500 cursor-not-allowed'"
        :disabled="!joined"
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
import messagesColRef from "../utils/firebase";
import { addDoc, getDocs, doc, deleteDoc } from "firebase/firestore";
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
import ButtonLoader from "../components/ButtonLoader.vue";
const provider = new GoogleAuthProvider();
const providerTwitter = new TwitterAuthProvider();
const providerGithub = new GithubAuthProvider();
const auth = getAuth();

export default {
  data() {
    return {
      joined: false,
      leftMsg: "",
      loading: false,
      text: "",
      successMsg: "",
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
  },
  setup() {
    const isAuth = ref(false);
    const loggedUser = ref("");
    const formatDate = (date) => {
      const now = new Date();
      const diff = (now.getTime() - date.getTime()) / 1000;
      if (diff < 60) {
        return "just now";
      } else if (diff < 120) {
        return "a minute ago";
      } else if (diff < 3600) {
        return Math.floor(diff / 60) + " minutes ago";
      } else if (diff < 7200) {
        return "an hour ago";
      } else {
        return Math.floor(diff / 3600) + " hours ago";
      }
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
  async created() {
    this.currentUser = getAuth().currentUser ? auth.currentUser.email : "Anonymous";
    const fetchMessages = async () => {
      let fetchedMessages = await getDocs(messagesColRef);
      let messages = [];
      fetchedMessages.forEach((message) => {
        let singlemessageData = message.data();
        singlemessageData.id = message.id;
        messages.push(singlemessageData);
        this.messages = messages;
      });
      console.log(messages);
    };
    await fetchMessages();
  },
  methods: {
    async deleteMessage(messageId) {
      this.loading = true;
      let messageRef = doc(messagesColRef, messageId);
      await deleteDoc(messageRef);
      this.successMsg = "message has been deleted!";
      setTimeout(() => {
        this.successMsg = "";
        this.loading = false;
        window.location.reload();
        setTimeout(() => {
        this.joined = true;
      }, 100);
      }, 3000);
     
      
    },
    join() {
      this.joined = true;
      this.loading = true;
      this.socketInstance = io("http://localhost:3000");
      this.socketInstance.on("message:received", (data) => {
        this.messages = this.messages.concat(data);
      });
      setTimeout(() => {
        this.loading = false;
      }, 3000);
    },
    sendMessage() {
      this.addMessage();
      this.text = "" || null;
    },
    async addMessage() {
      const message = {
        date: new Date().getTime(),
        text: this.text,
        user: this.loggedUser.email,
        img:
          this.loggedUser?.photoURL ||
          "https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-64.png",
      };
      this.messages = this.messages.concat(message);
      this.socketInstance.emit("message", message);

      const addedDocs = await addDoc(messagesColRef, message);
      console.log("addedDocs", addedDocs);

      this.text = "";
    },
  },
  components: { Icon, ButtonLoader },
};
</script>

<style scoped></style>
