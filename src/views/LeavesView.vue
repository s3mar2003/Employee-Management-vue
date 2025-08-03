<template>
  <div class="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
    <!-- Header Section -->
    <div class="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
      <div>
        <h2 class="text-2xl sm:text-3xl font-bold text-text">Leave Management</h2>
        <p class="text-text mt-1">Manage employee leave requests</p>
      </div>
      <button 
        @click="openLeaveModal"
        class="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg transition-all shadow-md hover:shadow-lg"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
        </svg>
        New Leave Request
      </button>
    </div>

    <!-- Search and Filter Section -->
    <div class="bg-primary p-4 rounded-xl shadow-md mb-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Search by Employee Name -->
        <div>
          <label class="block text-sm font-semibold text-text mb-1">Search Employee</label>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search by name..."
            class="w-full px-4 py-2 rounded-xl bg-white text-text border border-gray-300 focus:ring-4 focus:ring-blue-400/30 shadow-md transition-all duration-300"
          />
        </div>

        <!-- Filter by Leave Type -->
        <div>
          <label class="block text-sm font-semibold text-text mb-1">Filter by Type</label>
          <select
            v-model="leaveTypeFilter"
            class="w-full px-4 py-2 rounded-xl bg-white text-text border border-gray-300 focus:ring-4 focus:ring-blue-400/30 shadow-md transition-all duration-300"
          >
            <option value="">All Types</option>
            <option value="annual">Annual</option>
            <option value="sick">Sick</option>
            <option value="emergency">Emergency</option>
            <option value="unpaid">Unpaid</option>
          </select>
        </div>

        <!-- Filter by Status -->
        <div>
          <label class="block text-sm font-semibold text-text mb-1">Filter by Status</label>
          <select
            v-model="statusFilter"
            class="w-full px-4 py-2 rounded-xl bg-white text-text border border-gray-300 focus:ring-4 focus:ring-blue-400/30 shadow-md transition-all duration-300"
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Leave Requests Table -->
    <div class="bg-primary rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" @click="sortBy('employeeName')">
                Employee
                <span v-if="sortColumn === 'employeeName'" class="ml-1">
                  {{ sortDirection === 'asc' ? '↑' : '↓' }}
                </span>
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" @click="sortBy('leaveType')">
                Leave Type
                <span v-if="sortColumn === 'leaveType'" class="ml-1">
                  {{ sortDirection === 'asc' ? '↑' : '↓' }}
                </span>
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" @click="sortBy('startDate')">
                Period
                <span v-if="sortColumn === 'startDate'" class="ml-1">
                  {{ sortDirection === 'asc' ? '↑' : '↓' }}
                </span>
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" @click="sortBy('duration')">
                Duration
                <span v-if="sortColumn === 'duration'" class="ml-1">
                  {{ sortDirection === 'asc' ? '↑' : '↓' }}
                </span>
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" @click="sortBy('status')">
                Status
                <span v-if="sortColumn === 'status'" class="ml-1">
                  {{ sortDirection === 'asc' ? '↑' : '↓' }}
                </span>
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="leave in filteredLeaves"
              :key="leave.id"
              class="hover:bg-gray-50 transition-colors"
            >
              <!-- Employee Column -->
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                    <span class="text-indigo-600 font-medium">
                      {{ getEmployeeName(leave.employeeId).charAt(0) }}
                    </span>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">
                      {{ getEmployeeName(leave.employeeId) }}
                    </div>
                  </div>
                </div>
              </td>
              
              <!-- Leave Type Column -->
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" 
                  :class="{
                    'bg-blue-100 text-blue-800': leave.leaveType === 'annual',
                    'bg-purple-100 text-purple-800': leave.leaveType === 'sick',
                    'bg-amber-100 text-amber-800': leave.leaveType === 'emergency',
                    'bg-gray-100 text-gray-800': leave.leaveType === 'unpaid'
                  }">
                  {{ formatLeaveType(leave.leaveType) }}
                </span>
              </td>
              
              <!-- Period Column -->
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(leave.startDate) }} - {{ formatDate(leave.endDate) }}
              </td>
              
              <!-- Duration Column -->
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div class="flex items-center">
                  <span>{{ calculateLeaveDays(leave) }} days</span>
                  <span v-if="!isLeaveValid(leave)" class="ml-2 text-xs text-red-500">(invalid)</span>
                </div>
              </td>
              
              <!-- Status Column -->
              <td class="px-6 py-4 whitespace-nowrap relative">
                <div class="flex items-center">
                  <button
                    @click.stop="toggleStatusDropdown(leave.id)"
                    class="px-3 py-1 text-sm font-medium rounded-full flex items-center gap-1 cursor-pointer transition-all"
                    :class="statusClass(leave.status)"
                  >
                    <span>{{ formatStatus(leave.status) }}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </div>

                <!-- Status Dropdown -->
                <div
                  v-if="statusDropdownOpen === leave.id"
                  class="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50 border border-gray-200"
                >
                  <div class="py-1">
                    <button
                      v-for="option in statusOptions"
                      :key="option.value"
                      @click="changeLeaveStatus(leave.id, option.value)"
                      class="block px-4 py-2 text-sm w-full text-left hover:bg-gray-100 transition-colors"
                      :class="{
                        'text-gray-700': leave.status !== option.value,
                        'text-indigo-600 font-medium': leave.status === option.value
                      }"
                    >
                      {{ formatStatus(option.value) }}
                    </button>
                  </div>
                </div>
              </td>
              
              <!-- Actions Column -->
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex items-center gap-2">
                  <button
                    @click="openEditLeaveModal(leave)"
                    class="text-indigo-600 hover:text-indigo-900 transition-colors"
                    title="Edit"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </button>
                  <button
                    @click="() => confirmDeleteLeave(leave.id)"
                    class="text-red-600 hover:text-red-900 transition-colors"
                    title="Delete"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="filteredLeaves.length === 0" class="text-center py-12">
      <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
      <h3 class="mt-2 text-sm font-medium text-gray-900">No leave requests found</h3>
      <p class="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria</p>
      <div class="mt-6">
        <button
          @click="openLeaveModal"
          type="button"
          class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="-ml-1 mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
          </svg>
          New Leave Request
        </button>
      </div>
    </div>

    <!-- Leave Request Modal -->
    <LeaveRequest
      :visible="showLeaveModal"
      @close="showLeaveModal = false"
      @submitted="handleLeaveSubmitted"
    />

    <!-- Edit Leave Modal -->
    <LeaveRequest
      :visible="showEditModal"
      :leave="leaveToEdit"
      :isEdit="true"
      @close="closeEditModal"
      @submitted="handleLeaveSubmitted"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { LeaveService } from '@/services/leaveService'
