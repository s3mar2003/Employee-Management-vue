
<template>
  <transition name="modal-slide">
    <div v-if="visible" class="fixed inset-0 bg-gray-900/70 backdrop-blur-sm flex justify-center items-center z-50 px-4 py-8">
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md overflow-hidden relative">
        
        <!-- زر الإغلاق الأنيق -->
        <button 
          @click="$emit('close')" 
          class="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-all p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          aria-label="Close modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <!-- رأس المودال -->
        <div class="bg-indigo-600 text-white p-6 text-center">
          <div class="w-20 h-20 mx-auto rounded-full bg-white/20 border-4 border-white/30 mb-4 flex items-center justify-center overflow-hidden">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h2 class="text-2xl font-bold">{{ employee.name }}</h2>
          <p class="text-indigo-100 mt-1">{{ employee.position }}</p>
        </div>

        <!-- محتوى المودال -->
        <div class="p-6 space-y-6 max-h-[65vh] overflow-y-auto">
          
          <!-- معلومات أساسية -->
          <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <h3 class="text-lg font-semibold text-indigo-600 dark:text-indigo-400 mb-3 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              المعلومات الأساسية
            </h3>
            <ul class="space-y-3 text-gray-700 dark:text-gray-300">
              <li class="flex justify-between">
                <span class="font-medium text-gray-500 dark:text-gray-400">القسم:</span>
                <span>{{ employee.department }}</span>
              </li>
              <li class="flex justify-between">
                <span class="font-medium text-gray-500 dark:text-gray-400">نوع العقد:</span>
                <span>{{ employee.contract }}</span>
              </li>
              <li class="flex justify-between">
                <span class="font-medium text-gray-500 dark:text-gray-400">التقييم:</span>
                <div class="flex items-center gap-1 text-amber-500">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span>{{ employee.evaluation }}</span>
                </div>
              </li>
            </ul>
          </div>

          <!-- معلومات الاتصال والعنوان -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <!-- معلومات الاتصال -->
            <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h3 class="text-lg font-semibold text-indigo-600 dark:text-indigo-400 mb-3 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                معلومات الاتصال
              </h3>
              <ul class="space-y-3 text-gray-700 dark:text-gray-300">
                <li class="flex flex-col gap-1">
                  <span class="text-sm font-medium text-gray-500 dark:text-gray-400">البريد الإلكتروني:</span>
                  <div class="bg-gray-50 dark:bg-gray-700 rounded-md px-3 py-2 text-sm break-all">
                    {{ employee.email }}
                  </div>
                </li>
                <li class="flex flex-col gap-1">
                  <span class="text-sm font-medium text-gray-500 dark:text-gray-400">الهاتف:</span>
                  <div class="bg-gray-50 dark:bg-gray-700 rounded-md px-3 py-2">
                    {{ employee.phone || 'غير متوفر' }}
                  </div>
                </li>
              </ul>
            </div>

            <!-- العنوان -->
            <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h3 class="text-lg font-semibold text-indigo-600 dark:text-indigo-400 mb-3 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                العنوان
              </h3>
              <div class="bg-gray-50 dark:bg-gray-700 rounded-md px-3 py-2 h-full flex items-center">
                <p>{{ employee.address || 'غير متوفر' }}</p>
              </div>
            </div>
          </div>

          <!-- معلومات الراتب -->
          <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <h3 class="text-lg font-semibold text-indigo-600 dark:text-indigo-400 mb-3 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              معلومات الراتب
            </h3>
            <div v-if="salaryData" class="space-y-3 text-gray-700 dark:text-gray-300">
              <div class="flex justify-between">
                <span class="font-medium text-gray-500 dark:text-gray-400">الراتب الأساسي:</span>
                <span>{{ salaryData.base }} ر.س</span>
              </div>
              <div class="flex justify-between">
                <span class="font-medium text-gray-500 dark:text-gray-400">نسبة المكافأة:</span>
                <span class="text-green-600 dark:text-green-400">{{ salaryData.bonusPercent }}%</span>
              </div>
              <div class="flex justify-between">
                <span class="font-medium text-gray-500 dark:text-gray-400">نسبة الخصم:</span>
                <span class="text-red-600 dark:text-red-400">{{ salaryData.deductionPercent }}%</span>
              </div>
              <div class="flex justify-between pt-3 mt-3 border-t border-gray-200 dark:border-gray-700 font-bold">
                <span>صافي الراتب:</span>
                <span class="text-lg text-green-600 dark:text-green-400">{{ netSalary }} ر.س</span>
              </div>
            </div>
            <div v-else class="text-center py-3 text-amber-600 dark:text-amber-400">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <p class="mt-1 text-sm">لا توجد بيانات راتب مسجلة</p>
            </div>
          </div>

          <!-- الإجازات -->
          <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <h3 class="text-lg font-semibold text-indigo-600 dark:text-indigo-400 mb-3 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              سجل الإجازات
            </h3>
            <div class="flex justify-between items-center text-gray-700 dark:text-gray-300">
              <span class="font-medium text-gray-500 dark:text-gray-400">إجمالي الأيام:</span>
              <span class="text-lg font-bold">{{ holidaysTaken }} يوم</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>



<style>
.modal-slide-enter-active,
.modal-slide-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-slide-enter-from,
.modal-slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* شريط التمرير المخصص */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.dark ::-webkit-scrollbar-track {
  background: #2d3748;
}

.dark ::-webkit-scrollbar-thumb {
  background: #4a5568;
}
</style>

<script setup>
import { computed } from 'vue'
import { SalaryService } from '@/services/salaryService'

const props = defineProps({
  employee: Object,
  visible: Boolean
})

const emit = defineEmits(['close'])

// بيانات الراتب
const salaryData = computed(() => {
  return SalaryService.getSalaryByEmployeeId(props.employee?.id)
})

// حساب الراتب الصافي
const netSalary = computed(() => {
  if (!salaryData.value) return 0
  const base = Number(salaryData.value.base) || 0
  const bonus = base * (Number(salaryData.value.bonusPercent) / 100) || 0
  const deduction = base * (Number(salaryData.value.deductionPercent) / 100) || 0
  return (base + bonus - deduction).toFixed(2)
})

// حساب الإجازات
const holidaysTaken = computed(() => {
  const leaves = JSON.parse(localStorage.getItem('leaves') || '[]')
  const employeeLeaves = leaves.filter(
    leave => leave.employeeId === props.employee?.id && leave.status === 'approved'
  )
  return employeeLeaves.reduce((total, leave) => {
    const start = new Date(leave.startDate)
    const end = new Date(leave.endDate)
    return total + Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1
  }, 0)
})
</script>