<template>
  <div class="max-w-5xl mx-auto p-6 space-y-8">
    <h2 class="text-3xl font-bold text-center text-text">Salary Management</h2>

    <!-- Search and Filter Section -->
    <div class="bg-primary p-4 rounded-xl shadow-md">
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

        <!-- Filter by Department -->
        <div>
          <label class="block text-sm font-semibold text-text mb-1">Filter by Department</label>
          <select
            v-model="departmentFilter"
            class="w-full px-4 py-2 rounded-xl bg-white text-text border border-gray-300 focus:ring-4 focus:ring-blue-400/30 shadow-md transition-all duration-300"
          >
            <option value="">All Departments</option>
            <option v-for="dept in departments" :value="dept" :key="dept">
              {{ dept }}
            </option>
          </select>
        </div>

        <!-- Filter by Salary Range -->
        <div>
          <label class="block text-sm font-semibold text-text mb-1">Salary Range</label>
          <select
            v-model="salaryRangeFilter"
            class="w-full px-4 py-2 rounded-xl bg-white text-text border border-gray-300 focus:ring-4 focus:ring-blue-400/30 shadow-md transition-all duration-300"
          >
            <option value="">All Ranges</option>
            <option value="0-5000">0 - 5,000 SAR</option>
            <option value="5001-10000">5,001 - 10,000 SAR</option>
            <option value="10001-20000">10,001 - 20,000 SAR</option>
            <option value="20001+">Above 20,000 SAR</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Salary Calculator Form - هذا القسم الذي تم حذفه بالخطأ -->
    <form @submit.prevent="saveSalary" class="grid grid-cols-1 md:grid-cols-2 gap-6 bg-primary p-6 rounded-2xl shadow-xl">
      <!-- Employee Selection -->
      <div class="flex flex-col gap-2">
        <label class="text-sm font-semibold text-text">Employee</label>
        <select
          v-model="form.employeeId"
          class="w-full px-4 py-3 rounded-xl bg-white text-text border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-400/30 shadow-md transition-all duration-300"
          required
        >
          <option value="" disabled>Select Employee</option>
          <option v-for="emp in employees" :key="emp.id" :value="emp.id">
            {{ emp.name }}
          </option>
        </select>
        <small class="text-xs text-text">Select Employee to Calculate Salary</small>
      </div>

      <!-- Base Salary -->
      <div class="flex flex-col gap-1">
        <label class="text-sm font-medium text-text">Base Salary</label>
        <input type="number" v-model.number="form.base" class="input" placeholder="Enter Base Salary" required />
        <small class="text-xs text-text">Base Salary Amount</small>
      </div>

      <!-- Bonus Percentage -->
      <div class="flex flex-col gap-1">
        <label class="text-sm font-medium text-text">Bonus (%)</label>
        <input type="number" v-model.number="form.bonusPercent" class="input" min="0" max="100" placeholder="Bonus Percentage" />
        <small class="text-xs text-text">Bonus Percentage</small>
      </div>

      <!-- Deduction Percentage -->
      <div class="flex flex-col gap-1">
        <label class="text-sm font-medium text-text">Deduction (%)</label>
        <input type="number" v-model.number="form.deductionPercent" class="input" min="0" max="100" placeholder="Deduction Percentage" />
        <small class="text-xs text-text">Deduction Percentage</small>
      </div>

      <!-- Final Salary -->
      <div class="flex flex-col gap-1 md:col-span-2">
        <label class="text-sm font-medium text-text">Final Salary</label>
        <input
          type="text"
          :value="finalSalary + ' SAR'"
          readonly
          class="input font-semibold text-lg bg-primary text-text py-3"
        />
      </div>

      <!-- Submit Button -->
      <div class="md:col-span-2">
        <button type="submit" class="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl transition duration-300">
          Save Salary
        </button>
      </div>
    </form>

    <!-- Salary Table -->
    <div class="overflow-x-auto bg-primary rounded-2xl shadow-xl">
      <table class="min-w-full text-sm text-left">
        <thead class="bg-primary text-text">
          <tr>
            <th class="px-4 py-3 cursor-pointer" @click="sortBy('employeeName')">
              Employee {{ sortIcon('employeeName') }}
            </th>
            <th class="px-4 py-3">Department</th>
            <th class="px-4 py-3 cursor-pointer" @click="sortBy('base')">
              Base {{ sortIcon('base') }}
            </th>
            <th class="px-4 py-3">Bonus (%)</th>
            <th class="px-4 py-3">Deduction (%)</th>
            <th class="px-4 py-3 cursor-pointer" @click="sortBy('finalSalary')">
              Final Salary {{ sortIcon('finalSalary') }}
            </th>
            <th class="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y bg-primary">
          <tr 
            v-for="(item, index) in filteredSalaries" 
            :key="item.id" 
            class="hover:bg-accent"
          >
            <td class="px-4 py-2 text-text">{{ getEmployeeName(item.employeeId) }}</td>
            <td class="px-4 py-2 text-text">{{ getEmployeeDepartment(item.employeeId) }}</td>
            <td class="px-4 py-2 text-text">{{ item.base }}</td>
            <td class="px-4 py-2 text-text">{{ item.bonusPercent }}</td>
            <td class="px-4 py-2 text-text">{{ item.deductionPercent }}</td>
            <td class="px-4 py-2 font-semibold text-green-700">{{ calcFinal(item) }} SAR</td>
            <td class="px-4 py-2 text-center">
              <ActionButtons 
                @edit="openEdit(index)" 
                @delete="confirmDeleteSalary(index)" 
              />
            </td>
          </tr>
          <tr v-if="filteredSalaries.length === 0">
            <td colspan="7" class="px-4 py-6 text-center text-text">No matching records found</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Edit Modal -->
    <div v-if="showEditModal" class="fixed inset-0 bg-primary/40 backdrop-blur-sm flex justify-center items-center p-4 z-50">
      <div class="bg-white p-6 rounded-xl max-w-md w-full shadow-lg relative">
        <button class="absolute top-2 right-3 text-gray-400 hover:text-red-500 text-xl font-bold" @click="closeEdit">&times;</button>
        <h3 class="text-xl font-bold mb-4 text-text">Edit Salary</h3>
        <form @submit.prevent="saveEdited">
          <div class="mb-3">
            <label class="block mb-1 font-medium text-text">Base Salary</label>
            <input type="number" v-model.number="editForm.base" class="input w-full" required />
          </div>
          <div class="mb-3">
            <label class="block mb-1 font-medium text-text">Bonus (%)</label>
            <input type="number" v-model.number="editForm.bonusPercent" min="0" max="100" class="input w-full" />
          </div>
          <div class="mb-3">
            <label class="block mb-1 font-medium text-text">Deduction (%)</label>
            <input type="number" v-model.number="editForm.deductionPercent" min="0" max="100" class="input w-full" />
          </div>
          <div class="text-right">
            <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">Save</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { EmployeeService } from '@/services/employeeService'