import { EmployeeService } from '@/services/employeeService'
import LeaveRequest from '@/components/LeaveRequest.vue'
import ActionButtons from '@/components/ActionButtons.vue'
import { confirmDelete } from '@/utils/confirmDelete.js'

// Data
const leaves = ref([])
const showLeaveModal = ref(false)
const showEditModal = ref(false)
const leaveToEdit = ref(null)
const statusDropdownOpen = ref(null)

// Search and Filter
const searchQuery = ref('')
const leaveTypeFilter = ref('')
const statusFilter = ref('')
const sortColumn = ref('startDate')
const sortDirection = ref('desc')

const statusOptions = [
  { value: 'pending' },
  { value: 'approved' },
  { value: 'rejected' },
]

onMounted(() => {
  loadLeaves()
})

// Computed Properties
const filteredLeaves = computed(() => {
  let result = leaves.value.map(leave => ({
    ...leave,
    employeeName: getEmployeeName(leave.employeeId),
    duration: calculateLeaveDays(leave)
  }))

  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(leave => 
      leave.employeeName.toLowerCase().includes(query)
    )
  }

  // Apply leave type filter
  if (leaveTypeFilter.value) {
    result = result.filter(leave => leave.leaveType === leaveTypeFilter.value)
  }

  // Apply status filter
  if (statusFilter.value) {
    result = result.filter(leave => leave.status === statusFilter.value)
  }

  // Apply sorting
  return result.sort((a, b) => {
    let valA = a[sortColumn.value]
    let valB = b[sortColumn.value]

    // Special handling for dates
    if (sortColumn.value === 'startDate') {
      valA = new Date(a.startDate)
      valB = new Date(b.startDate)
    }

    if (valA < valB) return sortDirection.value === 'asc' ? -1 : 1
    if (valA > valB) return sortDirection.value === 'asc' ? 1 : -1
    return 0
  })
})

