<template>
  <div class="bg-white rounded-xl border shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden">
    <!-- Imagen/Placeholder -->
    <div class="relative h-48 overflow-hidden">
      <div class="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
        <div class="text-center">
          <i class="pi pi-home text-6xl text-blue-400 mb-2"></i>
          <p class="text-blue-600 font-medium text-sm px-2">
            {{ property.address }}
          </p>
        </div>
      </div>
    </div>

    <!-- Header -->
    <div class="px-6 pt-6 pb-3">
      <div class="text-lg font-semibold text-gray-800 flex items-center">
        <i class="pi pi-map-marker text-blue-600 mr-2"></i>
        {{ property.address }}
      </div>
    </div>

    <!-- Content -->
    <div class="px-6 pb-6 space-y-4">
      <!-- Precio y Superficie -->
      <div class="grid grid-cols-2 gap-4">
        <div class="text-center p-3 bg-blue-50 rounded-lg">
          <div class="text-2xl font-bold text-blue-600">
            {{ formattedPrice }}
          </div>
          <div class="text-xs text-gray-500">Precio</div>
        </div>
        <div class="text-center p-3 bg-green-50 rounded-lg">
          <div class="text-lg font-semibold text-green-600">
            {{ formattedArea }}
          </div>
          <div class="text-xs text-gray-500">Superficie</div>
        </div>
      </div>

      <!-- Precio por m² -->
      <div class="text-center p-2 bg-gray-50 rounded-lg">
        <div class="text-sm font-medium text-gray-700">
          {{ formattedPricePerSqm }}
        </div>
      </div>

      <!-- Características -->
      <div class="grid grid-cols-4 gap-2 text-center">
        <div class="flex flex-col items-center">
          <i class="pi pi-home text-gray-500 text-xl mb-1"></i>
          <span class="text-sm font-medium">{{ property.rooms || 4 }}</span>
          <span class="text-xs text-gray-500">Amb.</span>
        </div>
        <div class="flex flex-col items-center">
          <i class="pi pi-sun text-gray-500 text-xl mb-1"></i>
          <span class="text-sm font-medium">{{ property.bedrooms || 3 }}</span>
          <span class="text-xs text-gray-500">Dorm.</span>
        </div>
        <div class="flex flex-col items-center">
          <i class="pi pi-box text-gray-500 text-xl mb-1"></i>
          <span class="text-sm font-medium">{{ property.bathrooms || 2 }}</span>
          <span class="text-xs text-gray-500">Baños</span>
        </div>
        <div class="flex flex-col items-center">
          <i class="pi pi-car text-gray-500 text-xl mb-1"></i>
          <span class="text-sm font-medium">{{ property.parking || 0 }}</span>
          <span class="text-xs text-gray-500">Coch.</span>
        </div>
      </div>

      <!-- Botón Ver Detalles -->
      <button
        @click="handleViewDetails"
        class="w-full bg-blue-600 text-white hover:bg-blue-700 rounded-lg px-4 py-2 flex items-center justify-center transition-colors"
      >
        <i class="pi pi-external-link mr-2"></i>
        Ver Detalles
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { formatPrice, formatArea, formatPricePerSqm, calculatePricePerSqm } from '@/utils/formatters'

const props = defineProps({
  property: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['view-details'])

const formattedPrice = computed(() => formatPrice(props.property.price))
const formattedArea = computed(() => formatArea(props.property.area))
const formattedPricePerSqm = computed(() => 
  formatPricePerSqm(calculatePricePerSqm(props.property.price, props.property.area))
)

function handleViewDetails() {
  emit('view-details', props.property)
}
</script>