import ActionButtons from '@/components/ActionButtons.vue'
import { confirmDelete } from '@/utils/confirmDelete.js'
import { showSuccess } from '@/utils/notifications.js'

const form = ref({
  employeeId: '',
  base: 0,
  bonusPercent: 0,
  deductionPercent: 0
})

const salaries = ref([])
const employees = ref([])
const showEditModal = ref(false)
const editForm = ref({})
let editIndex = null

const searchQuery = ref('')
const departmentFilter = ref('')
const salaryRangeFilter = ref('')
const sortColumn = ref('employeeName')
const sortDirection = ref('asc')

onMounted(() => {
  employees.value = EmployeeService.getEmployees()
  const saved = localStorage.getItem('salaries')
  salaries.value = saved ? JSON.parse(saved) : []
})

const departments = computed(() => {
  const depts = new Set()
  employees.value.forEach(emp => depts.add(emp.department))
  return Array.from(depts).sort()
})

const filteredSalaries = computed(() => {
  let result = salaries.value.map(item => ({
    ...item,
    employeeName: getEmployeeName(item.employeeId),
    department: getEmployeeDepartment(item.employeeId),
    finalSalary: calcFinal(item)
  }))

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(item => item.employeeName.toLowerCase().includes(query))
  }

  if (departmentFilter.value) {
    result = result.filter(item => item.department === departmentFilter.value)
  }

  if (salaryRangeFilter.value) {
    const [min, max] = salaryRangeFilter.value.split(/[-+]/).map(Number)
    result = result.filter(item => {
      const final = calcFinal(item)
      if (salaryRangeFilter.value.endsWith('+')) return final > min
      return final >= min && final <= max
    })
  }

  // Apply sorting
  return result.sort((a, b) => {
    const valA = a[sortColumn.value]
    const valB = b[sortColumn.value]
    return sortDirection.value === 'asc' 
      ? valA > valB ? 1 : -1
      : valA < valB ? 1 : -1
  })
})

