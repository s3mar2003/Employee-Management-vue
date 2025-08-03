<template>
  <transition name="modal-fade">
    <div
      v-if="visible"
      class="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
    >
      <div 
        class="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md relative transform transition-all duration-300"
        @click.stop
      >
        <!-- زر الإغلاق المحسن -->
        <button
          @click="$emit('close')"
          class="absolute top-4 right-4 text-gray-400 hover:text-red-500 p-1 rounded-full transition-colors"
          aria-label="إغلاق"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <!-- رأس النموذج -->
        <div class="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 class="text-2xl font-bold text-gray-800  text-center">
            {{ isEdit ? 'تعديل طلب الإجازة' : 'طلب إجازة جديدة' }}
          </h2>
        </div>

        <form @submit.prevent="submitRequest" class="p-6 space-y-4">
          <div>
            <label class="block mb-2 text-sm font-medium text-gray-700 ">Employee</label>
            <select
              v-model="form.employeeId"
              class="w-full px-4 py-2 border border-gray-300  rounded-lg bg-white  text-gray-900  focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              required
            >
              <option value="" disabled selected>Select Employee ...</option>
              <option 
                v-for="emp in employees" 
                :value="emp.id" 
                :key="emp.id"
                class=""
              >
                {{ emp.name }} - {{ emp.department }}
              </option>
            </select>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block mb-2 text-sm font-medium text-gray-700 d">Type Leave </label>
              <select
                v-model="form.leaveType"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white  text-gray-900  focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                required
              >
                <option value="annual">annual leave </option>
                <option value="sick"> sick leave</option>
                <option value="emergency">emergency leave </option>
              </select>
            </div>

            <div>
              <label class="block mb-2 text-sm font-medium text-gray-700 "> Form Date </label>
              <input
                type="date"
                v-model="form.startDate"
                class="w-full px-4 py-2 border border-gray-300  rounded-lg bg-white  text-gray-900  focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                required
              />
            </div>

            <div>
              <label class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">To date </label>
              <input
                type="date"
                v-model="form.endDate"
                class="w-full px-4 py-2 border border-gray-300  rounded-lg bg-white  text-gray-900  focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                required
              />
            </div>
          </div>

          <div>
            <label class="block mb-2 text-sm font-medium text-gray-700 ">reason  (opacity)</label>
            <textarea
              v-model="form.reason"
              class="w-full px-4 py-2 border border-gray-300  rounded-lg bg-white  text-gray-900  focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition min-h-[100px]"
              rows="3"
            ></textarea>
          </div>

          <div class="pt-4">
            <button 
              type="submit" 
              class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-6 rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              {{ isEdit ? ' update' : 'submit ' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </transition>
</template>



<style>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}


</style>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { EmployeeService } from '@/services/employeeService'
import { LeaveService } from '@/services/leaveService'

const props = defineProps({
  visible: Boolean,
  leave: Object,
  isEdit: Boolean
})

const emit = defineEmits(['close', 'submitted'])

const employees = ref([])

const form = ref({
  id: null,
  employeeId: '',
  leaveType: 'annual',
  startDate: '',
  endDate: '',
  reason: '',
  status: 'pending'
})


onMounted(() => {
  employees.value = EmployeeService.getEmployees()
})

watch(
  () => props.leave,
  (newVal) => {
    if (newVal) {
      form.value = { ...newVal }
    } else {
      form.value = {
        id: null,
        employeeId: '',
        leaveType: 'annual',
        startDate: '',
        endDate: '',
        reason: '',
        status: 'pending'
      }
    }
  },
  { immediate: true }
)


const submitRequest = () => {
  if (!form.value.employeeId || !form.value.startDate || !form.value.endDate) {
    alert('يرجى ملء جميع الحقول المطلوبة')
    return
  }

  if (form.value.id) {
    LeaveService.updateLeaveRequest(form.value.id, { ...form.value })
  } else {
    LeaveService.addLeaveRequest({ ...form.value })
  }

  emit('submitted')
  emit('close')
}



</script>