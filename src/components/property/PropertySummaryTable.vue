<template>
  <div class="bg-white rounded-xl border shadow-sm">
    <div class="px-6 py-4 border-b">
      <div class="font-semibold flex items-center mb-2">
        <i class="pi pi-table mr-2"></i>
        Resumen de Propiedades
      </div>
      <p class="text-sm text-gray-600">
        Haz clic en cualquier dirección para ver los detalles completos
      </p>
    </div>
    <div class="px-6 py-4">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="border-b">
            <tr>
              <th class="text-left py-2 px-2 font-medium min-w-[200px]">Dirección</th>
              <th class="text-right py-2 px-2 font-medium">Precio</th>
              <th class="text-right py-2 px-2 font-medium">Superficie Cubierta</th>
              <th class="text-right py-2 px-2 font-medium">Precio Unitario</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="property in formattedProperties"
              :key="property.id"
              class="border-b hover:bg-gray-50 transition-colors cursor-pointer"
              @click="handleSelectProperty(property)"
            >
              <td class="py-2 px-2">
                <button class="flex items-center text-left hover:text-blue-600 hover:underline w-full">
                  <i class="pi pi-map-marker text-gray-400 mr-2"></i>
                  <span class="font-medium">{{ property.address }}</span>
                </button>
              </td>
              <td class="py-2 px-2 text-right font-semibold">
                {{ property.formattedPrice }}
              </td>
              <td class="py-2 px-2 text-right">
                {{ property.formattedArea }}
              </td>
              <td class="py-2 px-2 text-right font-medium text-green-600">
                {{ property.formattedPricePerSqm }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useProperties } from '@/composables/useProperties'

const { formattedProperties, selectProperty } = useProperties()

function handleSelectProperty(property) {
  selectProperty(property)
  // Aquí podrías abrir un modal o navegar a una vista de detalle
  console.log('Propiedad seleccionada:', property)
}
</script>