// Methods
const loadLeaves = () => {
  try {
    leaves.value = LeaveService.getLeaveRequests()
  } catch (error) {
    console.error('Failed to load leaves:', error)
  }
}

const sortBy = (column) => {
  if (sortColumn.value === column) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortColumn.value = column
    sortDirection.value = 'asc'
  }
}

// Rest of your existing methods remain the same...
const getEmployeeName = (id) => {
  const emp = EmployeeService.getEmployees().find(e => e.id === id)
  return emp ? emp.name : 'Unknown'
}

const formatLeaveType = (type) => {
  const types = {
    annual: 'Annual',
    sick: 'Sick',
    emergency: 'Emergency',
    unpaid: 'Unpaid'
  }
  return types[type] || type
}

const formatDate = (dateStr) => {
  try {
    return new Date(dateStr).toLocaleDateString('en-US')
  } catch {
    return dateStr
  }
}

const isLeaveValid = (leave) => {
  if (!leave?.startDate || !leave?.endDate) return false
  const start = new Date(leave.startDate)
  const end = new Date(leave.endDate)
  return !isNaN(start) && !isNaN(end) && end >= start
}

const calculateLeaveDays = (leave) => {
  if (!isLeaveValid(leave)) return 0
  const start = new Date(leave.startDate)
  const end = new Date(leave.endDate)
  const diffTime = end - start
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
}

const statusClass = (status) => {
  return {
    'bg-green-100 text-green-800': status === 'approved',
    'bg-yellow-100 text-yellow-800': status === 'pending',
    'bg-red-100 text-red-800': status === 'rejected',
  }
}

const formatStatus = (status) => {
  return {
    approved: 'Approved',
    pending: 'Pending',
    rejected: 'Rejected'
  }[status] || status
}

const openLeaveModal = () => {
  showLeaveModal.value = true
}

const handleLeaveSubmitted = () => {
  loadLeaves()           
  showLeaveModal.value = false
  showEditModal.value = false
  leaveToEdit.value = null
}

const openEditLeaveModal = (leave) => {
  leaveToEdit.value = { ...leave }
  showEditModal.value = true
}

const closeEditModal = () => {
  showEditModal.value = false
  leaveToEdit.value = null
}

const toggleStatusDropdown = (id) => {
  statusDropdownOpen.value = statusDropdownOpen.value === id ? null : id
}

const changeLeaveStatus = (id, newStatus) => {
  const leave = leaves.value.find(l => l.id === id)
  if (leave && leave.status !== newStatus) {
    leave.status = newStatus
    LeaveService.updateLeaveStatus(id, newStatus)
  }
  statusDropdownOpen.value = null
}

const confirmDeleteLeave = async (id) => {
  const confirmed = await confirmDelete('Are you sure you want to delete this leave request?', 'Yes, delete it!')
  if (confirmed) {
    deleteLeave(id)
  }
}

const deleteLeave = (id) => {
  LeaveService.deleteLeaveRequest(id)
  loadLeaves()
}
</script>

<style scoped>
::-webkit-scrollbar {
  height: 8px;
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

/* Add any other custom styles here */
</style>