<template>
  <div class="space-y-8">
    <!-- Criterios de Búsqueda -->
    <SearchCriteria />

    <!-- Grid Principal: Tabla y Mapa -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Tabla de Propiedades (2 columnas) -->
      <div class="lg:col-span-2">
        <PropertySummaryTable />
      </div>

      <!-- Mapa (1 columna) -->
      <div class="lg:col-span-1">
        <MapContainer />
      </div>
    </div>

    <!-- Tarjetas de Estadísticas -->
    <StatsCard />
  </div>
</template>

<script setup>
import SearchCriteria from '@/components/search/SearchCriteria.vue'
import PropertySummaryTable from '@/components/property/PropertySummaryTable.vue'
import MapContainer from '@/components/map/MapContainer.vue'
import StatsCard from '@/components/statistics/StatsCard.vue'
</script>
