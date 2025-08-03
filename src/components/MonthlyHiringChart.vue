<template>
  <div class="bg-primary p-6 rounded-2xl shadow-lg h-80">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-lg font-semibold text-text">Monthly Hiring Overview</h3>
      <button @click="refreshChart" class="text-sm text-blue-500 hover:underline">Refresh</button>
    </div>
    <Line :data="chartData" :options="chartOptions" />
  </div>

</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement)

const chartData = ref({
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'New Hires',
      data: new Array(12).fill(0),
      borderColor: '#3b82f6',
      backgroundColor: 'rgba(59, 130, 246, 0.2)',
      fill: true,
      tension: 0.4,
    }
  ]
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: { color: '#fff' }
    }
  },
  scales: {
    x: {
      ticks: { color: '#fff' },
      grid: { color: '#444' }
    },
    y: {
      ticks: { color: '#fff' },
      grid: { color: '#444' }
    }
  }
}

// جلب بيانات الموظفين من localStorage
function getEmployeesFromLocalStorage() {
  const data = localStorage.getItem('employees')
  return data ? JSON.parse(data) : []
}

// حساب التوظيف الشهري
function countHiresPerMonth(employees) {
  const hiresPerMonth = new Array(12).fill(0)
  employees.forEach(emp => {
    if (emp.hireDate) {
      const date = new Date(emp.hireDate)
      if (!isNaN(date)) {
        const month = date.getMonth()
        hiresPerMonth[month]++
      }
    }
  })
  return hiresPerMonth
}

// تحديث بيانات المخطط
function refreshChart() {
  const employees = getEmployeesFromLocalStorage()
  const monthlyData = countHiresPerMonth(employees)
  chartData.value.datasets[0].data = monthlyData
}

// تحميل بيانات المخطط عند التركيب
onMounted(() => {
  refreshChart()
})
</script>


<style scoped>
div :deep(canvas) {
  height: 250px !important;
}
</style>
