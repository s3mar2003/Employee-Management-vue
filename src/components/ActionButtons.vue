<template>
  <div class="flex items-center gap-2">
    <button
      @click.stop="$emit('edit')"
      class="text-blue-600 hover:text-blue-800 transition duration-200 flex items-center gap-1"
      title="Edit"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24"
        stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M11 5H6a2 2 0 00-2 2v11.5A1.5 1.5 0 005.5 20H17a2 2 0 002-2v-5M16.5 3.5a2.121 2.121 0 013 3L12 14l-4 1 1-4 7.5-7.5z" />
      </svg>
      <span class="hidden sm:inline">Edit</span>
    </button>

    <button
      @click.stop="$emit('delete')"
      class="text-red-600 hover:text-red-800 transition duration-200 flex items-center gap-1"
      title="Delete"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24"
        stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M6 18L18 6M6 6l12 12" />
      </svg>
      <span class="hidden sm:inline">Delete</span>
    </button>
  </div>
</template>
