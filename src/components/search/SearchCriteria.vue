<template>
  <div class="bg-blue-50 border-blue-200 rounded-xl border py-6 shadow-sm">
    <div class="px-6 mb-4">
      <div class="flex items-center text-blue-800 font-semibold">
        <i class="pi pi-search mr-2"></i>
        Criterios de Búsqueda
      </div>
    </div>
    <div class="px-6">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
        <div class="flex items-center">
          <i class="pi pi-map-marker text-blue-600 mr-2"></i>
          <span><strong>Ubicación:</strong> {{ criteria.location }}</span>
        </div>
        <div class="flex items-center">
          <i class="pi pi-map-marker text-blue-600 mr-2"></i>
          <span><strong>Zona:</strong> {{ criteria.zone }}</span>
        </div>
        <div class="flex items-center">
          <i class="pi pi-filter text-blue-600 mr-2"></i>
          <span><strong>Ambientes:</strong> {{ criteria.rooms }} ambientes</span>
        </div>
        <div class="flex items-center">
          <i class="pi pi-filter text-blue-600 mr-2"></i>
          <span><strong>Presupuesto:</strong> hasta {{ formatPrice(criteria.budget) }}</span>
        </div>
        <div class="flex items-center col-span-full">
          <i class="pi pi-filter text-blue-600 mr-2"></i>
          <span><strong>Características:</strong> {{ criteria.features }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { SEARCH_CRITERIA } from '@/utils/constants'
import { formatPrice } from '@/utils/formatters'

const criteria = SEARCH_CRITERIA
</script>
