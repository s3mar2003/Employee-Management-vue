<template>
  <router-link
    :to="to"
    class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-700 transition"
    active-class="bg-gradient-to-r from-blue-500 to-purple-500 text-white"
  >
    <span class="material-symbols-rounded text-xl">{{ icon }}</span>
    <span class="text-base">{{ text }}</span>
  </router-link>
</template>

<script setup>
defineProps({
  to: String,
  icon: String,
  text: String
})
</script>
