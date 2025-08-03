<template>
  <header class="bg-primary sticky top-0 z-10 shadow-sm px-4 py-2 flex items-center justify-between flex-wrap sm:flex-nowrap backdrop-blur-md bg-opacity-90 transition-all duration-300">
    
    <div class="flex items-center gap-2">
      <button
        @click="$emit('toggleSidebar')"
        class="sm:hidden text-text focus:outline-none hover:bg-white/20 p-1 rounded-full transition-all"
        aria-label="Toggle Sidebar"
      >
     <span class="material-symbols-rounded text-3xl hover:scale-110 transition-transform">menu</span>
   </button>

   <div class="flex items-center gap-2 hover:scale-105 transition-transform cursor-pointer">
     <span class="material-symbols-rounded text-text text-3xl hidden sm:inline hover:text-blue-500 transition-colors">supervisor_account</span>
     <h1 class="text-lg sm:text-xl font-bold text-text hover:text-blue-500 transition-colors">Employee Hub</h1>
   </div>
 </div>

 <div class="hidden lg:flex items-center gap-4 flex-1 justify-center">
    </div>

    <div class="flex items-center gap-4 mt-2 sm:mt-0">
      <div class="relative cursor-pointer hidden sm:block group">
        <span class="material-symbols-rounded text-2xl text-text group-hover:text-blue-500 transition-colors p-1.5 rounded-full group-hover:bg-white/20">notifications</span>
        <span class="absolute -top-0.5 -right-0.5 bg-red-500 rounded-full w-3 h-3 animate-pulse"></span>
      </div>

      <button 
        @click="toggleTheme" 
        class="text-text p-1.5 rounded-full hover:bg-white/20 transition-colors group"
        aria-label="Toggle Theme"
      >
        <i 
          :class="isDark ? 'fas fa-sun' : 'fas fa-moon'" 
          class="text-xl group-hover:rotate-45 transition-transform"
        ></i>
      </button>

      <div class="relative group">
        <img
          src="/src/assets/image/Profil Color.jfif"
          @click="toggleDropdown"
          class="w-9 h-9 rounded-full border-2 border-white/30 hover:border-blue-500 cursor-pointer transition-all hover:scale-110"
          alt="User Profile"
        />
        <span class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white/80"></span>
        
        <transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="transform opacity-0 scale-95"
          enter-to-class="transform opacity-100 scale-100"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="transform opacity-100 scale-100"
          leave-to-class="transform opacity-0 scale-95"
        >
          <div
            v-if="dropdownOpen"
            class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md z-50 overflow-hidden border border-gray-200 dark:border-gray-700"
            @click.stop
          >
            <ul class="py-1 text-sm text-gray-700 dark:text-gray-200">
              <li>
                <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-2">
            <span class="material-symbols-rounded text-base">account_circle</span>
            <span>Profile</span>
          </a>
        </li>
        <li>
          <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-2">
            <span class="material-symbols-rounded text-base">settings</span>
            <span>Settings</span>
          </a>
        </li>
        <li class="border-t border-gray-200 dark:border-gray-700">
          <a href="#" class="block px-4 py-2 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors flex items-center gap-2">
            <span class="material-symbols-rounded text-base">logout</span>
            <span>Logout</span>
          </a>
        </li>
      </ul>
    </div>
  </transition>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const isDark = ref(false);
const dropdownOpen = ref(false);

onMounted(() => {
  const theme = localStorage.getItem('theme');
  isDark.value = theme === 'dark';
  document.documentElement.classList.toggle('dark', isDark.value);

  window.addEventListener('click', (e) => {
    if (!e.target.closest('.group') && !e.target.closest('ul')) {
      dropdownOpen.value = false;
    }
  });
});

function toggleTheme() {
  isDark.value = !isDark.value;
  document.documentElement.classList.toggle('dark', isDark.value);
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light');
}

function toggleDropdown(e) {
  e.stopPropagation();
  dropdownOpen.value = !dropdownOpen.value;
}
</script>