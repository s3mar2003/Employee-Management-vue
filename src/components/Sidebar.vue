<template>
  <aside
  :class="[
  'fixed top-0 left-0 max-h-full w-64 bg-primary bg-opacity-100 lg:bg-opacity-100 shadow-md p-4 flex flex-col justify-between transition-all duration-500 z-60 overflow-hidden',
  props.sidebarOpen ? 'translate-x-0' : '-translate-x-full',
  'lg:translate-x-0 lg:static lg:z-auto'
]"
>
    <div class="flex justify-end mb-4 lg:hidden">
      <button @click="$emit('close')" class="text-black dark:text-white hover:scale-110 transition-transform">
        <span class="material-symbols-rounded text-2xl">close</span>
      </button>
    </div>

   <nav class="space-y-2">
  <router-link
    v-for="(link, index) in navLinks"
    :key="index"
    :to="link.to"
    @click="$emit('close')"
    class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray/40 dark:hover:bg-gray-800 text-text group transition-all duration-300"
    :style="`transition-delay: ${index * 50 + 100}ms`"
  >
    <span class="material-symbols-rounded transition-all duration-500 group-hover:text-blue-600">
      {{ link.icon }}
    </span >
    <span
      class="opacity-100 transition-opacity duration-500"
      :style="`transition-delay: ${index * 50 + 150}ms`"
    >
      {{ link.text }}
    </span>
  </router-link>
</nav>


    <!-- <div class="mt-auto pt-4 border-t border-gray-300 dark:border-gray-700">
      <router-link
        to="/settings"
        @click="$emit('close')"
        class="flex items-center gap-2 px-3 py-2 text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 transition-colors duration-300 group"
      >
        <span class="material-symbols-rounded text-base transition-transform group-hover:rotate-45">settings</span>
        <span class="opacity-0 lg:opacity-100 transition-opacity duration-500 delay-100">Settings</span>
      </router-link>
    </div> -->
  </aside>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  sidebarOpen: Boolean
});

const navLinks = ref([
  { to: '/', icon: 'dashboard', text: 'Dashboard' },
  { to: '/employees', icon: 'group', text: 'Employees' },
  { to: '/leaves', icon: 'event_busy', text: 'Leaves' },
  { to: '/salary', icon: 'attach_money', text: 'Salary' },
  { to: '/employee', icon: 'person_add', text: 'Add Employee' }
]);
</script>

<style>
.aside-enter-active,
.aside-leave-active {
  transition: all 0.5s ease;
}

.aside-enter-from,
.aside-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-3px); }
  75% { transform: translateX(3px); }
}

.group:hover .material-symbols-rounded {
  animation: shake 0.5s ease-in-out;
}
</style>