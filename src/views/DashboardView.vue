<template>
  <div class="space-y-8 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
    <!-- Banner -->
    <div class="flex items-center justify-between rounded-2xl p-6 bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-gray-800 dark:to-gray-900 shadow-lg hover:shadow-xl transition-all duration-300 group">
      <div class="animate-slide-in-left">
        <h2 class="text-xl font-semibold text-white/90">Welcome Back,</h2>
        <p class="text-3xl font-bold text-white mt-1">Edem Mcwilliams</p>
        <p class="text-white/80 mt-2">You have 3 new notifications</p>
      </div>
      <div class="relative">
        <img 
          src="/src/assets/image/welecome.jfif" 
          alt="Welcome" 
          class="w-32 h-32 rounded-full object-cover border-4 border-white/30 shadow-lg animate-bounce-slow group-hover:scale-105 transition-transform"
        />
      </div>
    </div>

    <!-- Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      <DashboardCard 
        title="Total Employees" 
        :value="employees.length" 
        icon="group" 
        iconColor="text-blue-500"
        bgColor="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30"
      />
      <DashboardCard 
        title="On Leave" 
        :value="leaves.length" 
        icon="event_busy" 
        iconColor="text-amber-500"
        bgColor="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-800/30"
      />
      <DashboardCard 
        title="Departments" 
        :value="departmentsCount" 
        icon="apartment" 
        iconColor="text-emerald-500"
        bgColor="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/30 dark:to-emerald-800/30"
      />
      <DashboardCard 
        title="Pending Requests" 
        :value="pendingRequests" 
        icon="notifications_active" 
        iconColor="text-rose-500"
        bgColor="bg-gradient-to-br from-rose-50 to-rose-100 dark:from-rose-900/30 dark:to-rose-800/30"
      />
    </div>

    <!-- Chart -->
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
      <MonthlyHiringChart />
    </div>

    <!-- Activity Table -->
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div class="p-6">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Latest Employee Activity</h3>
          <button class="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors">
            View All
          </button>
        </div>

        <!-- Cards for Mobile -->
        <div class="block sm:hidden space-y-4">
          <div
            v-for="(item, i) in activities"
            :key="i"
            class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
          >
            <div class="flex items-start space-x-3">
              <div :class="getActivityIcon(item).bg" class="p-2 rounded-full">
                <span class="material-icons text-white text-sm">{{ getActivityIcon(item).icon }}</span>
              </div>
              <div>
                <p
                  class="font-semibold text-gray-900 dark:text-white"
                  :class="{ 'line-through text-rose-500': item.type === 'deleted' }"
                >
                  {{ item.name }}
                </p>
                <p class="text-sm text-gray-600 dark:text-gray-300">
                  {{ getActionText(item) }}
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">{{ formatDate(item.date) }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Table for larger screens -->
        <div class="hidden sm:block overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead class="bg-white text-black">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Employee</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Activity</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Date</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-900">
              <tr
                v-for="(item, i) in activities"
                :key="i"
                class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
              >
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div :class="getActivityIcon(item).bg" class="flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center">
                      <span class="material-icons text-white text-sm">{{ getActivityIcon(item).icon }}</span>
                    </div>
                    <div class="ml-4">
                      <p
                        class="text-sm font-medium text-black"
                        :class="{ 'line-through text-rose-500': item.type === 'deleted' }"
                      >
                        {{ item.name }}
                      </p>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-black">
                  {{ getActionText(item) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-black">
                  {{ formatDate(item.date) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="getStatusClass(item.type)" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                    {{ getStatusText(item.type) }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import DashboardCard from '@/components/DashboardCard.vue'
import MonthlyHiringChart from '@/components/MonthlyHiringChart.vue'

const employees = ref([])
const leaves = ref([])
const activities = ref([])
const storageWatcher = ref(null)

const departmentsCount = computed(() => {
  const unique = new Set(employees.value.map(e => e.department))
  return unique.size
})

const pendingRequests = computed(() => {
  return leaves.value.filter(leave => leave.status === 'pending').length
})

function loadEmployees() {
  const stored = localStorage.getItem('employees')
  employees.value = stored ? JSON.parse(stored) : []
}

function loadLeaves() {
  const stored = localStorage.getItem('leaves')
  leaves.value = stored ? JSON.parse(stored) : []
}

function loadActivities() {
  const storedActs = localStorage.getItem('activities')
  const allActivities = storedActs ? JSON.parse(storedActs) : []
  const sortedActivities = [...allActivities].sort((a, b) => 
    new Date(b.timestamp || b.date) - new Date(a.timestamp || a.date)
  )
  activities.value = sortedActivities.slice(0, 5)
}

function getActionText(item) {
  switch(item.type) {
    case 'added': return 'Added new employee'
    case 'updated': return 'Updated employee data'
    case 'deleted': return 'Deleted employee'
    default: return 'Performed an action'
  }
}

function getActivityIcon(item) {
  switch(item.type) {
    case 'added': return { icon: 'person_add', bg: 'bg-emerald-500' }
    case 'updated': return { icon: 'edit', bg: 'bg-blue-500' }
    case 'deleted': return { icon: 'person_remove', bg: 'bg-rose-500' }
    default: return { icon: 'info', bg: 'bg-gray-500' }
  }
}

function getStatusText(type) {
  switch(type) {
    case 'added': return 'Completed'
    case 'updated': return 'Updated'
    case 'deleted': return 'Archived'
    default: return 'Pending'
  }
}

function getStatusClass(type) {
  switch(type) {
    case 'added': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300'
    case 'updated': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
    case 'deleted': return 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300'
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
  }
}

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

function setupStorageWatcher() {
  storageWatcher.value = setInterval(() => {
    loadEmployees()
    loadLeaves()
    loadActivities()
  }, 1000) 
}

onMounted(() => {
  loadEmployees()
  loadLeaves()
  loadActivities()
  setupStorageWatcher()
  
  window.addEventListener('storage', () => {
    loadEmployees()
    loadLeaves()
    loadActivities()
  })
})

onBeforeUnmount(() => {
  if (storageWatcher.value) {
    clearInterval(storageWatcher.value)
  }
  window.removeEventListener('storage', () => {})
})
</script>

<style>
.animate-slide-in-left {
  animation: slideInLeft 0.5s ease-out forwards;
}

.animate-bounce-slow {
  animation: bounceSlow 3s infinite;
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes bounceSlow {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
</style>
