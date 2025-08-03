<template>
  <div class="max-w-3xl mx-auto bg-primary  p-6 md:p-8 mt-6 md:mt-10 rounded-xl shadow-lg transition-colors duration-300">
    <h2 class="text-2xl md:text-3xl font-extrabold text-text  mb-6 md:mb-8 text-center">  Add A New Employee</h2>
    
    <form @submit.prevent="submitForm" novalidate class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
      <div>
        <!-- name -->
        <label for="name" class="block text-sm font-medium text-text  mb-1 md:mb-2">
          Name <span class="text-red-500">*</span></label>
        <input
          id="name"
          type="text"
          v-model.trim="form.name"
          @input="validateField('name')"
          :class="inputClass(errors.name)"
          placeholder=" Enter Name"
          required
          autocomplete="off"
        />
        <p v-if="errors.name" class="mt-1 text-xs text-red-500 ">{{ errors.name }}</p>
      </div>

      <!-- email  -->
      <div>
        <label for="email" class="block text-sm font-medium text-text  mb-1 md:mb-2">Email  <span class="text-red-500">*</span></label>
        <input
          id="email"
          type="email"
          v-model.trim="form.email"
          @input="validateField('email')"
          :class="inputClass(errors.email)"
          placeholder="example@email.com"
          required
          autocomplete="off"
        />
        <p v-if="errors.email" class="mt-1 text-xs text-red-500 ">{{ errors.email }}</p>
      </div>

      <!-- depart -->
      <div>
        <label for="department" class="block text-sm font-medium text-text  mb-1 md:mb-2">Department <span class="text-red-500">*</span></label>
        <select
          id="department"
          v-model="form.department"
          @change="validateField('department')"
          :class="inputClass(errors.department)"
          required
        >
          <option disabled value=""> Select department </option>
          <option>HR</option>
          <option>Finance</option>
          <option>Development</option>
        </select>
        <p v-if="errors.department" class="mt-1 text-xs text-red-500 ">{{ errors.department }}</p>
      </div>

      <!-- contract  -->
      <div>
        <label for="contract" class="block text-sm font-medium text-text  mb-1 md:mb-2">Contract Type <span class="text-red-500">*</span></label>
        <select
          id="contract"
          v-model="form.contract"
          @change="validateField('contract')"
          :class="inputClass(errors.contract)"
          required
        >
          <option disabled value="">Select Type </option>
          <option>Full-Time</option>
          <option>Part-Time</option>
          <option>Freelance</option>
        </select>
        <p v-if="errors.contract" class="mt-1 text-xs text-red-500 ">{{ errors.contract }}</p>
      </div>

      <!-- salary  -->
      <!-- <div>
        <label for="salary" class="block text-sm font-medium text-text  mb-1 md:mb-2"> Salary <span class="text-red-500">*</span></label>
        <input
          id="salary"
          type="number"
          min="0"
          v-model.number="form.salary"
          @input="validateField('salary')"
          :class="inputClass(errors.salary)"
          placeholder="Entar Salary "
          required
        />
        <p v-if="errors.salary" class="mt-1 text-xs text-red-500 ">{{ errors.salary }}</p>
      </div> -->

     <!-- bonus percentage -->
<!-- <div>
  <label for="bonus" class="block text-sm font-medium text-text mb-1 md:mb-2">
    Bonus (%)
  </label>
  <input
    id="bonus"
    type="number"
    v-model.number="form.bonus"
    :class="inputClass(form.bonus < 0 || form.bonus > 100 ? 'Bonus must be 0-100%' : null)"
    placeholder="Enter bonus percentage"
    min="0"
    max="100"
  />
  <p v-if="form.bonus < 0 || form.bonus > 100" class="text-red-500 text-sm mt-1">
    Bonus must be between 0% and 100%.
  </p>
</div> -->

<!-- deduction percentage -->
<!-- <div>
  <label for="deduction" class="block text-sm font-medium text-text mb-1 md:mb-2">
    Deduction (%)
  </label>
  <input
    id="deduction"
    type="number"
    v-model.number="form.deduction"
    :class="inputClass(form.deduction < 0 || form.deduction > 100 ? 'Deduction must be 0-100%' : null)"
    placeholder="Enter deduction percentage"
    min="0"
    max="100"
  />
  <p v-if="form.deduction < 0 || form.deduction > 100" class="text-red-500 text-sm mt-1">
    Deduction must be between 0% and 100%.
  </p>
</div> -->


      <!-- evaluation  -->
      <div>
        <label for="evaluation" class="block text-sm font-medium text-text  mb-1 md:mb-2">Evaluation <span class="text-red-500">*</span></label>
        <select
          id="evaluation"
          v-model="form.evaluation"
          @change="validateField('evaluation')"
          :class="inputClass(errors.evaluation)"
          required
        >
          <option disabled value="">Select Evalution </option>
          <option>Excellend</option>
          <option>Good</option>
          <option>under development </option>
        </select>
        <p v-if="errors.evaluation" class="mt-1 text-xs text-red-500 ">{{ errors.evaluation }}</p>
      </div>
  <!-- phone -->
<!-- phone -->
<div>
  <label for="phone" class="block text-sm font-medium text-text mb-1 md:mb-2">
    Phone Number <span class="text-red-500">*</span>
  </label>
  <input
    id="phone"
    type="text"
    v-model="form.phone"
    @input="onPhoneInput"
    :class="inputClass(errors.phone)"
    class="w-full p-2 border rounded"
    placeholder="Enter phone number"
    autocomplete="off"
  />
  <p v-if="errors.phone" class="text-red-500 text-sm mt-1">{{ errors.phone }}</p>
</div>


