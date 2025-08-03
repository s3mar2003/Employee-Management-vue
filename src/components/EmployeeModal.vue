<template>
<div v-if="visible" class=" fixed inset-0 z-[9999] bg-black/40 backdrop-blur-sm flex items-start justify-center pt-20 px-4 sm:px-6 py-6 overflow-y-auto">
    <div class="bg-white rounded-xl shadow-xl w-full max-w-2xl p-6 relative">
      <button class="absolute top-2 right-3 text-text hover:text-red-500" @click="$emit('close')">
        ✕
      </button>

      <h2 class="text-xl font-bold mb-4 text-text text-center">Edit Employee</h2>
      <form @submit.prevent="submitEdit" class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="text-sm text-text-300">Name</label>
          <input v-model="localData.name" class="p-2 w-full border rounded bg-priamry  text-sm text-text" required />
        </div>
        <div>
          <label class="text-sm text-text">Email</label>
          <input v-model="localData.email" class="input" required />
        </div>
        <div>
          <label class="text-sm text-text">Department</label>
          <select v-model="localData.department" class="input" required>
            <option>HR</option>
            <option>Finance</option>
            <option>Development</option>
          </select>
        </div>
        <div>
          <label class="text-sm text-text">Contract</label>
          <select v-model="localData.contract" class="input" required>
            <option>Full-Time</option>
            <option>Part-Time</option>
            <option>Freelance</option>
          </select>
        </div>
        <div>
          <label class="text-sm text-text">Salary</label>
          <input type="number" v-model.number="localData.salary" class="input" />
        </div>
        <div>
          <label class="text-sm text-text">Bonus</label>
          <input type="number" v-model.number="localData.bonus" class="input" />
        </div>
        <div>
          <label class="text-sm text-text">Deduction</label>
          <input type="number" v-model.number="localData.deduction" class="input" />
        </div>
        <div>
          <label class="text-sm text-text">Evaluation</label>
          <select v-model="localData.evaluation" class="input">
            <option>Excellent</option>
            <option>Good</option>
            <option>Under Development</option>
          </select>
        </div>
        <div class="md:col-span-2 text-center mt-4">
          <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'

const props = defineProps(['visible', 'employee'])
const emit = defineEmits(['close', 'save'])

const localData = reactive({ ...props.employee })

watch(() => props.employee, (newVal) => {
  Object.assign(localData, newVal)
}, { deep: true })

function submitEdit() {
  emit('save', { ...localData })
}
</script>

<style scoped>

</style>
