

<template>
    <div>
    <!-- Sigin -->
    <div class="flex flex-col items-center justify-center h-screen bg-gray-900">
    <div class=" w-full md:w-1/2">
    <div class="text-center">
    <h1 class="text-3xl font-semibold  text-white my-2">Sign in to your account</h1>
    <div class="bg-gray-950 rounded-lg shadow-lg p-6 mx-auto shadow-orange-700  lg:w-1/2">
  <form>
    <div class="mb-4">
      <label class="block text-gray-700 font-bold mb-2" for="email">
        Email
      </label>
      <input class="w-full border border-orange-400 p-2 rounded-md" id="email" type="email" placeholder="Email address" required>
    </div>
    <div class="mb-6">
      <label class="block text-gray-700 font-bold mb-2" for="password">
        Password
      </label>
      <input class="w-full border border-orange-400 p-2 rounded-md" id="password" type="password" placeholder="Password" required>
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

<script>
import { Icon } from '@iconify/vue';
export default {
components: {
    Icon
}
}

</script>

<style lang="scss" scoped>

</style>