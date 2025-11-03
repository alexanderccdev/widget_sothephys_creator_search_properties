<template>
  <div class="space-y-8">
    <!-- Filtros de búsqueda -->
    <div class="bg-white rounded-xl border shadow-sm p-6">
      <div class="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div class="flex items-center gap-2">
          <i class="pi pi-filter text-blue-600"></i>
          <span class="font-semibold">Filtros</span>
        </div>
        <div class="flex flex-wrap gap-3">
          <select class="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Todos los precios</option>
            <option>Hasta USD 400.000</option>
            <option>USD 400.000 - USD 500.000</option>
            <option>Más de USD 500.000</option>
          </select>
          <select class="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Ordenar por: Relevancia</option>
            <option>Precio: Menor a Mayor</option>
            <option>Precio: Mayor a Menor</option>
            <option>Superficie: Menor a Mayor</option>
            <option>Superficie: Mayor a Menor</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Contador de resultados -->
    <div class="text-gray-600">
      <span class="font-semibold">{{ totalProperties }}</span> propiedades encontradas
    </div>

    <!-- Grid de propiedades -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <PropertyCard 
        v-for="property in properties" 
        :key="property.id"
        :property="property"
        @view-details="handleViewDetails"
      />
    </div>

    <!-- Mensaje si no hay propiedades -->
    <div v-if="properties.length === 0" class="text-center py-12">
      <i class="pi pi-home text-6xl text-gray-300 mb-4"></i>
      <p class="text-gray-500">No se encontraron propiedades</p>
    </div>

    <!-- Modal de detalles -->
    <PropertyDetailDialog 
      v-model="showDetailDialog"
      :property="selectedProperty"
      @contact="handleContact"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import PropertyCard from '@/components/property/PropertyCard.vue'
import PropertyDetailDialog from '@/components/property/PropertyDetailDialog.vue'
import { useProperties } from '@/composables/useProperties'

const { properties, totalProperties } = useProperties()

const showDetailDialog = ref(false)
const selectedProperty = ref(null)

function handleViewDetails(property) {
  selectedProperty.value = property
  showDetailDialog.value = true
}

function handleContact(property) {
  console.log('Contactar por:', property)
}
</script>
