<template>
  <div class="flex min-h-screen overflow-x-hidden">
    <Sidebar :sidebarOpen="sidebarOpen" @close="sidebarOpen = false" />

    <div class="flex-1 flex flex-col min-w-0">
      <Header @toggleSidebar="sidebarOpen = !sidebarOpen" />
      <main class="p-4">
        <router-view />
        <ActionButtons 
         @edit="openEdit(index)" 
         @delete="confirmDeleteSalary(index)" 
/>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Sidebar from './components/Sidebar.vue';
import Header from './components/Header.vue';

const sidebarOpen = ref(false);
</script>
