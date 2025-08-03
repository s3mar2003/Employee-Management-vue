<template>
  <div>
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
  PointElement
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement)

const chartData = ref({
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [{
    label: 'New Employees',
    data: [3, 5, 2, 8, 6, 4, 7, 3, 5, 2, 6, 4],  // بيانات ثابتة للتجربة
    fill: true,
    backgroundColor: 'rgba(99, 102, 241, 0.2)',
    borderColor: 'rgba(99, 102, 241, 1)',
    tension: 0.4,
    pointRadius: 4,
    pointHoverRadius: 6
  }]
})

const chartOptions = ref({
  responsive: true,
  plugins: {
    legend: { position: 'top' },
    title: { display: true, text: 'Monthly Hiring Overview' }
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: { stepSize: 1 }
    }
  }
})



</script>
