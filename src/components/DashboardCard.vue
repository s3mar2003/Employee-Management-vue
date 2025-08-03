<template>
  <div class="bg-primary shadow rounded-xl p-4 flex items-center space-x-4">
    <div
      class="text-4xl p-3 rounded-full"
      :class="[iconColor, bgColor]"
    >
      <span class="material-icons">{{ icon }}</span>
    </div>
    <div>
      <h4 class="text-xl font-bold text-text">{{ value }}</h4>
      <p class="text-sm text-text">{{ title }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  value: [String, Number],
  icon: String,
  iconColor: String,
  bgColor: String
})
</script>