const finalSalary = computed(() => {
  const bonus = form.value.base * (form.value.bonusPercent / 100)
  const deduction = form.value.base * (form.value.deductionPercent / 100)
  return (form.value.base + bonus - deduction).toFixed(2)
})

function getEmployeeDepartment(id) {
  const emp = employees.value.find(e => e.id === id)
  return emp ? emp.department : 'Unknown'
}

function sortBy(column) {
  if (sortColumn.value === column) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortColumn.value = column
    sortDirection.value = 'asc'
  }
}

function sortIcon(column) {
  if (sortColumn.value !== column) return ''
  return sortDirection.value === 'asc' ? '↑' : '↓'
}

function getEmployeeName(id) {
  const emp = employees.value.find(e => e.id === id)
  return emp ? emp.name : 'Unknown'
}

function calcFinal(item) {
  const bonus = item.base * (item.bonusPercent / 100)
  const deduction = item.base * (item.deductionPercent / 100)
  return (item.base + bonus - deduction).toFixed(2)
}

function saveSalary() {
  if (!form.value.employeeId) return alert('Please select an employee.')

  const existingIndex = salaries.value.findIndex(s => s.employeeId === form.value.employeeId)

  const newEntry = {
    id: existingIndex >= 0 ? salaries.value[existingIndex].id : Date.now(),
    employeeId: form.value.employeeId,
    base: form.value.base,
    bonusPercent: form.value.bonusPercent || 0,
    deductionPercent: form.value.deductionPercent || 0
  }

  if (existingIndex >= 0) {
    salaries.value[existingIndex] = newEntry
  } else {
    salaries.value.push(newEntry)
  }

  localStorage.setItem('salaries', JSON.stringify(salaries.value))
  form.value = { employeeId: '', base: 0, bonusPercent: 0, deductionPercent: 0 }
  showSuccess('Salary saved successfully')
}

function openEdit(index) {
  editIndex = index
  editForm.value = { ...salaries.value[index] }
  showEditModal.value = true
}

function closeEdit() {
  showEditModal.value = false
}

function saveEdited() {
  if (editIndex !== null) {
    salaries.value[editIndex] = { ...editForm.value }
    localStorage.setItem('salaries', JSON.stringify(salaries.value))
    showEditModal.value = false
    showSuccess('Salary updated successfully')
  }
}

async function confirmDeleteSalary(index) {
  const confirmed = await confirmDelete('Are you sure you want to delete this salary?', 'Yes, delete it!')
  if (confirmed) deleteSalary(index)
}

function deleteSalary(index) {
  salaries.value.splice(index, 1)
  localStorage.setItem('salaries', JSON.stringify(salaries.value))
}
</script>

<style scoped>

</style>