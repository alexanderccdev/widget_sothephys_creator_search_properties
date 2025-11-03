<template>
  <Dialog 
    v-model:visible="visible" 
    modal 
    header="Detalles de la Propiedad"
    :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <div v-if="property" class="space-y-6">
      <!-- Header con dirección -->
      <div class="border-b pb-4">
        <div class="flex items-center text-xl font-bold text-gray-800 mb-2">
          <i class="pi pi-map-marker text-blue-600 mr-2"></i>
          {{ property.address }}
        </div>
        <div class="text-gray-500">Recoleta, Buenos Aires</div>
      </div>

      <!-- Imagen placeholder -->
      <div class="w-full h-64 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
        <div class="text-center">
          <i class="pi pi-home text-8xl text-blue-400 mb-4"></i>
          <p class="text-blue-600 font-medium">Imagen de referencia</p>
        </div>
      </div>

      <!-- Información principal -->
      <div class="grid grid-cols-3 gap-4">
        <div class="text-center p-4 bg-blue-50 rounded-lg">
          <div class="text-3xl font-bold text-blue-600">
            {{ formatPrice(property.price) }}
          </div>
          <div class="text-sm text-gray-500 mt-1">Precio Total</div>
        </div>
        <div class="text-center p-4 bg-green-50 rounded-lg">
          <div class="text-2xl font-bold text-green-600">
            {{ formatArea(property.area) }}
          </div>
          <div class="text-sm text-gray-500 mt-1">Superficie</div>
        </div>
        <div class="text-center p-4 bg-purple-50 rounded-lg">
          <div class="text-xl font-bold text-purple-600">
            {{ formatPricePerSqm(calculatePricePerSqm(property.price, property.area)) }}
          </div>
          <div class="text-sm text-gray-500 mt-1">Precio por m²</div>
        </div>
      </div>

      <!-- Características -->
      <div>
        <h3 class="font-semibold text-gray-800 mb-3">Características</h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
            <i class="pi pi-home text-blue-600 text-xl"></i>
            <div>
              <div class="font-semibold">{{ property.rooms || 4 }}</div>
              <div class="text-xs text-gray-500">Ambientes</div>
            </div>
          </div>
          <div class="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
            <i class="pi pi-sun text-blue-600 text-xl"></i>
            <div>
              <div class="font-semibold">{{ property.bedrooms || 3 }}</div>
              <div class="text-xs text-gray-500">Dormitorios</div>
            </div>
          </div>
          <div class="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
            <i class="pi pi-box text-blue-600 text-xl"></i>
            <div>
              <div class="font-semibold">{{ property.bathrooms || 2 }}</div>
              <div class="text-xs text-gray-500">Baños</div>
            </div>
          </div>
          <div class="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
            <i class="pi pi-car text-blue-600 text-xl"></i>
            <div>
              <div class="font-semibold">{{ property.parking || 0 }}</div>
              <div class="text-xs text-gray-500">Cocheras</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Descripción -->
      <div>
        <h3 class="font-semibold text-gray-800 mb-3">Descripción</h3>
        <p class="text-gray-600 leading-relaxed">
          Excelente departamento de {{ property.rooms }} ambientes en la zona premium de Recoleta. 
          Cuenta con {{ property.bedrooms }} dormitorios, {{ property.bathrooms }} baños completos
          {{ property.parking > 0 ? ` y ${property.parking} cochera(s)` : '' }}.
          Ubicación estratégica con fácil acceso a transporte público y todos los servicios.
        </p>
      </div>

      <!-- Ubicación -->
      <div>
        <h3 class="font-semibold text-gray-800 mb-3">Ubicación</h3>
        <div class="bg-gray-100 rounded-lg p-4 flex items-start gap-3">
          <i class="pi pi-map-marker text-blue-600 text-xl mt-1"></i>
          <div>
            <div class="font-medium">{{ property.address }}</div>
            <div class="text-sm text-gray-500">Recoleta, Ciudad Autónoma de Buenos Aires</div>
            <div class="text-sm text-gray-500 mt-1">
              Coordenadas: {{ property.coordinates[0].toFixed(4) }}, {{ property.coordinates[1].toFixed(4) }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <template #footer>
      <div class="flex gap-3 justify-end">
        <Button label="Cerrar" severity="secondary" @click="closeDialog" />
        <Button label="Contactar" icon="pi pi-phone" @click="handleContact" />
      </div>
    </template>
  </Dialog>
</template>

<script setup>
import { ref, watch } from 'vue'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import { formatPrice, formatArea, formatPricePerSqm, calculatePricePerSqm } from '@/utils/formatters'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  property: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['update:modelValue', 'contact'])

const visible = ref(props.modelValue)

watch(() => props.modelValue, (newVal) => {
  visible.value = newVal
})

watch(visible, (newVal) => {
  emit('update:modelValue', newVal)
})

function closeDialog() {
  visible.value = false
}

function handleContact() {
  emit('contact', props.property)
  alert(`Contactar por la propiedad: ${props.property.address}`)
}
</script>
