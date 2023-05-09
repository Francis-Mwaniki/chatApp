<template>
<div>
    <div class="  bg-gray-950 border border-orange-600 m-3 p-3 mb-32 shadow-orange-700 shadow-lg">
        <div class="chat chat-start">
  <div class="chat-image avatar">
    <div class="w-10 rounded-full">
      <img src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600" />
    </div>
  </div>
  <div class="chat-header">
    Obi-Wan Kenobi
    <time class="text-xs opacity-50">12:45</time>
  </div>
  <div class="chat-bubble">You were the Chosen One!</div>
  <div class="chat-footer opacity-50">
    Delivered
  </div>
</div>
<div class="chat chat-end">
  <div class="chat-image avatar">
    <div class="w-10 rounded-full">
      <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600" />
    </div>
  </div>
  <div class="chat-header">
    Anakin
    <time class="text-xs opacity-50">12:46</time>
  </div>
  <div class="chat-bubble">I hate you!</div>
  <div class="chat-footer opacity-50">
    Seen at 12:46
  </div>
</div>
    </div>
    <div class=" fixed  inset-x-0 bottom-6 mx-auto flex justify-center items-center my-3 mb-7 shadow-black shadow-lg">
  <textarea class=" mx-auto w-full md:w-3/4  px-4 py-2 rounded-lg border-2 border-orange-500  focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent" placeholder="Type your message here"></textarea>

</div>
</div>
</template>

<script setup>

</script>

<style scoped>

</style>