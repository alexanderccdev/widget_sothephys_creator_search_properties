<template>
  <div class="space-y-8">
    <!-- Tarjetas de estadísticas principales -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- Total Propiedades -->
      <div class="bg-white rounded-xl border shadow-sm p-6">
        <div class="text-sm font-medium text-gray-600 mb-2">
          Total Propiedades
        </div>
        <div class="text-3xl font-bold text-blue-600">
          {{ totalProperties }}
        </div>
        <div class="text-xs text-gray-500 mt-2">
          <i class="pi pi-building mr-1"></i>
          Departamentos en Recoleta
        </div>
      </div>

      <!-- Precio Promedio -->
      <div class="bg-white rounded-xl border shadow-sm p-6">
        <div class="text-sm font-medium text-gray-600 mb-2">
          Precio Promedio
        </div>
        <div class="text-3xl font-bold text-green-600">
          {{ formattedAveragePrice }}
        </div>
        <div class="text-xs text-gray-500 mt-2">
          <i class="pi pi-arrow-up mr-1"></i>
          Rango: {{ formattedMinPrice }} - {{ formattedMaxPrice }}
        </div>
      </div>

      <!-- Superficie Promedio -->
      <div class="bg-white rounded-xl border shadow-sm p-6">
        <div class="text-sm font-medium text-gray-600 mb-2">
          Superficie Promedio
        </div>
        <div class="text-3xl font-bold text-purple-600">
          {{ formattedAverageArea }}
        </div>
        <div class="text-xs text-gray-500 mt-2">
          <i class="pi pi-chart-line mr-1"></i>
          Rango: {{ minArea.toFixed(1) }} - {{ maxArea.toFixed(1) }} m²
        </div>
      </div>

      <!-- USD/m² Promedio -->
      <div class="bg-white rounded-xl border shadow-sm p-6">
        <div class="text-sm font-medium text-gray-600 mb-2">
          USD/m² Promedio
        </div>
        <div class="text-3xl font-bold text-orange-600">
          {{ formattedAveragePricePerSqm }}
        </div>
        <div class="text-xs text-gray-500 mt-2">
          <i class="pi pi-calculator mr-1"></i>
          Calculado sobre {{ totalProperties }} propiedades
        </div>
      </div>
    </div>

    <!-- Gráficos principales -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Distribución por Rango de Precios -->
      <ChartComponent 
        title="Distribución por Rango de Precios"
        :data="priceChartData"
        type="bar"
      />

      <!-- Distribución por Superficie -->
      <ChartComponent 
        title="Distribución por Superficie"
        :data="areaChartData"
        type="bar"
      />
    </div>

    <!-- Gráficos secundarios -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Top 5 Propiedades Más Económicas -->
      <div class="bg-white rounded-xl border shadow-sm p-6">
        <h3 class="font-semibold text-lg mb-4 flex items-center">
          <i class="pi pi-star text-yellow-500 mr-2"></i>
          Top 5 Más Económicas
        </h3>
        <div class="space-y-3">
          <div 
            v-for="(property, index) in topCheapest" 
            :key="index"
            class="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
                {{ index + 1 }}
              </div>
              <div>
                <div class="font-medium text-gray-800">{{ property.address }}</div>
                <div class="text-xs text-gray-500">
                  {{ formatPricePerSqm(property.pricePerSqm) }}
                </div>
              </div>
            </div>
            <div class="text-right">
              <div class="font-semibold text-green-600">{{ formatPrice(property.price) }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Distribución por Dormitorios y Cocheras -->
      <div class="bg-white rounded-xl border shadow-sm p-6">
        <h3 class="font-semibold text-lg mb-4">Características</h3>
        
        <!-- Dormitorios -->
        <div class="mb-6">
          <div class="text-sm font-medium text-gray-600 mb-3">
            Distribución por Dormitorios
          </div>
          <div class="space-y-2">
            <div 
              v-for="item in bedroomsDistribution" 
              :key="item.bedrooms"
              class="flex items-center justify-between"
            >
              <span class="text-sm text-gray-700">{{ item.bedrooms }} dormitorios</span>
              <div class="flex items-center gap-2">
                <div class="w-32 bg-gray-200 rounded-full h-2">
                  <div 
                    class="bg-blue-600 h-2 rounded-full transition-all"
                    :style="{ width: `${(item.count / totalProperties) * 100}%` }"
                  ></div>
                </div>
                <span class="text-sm font-medium text-gray-800 w-8 text-right">
                  {{ item.count }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Cocheras -->
        <div>
          <div class="text-sm font-medium text-gray-600 mb-3">
            Disponibilidad de Cocheras
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="text-center p-4 bg-green-50 rounded-lg">
              <div class="text-2xl font-bold text-green-600">
                {{ parkingDistribution.withParking }}
              </div>
              <div class="text-xs text-gray-600 mt-1">Con cochera</div>
              <div class="text-xs text-green-600 font-medium mt-1">
                {{ parkingDistribution.percentage }}%
              </div>
            </div>
            <div class="text-center p-4 bg-gray-50 rounded-lg">
              <div class="text-2xl font-bold text-gray-600">
                {{ parkingDistribution.withoutParking }}
              </div>
              <div class="text-xs text-gray-600 mt-1">Sin cochera</div>
              <div class="text-xs text-gray-600 font-medium mt-1">
                {{ 100 - parkingDistribution.percentage }}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Tabla de Comparación de Precios -->
    <div class="bg-white rounded-xl border shadow-sm p-6">
      <h3 class="font-semibold text-lg mb-4 flex items-center">
        <i class="pi pi-chart-bar text-blue-600 mr-2"></i>
        Análisis Comparativo de Precios
      </h3>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="bg-gray-50 border-b">
            <tr>
              <th class="text-left py-3 px-4 font-medium text-gray-700">Métrica</th>
              <th class="text-right py-3 px-4 font-medium text-gray-700">Valor</th>
              <th class="text-left py-3 px-4 font-medium text-gray-700">Descripción</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b hover:bg-gray-50">
              <td class="py-3 px-4 font-medium">Precio Mínimo</td>
              <td class="py-3 px-4 text-right text-green-600 font-semibold">
                {{ formattedMinPrice }}
              </td>
              <td class="py-3 px-4 text-gray-600">Propiedad más económica</td>
            </tr>
            <tr class="border-b hover:bg-gray-50">
              <td class="py-3 px-4 font-medium">Precio Promedio</td>
              <td class="py-3 px-4 text-right text-blue-600 font-semibold">
                {{ formattedAveragePrice }}
              </td>
              <td class="py-3 px-4 text-gray-600">Media de todas las propiedades</td>
            </tr>
            <tr class="border-b hover:bg-gray-50">
              <td class="py-3 px-4 font-medium">Precio Máximo</td>
              <td class="py-3 px-4 text-right text-red-600 font-semibold">
                {{ formattedMaxPrice }}
              </td>
              <td class="py-3 px-4 text-gray-600">Propiedad más costosa</td>
            </tr>
            <tr class="hover:bg-gray-50">
              <td class="py-3 px-4 font-medium">Diferencia</td>
              <td class="py-3 px-4 text-right text-orange-600 font-semibold">
                {{ formatPrice(maxPrice - minPrice) }}
              </td>
              <td class="py-3 px-4 text-gray-600">Rango de precios total</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import ChartComponent from '@/components/statistics/ChartComponent.vue'
import { useStatistics } from '@/composables/useStatistics'
import { formatPrice, formatPricePerSqm } from '@/utils/formatters'

const {
  totalProperties,
  averagePrice,
  averageArea,
  averagePricePerSqm,
  minPrice,
  maxPrice,
  minArea,
  maxArea,
  priceDistribution,
  areaDistribution,
  bedroomsDistribution,
  parkingDistribution,
  propertiesByPrice,
  formattedAveragePrice,
  formattedAverageArea,
  formattedAveragePricePerSqm,
  formattedMinPrice,
  formattedMaxPrice
} = useStatistics()

// Top 5 propiedades más baratas
const topCheapest = computed(() => propertiesByPrice.value.slice(0, 5))

// Datos para gráfico de precios
const priceChartData = computed(() => ({
  labels: priceDistribution.value.map(d => d.label),
  datasets: [{
    label: 'Cantidad de Propiedades',
    data: priceDistribution.value.map(d => d.count),
    backgroundColor: priceDistribution.value.map(d => d.color),
    borderColor: priceDistribution.value.map(d => d.color),
    borderWidth: 1
  }]
}))

// Datos para gráfico de superficie
const areaChartData = computed(() => ({
  labels: areaDistribution.value.map(d => d.label),
  datasets: [{
    label: 'Cantidad de Propiedades',
    data: areaDistribution.value.map(d => d.count),
    backgroundColor: '#8b5cf6',
    borderColor: '#7c3aed',
    borderWidth: 1
  }]
}))
</script>
