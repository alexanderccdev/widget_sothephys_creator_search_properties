<template>
  <div class="space-y-8">
    <div class="bg-white rounded-xl border shadow-sm p-6">
      <div class="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div class="flex items-center gap-2">
          <i class="pi pi-filter text-blue-600"></i>
          <span class="font-semibold">Filtros</span>
        </div>
        <div class="flex flex-wrap gap-3">
          <select 
            v-model="currentFilters.priceRange" 
            class="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            :disabled="loading"
          >
            <option>Todos los precios</option>
            <option>Hasta USD 400.000</option>
            <option>USD 400.000 - USD 500.000</option>
            <option>Más de USD 500.000</option>
          </select>
          
          <select 
            v-model="currentFilters.sortBy" 
            class="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            :disabled="loading"
          >
            <option>Ordenar por: Relevancia</option>
            <option>Precio: Menor a Mayor</option>
            <option>Precio: Mayor a Menor</option>
            </select>
        </div>
      </div>
    </div>

    <div v-if="loading" class="text-center py-4 text-blue-600">
        <i class="pi pi-spin pi-spinner text-lg mr-2"></i> Cargando propiedades...
    </div>
    <div v-else-if="error" class="text-center py-4 text-red-600 font-bold">
        Error al cargar: {{ error }}
    </div>

    <div v-else class="text-gray-600">
      <span class="font-semibold">{{ totalProperties }}</span> propiedades encontradas
    </div>

    <div v-if="!loading && properties.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <PropertyCard 
        v-for="property in formattedProperties" 
        :key="property.id"
        :property="property"
        @view-details="handleViewDetails(property)"
      />
    </div>

    <div v-else-if="!loading && !error && properties.length === 0" class="text-center py-12">
      <i class="pi pi-home text-6xl text-gray-300 mb-4"></i>
      <p class="text-gray-500">No se encontraron propiedades que coincidan con los filtros.</p>
    </div>

    <PropertyDetailDialog 
      v-model="showDetailDialog"
      :property="selectedProperty"
      @contact="handleContact"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue' // Importar watch y onMounted
import PropertyCard from '@/components/property/PropertyCard.vue'
import PropertyDetailDialog from '@/components/property/PropertyDetailDialog.vue'
import { useProperties } from '@/composables/useProperties'

// 1. Obtener todo lo expuesto por el Composable
const { 
    properties, 
    totalProperties, 
    loading, 
    error,
    fetchProperties, 
    formattedProperties 
} = useProperties()

// 2. Estado local para los filtros de la interfaz
const currentFilters = ref({
    priceRange: 'Todos los precios', // El valor por defecto de tu select
    sortBy: 'Relevancia',
    // Aquí puedes añadir otros filtros de tu interfaz (ej: ambientes, ubicación)
    ambientes: 4 // Valor inicial basado en la imagen de diseño
})

// 3. Variables de Modal
const showDetailDialog = ref(false)
const selectedProperty = ref(null)

// 4. Función de lógica de filtro
function mapFiltersToApiParams() {
    // Mapea los valores del SELECT a los nombres de parámetros que espera tu función Deluge
    let apiFilters = {
        ambientes: 4 // Hardcodeado por ahora, pero debería venir de otro select
    }

    // Lógica para mapear el rango de precios
    const priceMap = {
        'Hasta USD 400.000': { precioMax: 400000 },
        'USD 400.000 - USD 500.000': { precioMin: 400000, precioMax: 500000 },
        'Más de USD 500.000': { precioMin: 500000 },
        'Todos los precios': {}
    }
    
    const mappedPrice = priceMap[currentFilters.value.priceRange] || {};
    
    // Fusionar todos los filtros
    Object.assign(apiFilters, mappedPrice);

    return apiFilters
}

// 5. Función de activación de la búsqueda
function applyFilters() {
    const apiParams = mapFiltersToApiParams()
    // Llama a la acción Pinia con los parámetros listos para el Proxy/Zoho
    fetchProperties(apiParams)
}

// 6. Ejecutar la búsqueda inicial al montar
onMounted(() => {
    applyFilters()
})

// 7. Observar cambios en los filtros para aplicar la búsqueda
watch(currentFilters.value, () => {
    // Si el usuario cambia los selects, se ejecuta una nueva búsqueda
    applyFilters() 
}, { deep: true })


// Funciones de UI
function handleViewDetails(property) {
  // Nota: Usa formattedProperties si deseas que el diálogo muestre los datos ya formateados.
  selectedProperty.value = property 
  showDetailDialog.value = true
}

function handleContact(property) {
  console.log('Contactar por:', property)
}
</script>
