<template>
  <div class="bg-white rounded-xl border shadow-sm p-6">
    <h3 class="font-semibold text-lg mb-4">{{ title }}</h3>
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import Chart from 'chart.js/auto'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  data: {
    type: Object,
    required: true
  },
  type: {
    type: String,
    default: 'bar'
  }
})

const chartCanvas = ref(null)
let chartInstance = null

onMounted(() => {
  createChart()
})

watch(() => props.data, () => {
  updateChart()
}, { deep: true })

function createChart() {
  if (!chartCanvas.value) return

  const ctx = chartCanvas.value.getContext('2d')
  
  chartInstance = new Chart(ctx, {
    type: props.type,
    data: props.data,
    options: {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 2,
      plugins: {
        legend: {
          display: props.type === 'pie' || props.type === 'doughnut',
          position: 'bottom'
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          padding: 12,
          titleFont: {
            size: 14
          },
          bodyFont: {
            size: 13
          }
        }
      },
      scales: props.type !== 'pie' && props.type !== 'doughnut' ? {
        y: {
          beginAtZero: true,
          ticks: {
            precision: 0
          }
        }
      } : undefined
    }
  })
}

function updateChart() {
  if (chartInstance) {
    chartInstance.data = props.data
    chartInstance.update()
  }
}
</script>