<!-- address -->
<div>
  <label for="address" class="block text-sm font-medium text-text mb-1 md:mb-2">
    Address
  </label>
  <input
    id="address"
    type="text"
    v-model.trim="form.address"
    @input="validateField('address')"
    :class="inputClass(errors.address)"
    placeholder="Enter address"
    autocomplete="off"
  />
  <p v-if="errors.address" class="text-red-500 text-sm mt-1">{{ errors.address }}</p>
</div>


      <!-- submit -->
      <div class="md:col-span-2 text-center mt-4">
        <button
          type="submit"
          class=" bg-indigo-600 hover:bg-indigo-700 text-text px-6 py-2 md:px-8 md:py-3 rounded-lg  duration-300 font-medium w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="hasErrors"
        >
          Sava
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { EmployeeService } from '@/services/employeeService'
import { ActivityService } from '@/services/activityService'
import { notify } from '@kyvg/vue3-notification'
const router = useRouter()

const form = reactive({
  name: '',
  email: '',
  department: '',
   contract: '',
  // salary: null,
  // bonus: null,
  // deduction: null,
  evaluation: '',
  phone: '',
  address: ''
})

const errors = reactive({
  name: null,
  email: null,
  department: null,
   contract: null,
  // salary: null,
  // bonus: null,
  // deduction: null,
  evaluation: null,
  address: null,
  phone: null,
})

function inputClass(error) {
  return [
    "w-full p-2 md:p-3 border rounded-md transition-colors duration-300",
    error
      ? "border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400"
      : "border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400",
    "dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
  ].join(' ')
}

function validateField(field) {
  switch (field) {
    case 'name':
      errors.name = form.name.trim() === '' ? 'Required name' : null
      break
    case 'email':
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      errors.email = !emailPattern.test(form.email) ? 'Please enter a valid email' : null
      break
    case 'department':
      errors.department = form.department === '' ? 'Select department' : null
      break
     case 'contract':
       errors.contract = form.contract === '' ? 'Choose the type of contract' : null
       break
    // case 'salary':
    //   errors.salary = (form.salary === null || form.salary <= 0) ? 'Basic salary greater than zero' : null
    //   break
    // case 'bonus':
    //   errors.bonus = (form.bonus !== null && form.bonus < 0) ? 'The reward cannot be negative' : null
    //   break
    // case 'deduction':
    //   errors.deduction = (form.deduction !== null && form.deduction < 0) ? 'The discounts cannot be negative' : null
    //   break
    case 'evaluation':
      errors.evaluation = form.evaluation === '' ? 'Select evaluation' : null
      break
    case 'address':
      errors.address = form.address === '' ? 'Add address' : null
      break
    case 'phone':
      if (form.phone.trim() === '') {
        errors.phone = 'Phone number is required'
      } else if (!/^\d{9}$/.test(form.phone)) {
        errors.phone = 'Phone number must be exactly 9 digits'
      } else {
        errors.phone = null
      }
      break
  }
}

function validateForm() {
  validateField('name')
  validateField('email')
  validateField('department')
  validateField('contract')
  // validateField('salary')
  // validateField('bonus')
  // validateField('deduction')
  validateField('evaluation')
  validateField('address')
  validateField('phone')

  return !Object.values(errors).some(e => e !== null)
}

const hasErrors = computed(() => {
  return Object.values(errors).some(e => e !== null) ||
    !form.name || !form.email || !form.department || !form.contract ||  !form.evaluation
})

function onPhoneInput(e) {
  const value = e.target.value.replace(/\D/g, '').slice(0, 9) // أرقام فقط، max 9
  form.phone = value

  if (!value) {
    errors.phone = 'Phone number is required'
  } else if (value.length !== 9) {
    errors.phone = 'Phone number must be exactly 9 digits'
  } else {
    errors.phone = null
  }
}

function submitForm() {
  if (!validateForm()) {
    notify({
      title: "خطأ",
      text: "الرجاء تصحيح الأخطاء",
      type: "error",
      duration: 4000,
    })
    return
  }

  try {
   const newEmployee = {
  id: Date.now(),
  name: form.name,
  email: form.email,
  department: form.department,
  contract: form.contract,
  evaluation: form.evaluation,
  phone: form.phone,
  address: form.address,

  // الحقول القديمة تبقى كما هي
  // salary: parseFloat(form.salary),
  // bonus: parseFloat(form.bonus || 0),
  // deduction: parseFloat(form.deduction || 0),

  // salaryData الجديد للحساب لاحقًا
  // salaryData: {
  //   basic: parseFloat(form.salary),
  //   bonus: parseFloat(form.bonus || 0),
  //   deductions: parseFloat(form.deduction || 0),
  //   absences: 0,
  //   finalSalary: null
  // }
}

    EmployeeService.addEmployee(newEmployee)

    ActivityService.addActivity({
      name: newEmployee.name,
      type: 'added',
      date: new Date().toISOString().split('T')[0]
    })

    notify({
      title: "نجاح",
      text: "تم إضافة الموظف بنجاح!",
      type: "success",
      duration: 4000,
    })

    resetForm()

    setTimeout(() => {
      router.push('/employees')
    }, 1500)

  } catch (error) {
    console.error('خطأ في حفظ الموظف:', error)
    notify({
      title: "خطأ",
      text: "حدث خطأ أثناء حفظ الموظف. الرجاء فحص وحدة التحكم للتفاصيل.",
      type: "error",
      duration: 4000,
    })
  }
}

function resetForm() {
  form.name = ''
  form.email = ''
  form.department = ''
  form.contract = ''
  form.salary = null
  form.bonus = null
  form.deduction = null
  form.evaluation = ''
  form.phone = ''
  form.address = ''

  Object.keys(errors).forEach(key => (errors[key] = null))
}
</script>
