<template>
  <!-- Search and Filter Section -->
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow p-4 mb-6">
    <div class="flex flex-col md:flex-row gap-4 items-center">
      <!-- Search Input -->
      <div class="relative w-full md:w-80">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path>
          </svg>
        </div>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search by name or email"
          class="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      <!-- Department Filter -->
      <select 
        v-model="selectedDepartment"
        class="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full md:w-auto bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      >
        <option value="">All Departments</option>
        <option value="HR">Human Resources</option>
        <option value="Finance">Finance</option>
        <option value="Development">Development</option>
      </select>
    </div>
  </div>

  <!-- Employees Table -->
  <div v-if="filteredEmployees.length > 0" class="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
    <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
      <thead class="bg-gray-50 dark:bg-gray-700">
        <tr>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Department</th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Contract</th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Evaluation</th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
        </tr>
      </thead>
      <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
        <tr 
          v-for="(employee, index) in filteredEmployees"
          :key="employee.id || index"
          class="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
          @click="openDetailsModal(index)"
        >
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="flex items-center">
              <div class="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <span class="text-blue-600 dark:text-blue-300 font-medium">{{ employee.name.charAt(0) }}</span>
              </div>
              <div class="ml-4">
                <div class="text-sm font-medium text-gray-900 dark:text-white">{{ employee.name }}</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">{{ employee.email }}</div>
              </div>
            </div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" :class="departmentBadgeClass(employee.department)">
              {{ employee.department }}
            </span>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{{ employee.contract }}</td>
          <td class="px-6 py-4 whitespace-nowrap">
            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" :class="evaluationClass(employee.evaluation)">
              {{ employee.evaluation }}
            </span>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium" @click.stop>
            <ActionButtons
              @edit="openEditModal(index)"
              @delete="confirmDeleteEmployee(index)"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Empty State -->
  <div v-else class="bg-white dark:bg-gray-800 rounded-xl shadow p-8 text-center">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <h3 class="mt-4 text-lg font-medium text-gray-900 dark:text-white">No employees found</h3>
    <p class="mt-1 text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria</p>
    <RouterLink
      to="/employee"
      class="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      Add New Employee
    </RouterLink>
  </div>

  <!-- Modals -->
  <EmployeeDetailsModal
    :employee="selectedEmployee"
    :visible="showDetailsModal"
    @close="showDetailsModal = false"
  />

  <EmployeeModal
    :visible="showModal"
    :employee="selectedEmployee"
    @close="showModal = false"
    @save="saveEditedEmployee"
  />

  <Notifications />
</template>



<style scoped>
/* Custom scrollbar for the table */
.overflow-hidden::-webkit-scrollbar {
  height: 8px;
}

.overflow-hidden::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.overflow-hidden::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}

.overflow-hidden::-webkit-scrollbar-thumb:hover {
  background: #555;
}

</style>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, RouterLink } from 'vue-router'

import EmployeeModal from '@/components/EmployeeModal.vue'
import EmployeeDetailsModal from '@/components/EmployeeDetailsModal.vue'
import Swal from 'sweetalert2'

import ActionButtons from '@/components/ActionButtons.vue' 

const router = useRouter()
const employees = ref([])
const searchQuery = ref('')
const selectedDepartment = ref('')
const showModal = ref(false)
const showDetailsModal = ref(false)
const selectedEmployee = ref(null)
const selectedIndex = ref(null)

function loadEmployees() {
  const stored = localStorage.getItem('employees')
  employees.value = stored ? JSON.parse(stored) : []
}
function saveToLocalStorage() {
  localStorage.setItem('employees', JSON.stringify(employees.value))
}

function addActivity(name, type) {
  let acts = JSON.parse(localStorage.getItem('activities') || '[]')
  acts.unshift({
    name,
    type,
    date: new Date().toISOString().slice(0, 10)
  })
  if (acts.length > 20) acts.pop()
  localStorage.setItem('activities', JSON.stringify(acts))
}

onMounted(() => {
  loadEmployees()
})

function openEditModal(index) {
  selectedIndex.value = index
  selectedEmployee.value = { ...employees.value[index] }
  showModal.value = true
}

function saveEditedEmployee(updatedEmployee) {
  employees.value[selectedIndex.value] = updatedEmployee
  saveToLocalStorage()
  addActivity(updatedEmployee.name, 'updated')
  showModal.value = false
  showSuccess('Employee updated successfully')
}

async function confirmDeleteEmployee(index) {
  try {
    const { isConfirmed } = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    })

    if (isConfirmed) {
      deleteEmployee(index)
    }
  } catch (error) {
    showError('An error occurred while deleting the employee')
  }
}

function deleteEmployee(index) {
  const deletedEmployee = employees.value[index]
  employees.value.splice(index, 1)
  saveToLocalStorage()
  addActivity(deletedEmployee.name, 'deleted')
  showSuccess(`Employee ${deletedEmployee.name} has been deleted`)
}

function openDetailsModal(index) {
  selectedEmployee.value = { ...employees.value[index] }
  showDetailsModal.value = true
}

// function calculateNetSalary(employee) {
//   const salary = Number(employee.salary) || 0
//   const bonus = Number(employee.bonus) || 0
//   const deduction = Number(employee.deduction) || 0
//   return salary + bonus - deduction
// }

function evaluationClass(evaluation) {
  const evalLower = evaluation?.toLowerCase() || ''
  return {
    'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200': 
      ['excellent', 'ممتاز'].includes(evalLower),
    'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200': 
      ['good', 'جيد'].includes(evalLower),
    'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200': 
      ['under development', 'يحتاج تطوير'].includes(evalLower),
  }
}

function departmentBadgeClass(department) {
  return {
    'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200': department === 'HR',
    'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200': department === 'Finance',
    'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200': department === 'Development',
    'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200': department === 'Marketing',
  }
}
function addNewEmployee(newEmployee) {
  employees.value.push(newEmployee)  // تحديث الذاكرة الحية reactive
  saveToLocalStorage()               // تحديث localStorage
  addActivity(newEmployee.name, 'added')
}
const filteredEmployees = computed(() => {
  const query = searchQuery.value.toLowerCase()
  const dept = selectedDepartment.value
  
  return employees.value.filter(emp => {
    const matchesSearch = 
      emp.name?.toLowerCase().includes(query) ||
      emp.email?.toLowerCase().includes(query)
    
    const matchesDept = dept ? emp.department === dept : true
    
    return matchesSearch && matchesDept && !emp.deleted
  })
})
</script>
