<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div class="bg-white rounded-xl border shadow-sm p-6 text-center">
      <div class="text-2xl font-bold text-blue-600">{{ totalProperties }}</div>
      <div class="text-sm text-gray-600">Propiedades</div>
    </div>
    
    <div class="bg-white rounded-xl border shadow-sm p-6 text-center">
      <div class="text-2xl font-bold text-green-600">{{ formattedAveragePrice }}</div>
      <div class="text-sm text-gray-600">Precio Promedio</div>
    </div>
    
    <div class="bg-white rounded-xl border shadow-sm p-6 text-center">
      <div class="text-2xl font-bold text-purple-600">{{ formattedAverageArea }}</div>
      <div class="text-sm text-gray-600">Superficie Promedio</div>
    </div>
  </div>
</template>

<script setup>
import { useProperties } from '@/composables/useProperties'

const { 
  totalProperties, 
  formattedAveragePrice, 
  formattedAverageArea 
} = useProperties()
</script>
