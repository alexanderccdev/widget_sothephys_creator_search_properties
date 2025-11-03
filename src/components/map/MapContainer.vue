<template>
  <div class="bg-white rounded-xl border shadow-sm">
    <div class="px-6 py-4 border-b">
      <div class="font-semibold flex items-center">
        <i class="pi pi-map-marker mr-2"></i>
        Ubicaciones en Recoleta
      </div>
    </div>
    <div class="px-6 py-4">
      <div ref="mapContainer" class="w-full h-[400px] rounded-lg"></div>
      <p class="mt-3 text-sm text-gray-600 text-center">
        {{ totalProperties }} propiedades en zona premium de Recoleta
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import L from 'leaflet'
import { useProperties } from '@/composables/useProperties'
import { MAP_CONFIG } from '@/utils/constants'

// Fix para iconos de Leaflet
import 'leaflet/dist/leaflet.css'
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

const { properties, totalProperties, formattedProperties } = useProperties()

const mapContainer = ref(null)
let map = null
const markers = []

onMounted(() => {
  initMap()
  addMarkers()
})

onUnmounted(() => {
  if (map) {
    map.remove()
  }
})

function initMap() {
  map = L.map(mapContainer.value).setView(
    MAP_CONFIG.defaultCenter,
    MAP_CONFIG.defaultZoom
  )

  L.tileLayer(MAP_CONFIG.tileUrl, {
    attribution: MAP_CONFIG.attribution,
    maxZoom: MAP_CONFIG.maxZoom,
    minZoom: MAP_CONFIG.minZoom
  }).addTo(map)
}

function addMarkers() {
  formattedProperties.value.forEach(property => {
    const marker = L.marker(property.coordinates).addTo(map)
    
    const popupContent = `
      <div class="p-2">
        <h3 class="font-bold text-sm mb-1">${property.address}</h3>
        <p class="text-xs mb-1"><strong>Precio:</strong> ${property.formattedPrice}</p>
        <p class="text-xs mb-1"><strong>Superficie:</strong> ${property.formattedArea}</p>
        <p class="text-xs text-green-600"><strong>${property.formattedPricePerSqm}</strong></p>
      </div>
    `
    
    marker.bindPopup(popupContent)
    markers.push(marker)
  })

  // Ajustar el mapa para mostrar todos los markers
  if (markers.length > 0) {
    const group = L.featureGroup(markers)
    map.fitBounds(group.getBounds().pad(0.1))
  }
}
</script>
