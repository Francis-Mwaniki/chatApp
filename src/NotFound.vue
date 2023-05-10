<template>
  <div class="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          404 - Page Not Found
        </h2>
      </div>
      <div class="mt-8">
        <p class="text-center text-base text-gray-500">
          The page you are looking for does not exist. Please check the URL and try again.
        </p>
      </div>
      <div class="mt-8 flex justify-center">
        <a href="/" class="btn btn-primary"> Go to Homepage </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style>
.btn {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
  background-color: #2563eb;
  border-radius: 0.375rem;
  text-decoration: none;
  transition: background-color 0.3s ease-in-out;
}

.btn:hover {
  background-color: #1d4ed8;
}
</style>
