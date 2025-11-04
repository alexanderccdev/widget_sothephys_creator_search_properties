<template>
  <header class="bg-white shadow-sm border-b">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center py-6">
        <div class="flex items-center">
          <img :src="logo" alt="Sothepys" class="h-12 w-auto mr-6" />
          <div>
            <h1 class="text-2xl font-bold text-gray-900">
              {{ title }}
            </h1>
            <p class="text-gray-600">
              {{ subtitle }}
            </p>
          </div>
        </div>
        <div class="flex items-center space-x-2">
          <span class="inline-flex items-center justify-center rounded-md border px-2 py-0.5 font-medium text-sm">
            {{ propertyCount }} de {{ totalProperties }} propiedades
          </span>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { APP_NAME, APP_SUBTITLE } from '@/utils/constants'
import { useProperties } from '@/composables/useProperties'
import logo from '@/assets/logo.jpeg'

const { totalProperties } = useProperties()

defineProps({
  title: {
    type: String,
    default: APP_NAME
  },
  subtitle: {
    type: String,
    default: APP_SUBTITLE
  },
  propertyCount: {
    type: Number,
    default: 12
  }
})
</script>
