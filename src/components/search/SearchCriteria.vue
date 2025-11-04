<template>
  <div class="bg-blue-50 border-blue-200 rounded-xl border py-6 shadow-sm">
    <div class="px-6 mb-4">
      <div class="flex items-center text-blue-800 font-semibold">
        <i class="pi pi-search mr-2"></i>
        Criterios de Búsqueda
      </div>
    </div>
    <div class="px-6 space-y-6">
      <!-- Información estática -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div class="flex items-center">
          <i class="pi pi-map-marker text-blue-600 mr-2"></i>
          <span><strong>Ubicación:</strong> {{ SEARCH_CRITERIA.location }}</span>
        </div>
        <div class="flex items-center">
          <i class="pi pi-map-marker text-blue-600 mr-2"></i>
          <span><strong>Zona:</strong> {{ SEARCH_CRITERIA.zone }}</span>
        </div>
        <div class="flex items-center col-span-full">
          <i class="pi pi-filter text-blue-600 mr-2"></i>
          <span><strong>Características:</strong> {{ SEARCH_CRITERIA.features }}</span>
        </div>
      </div>

      <!-- Filtros configurables -->
      <div class="border-t border-blue-200 pt-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Filtro de Ambientes -->
          <div class="space-y-2">
            <label class="flex items-center text-sm font-semibold text-blue-800">
              <i class="pi pi-filter text-blue-600 mr-2"></i>
              Ambientes:
            </label>
            <InputNumber
              v-model="filters.rooms"
              :min="1"
              :max="10"
              showButtons
              buttonLayout="horizontal"
              :step="1"
              class="w-full"
              @update:modelValue="applyFilters"
            >
              <template #incrementbuttonicon>
                <span class="pi pi-plus" />
              </template>
              <template #decrementbuttonicon>
                <span class="pi pi-minus" />
              </template>
            </InputNumber>
          </div>

          <!-- Filtro de Presupuesto con Slider -->
          <div class="space-y-2">
            <label class="flex items-center justify-between text-sm font-semibold text-blue-800">
              <span class="flex items-center">
                <i class="pi pi-filter text-blue-600 mr-2"></i>
                Presupuesto:
              </span>
              <span class="text-blue-600 font-normal">{{ formatPrice(filters.budget) }}</span>
            </label>
            <Slider
              v-model="filters.budget"
              :min="100000"
              :max="1000000"
              :step="50000"
              class="w-full"
              @change="applyFilters"
            />
            <div class="flex justify-between text-xs text-gray-600">
              <span>{{ formatPrice(100000) }}</span>
              <span>{{ formatPrice(1000000) }}</span>
            </div>
          </div>
        </div>

        <!-- Botón para aplicar filtros -->
        <div class="mt-4 flex justify-end">
          <button
            @click="applyFilters"
            class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            :disabled="loading"
          >
            <i class="pi pi-search"></i>
            <span>{{ loading ? 'Buscando...' : 'Buscar Propiedades' }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { SEARCH_CRITERIA } from '@/utils/constants'
import { formatPrice } from '@/utils/formatters'
import { useProperties } from '@/composables/useProperties'
import InputNumber from 'primevue/inputnumber'
import Slider from 'primevue/slider'

// Composable para manejar propiedades
const { fetchProperties, loading } = useProperties()

// Estado local de los filtros
const filters = ref({
  rooms: SEARCH_CRITERIA.rooms,
  budget: SEARCH_CRITERIA.budget
})

// Función para aplicar filtros
function applyFilters() {
  const apiFilters = {
    ambientes: filters.value.rooms,
    precioMax: filters.value.budget
  }
  fetchProperties(apiFilters)
}

// Aplicar filtros iniciales al montar el componente
applyFilters()
</script>
