<template>
  <div class="flex justify-center mb-8">
    <div class="flex bg-white rounded-lg shadow-sm border p-1">
      <router-link
        v-for="tab in tabs"
        :key="tab.path"
        :to="tab.path"
        class="flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all h-8 rounded-md gap-1.5 px-3"
        :class="isActive(tab.path) ? activeClass : inactiveClass"
      >
        <i :class="tab.icon" class="mr-2"></i>
        {{ tab.label }}
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { ROUTES } from '@/utils/constants'

const route = useRoute()

const tabs = [
  {
    label: 'Página Principal',
    path: ROUTES.HOME,
    icon: 'pi pi-home'
  },
  {
    label: 'Listado de Propiedades',
    path: ROUTES.PROPERTIES,
    icon: 'pi pi-th-large'
  },
  {
    label: 'Tabla Completa',
    path: ROUTES.TABLE,
    icon: 'pi pi-table'
  },
  {
    label: 'Estadísticas',
    path: ROUTES.STATISTICS,
    icon: 'pi pi-chart-bar'
  },
  {
    label: 'Proceso de Compra',
    path: ROUTES.PURCHASE,
    icon: 'pi pi-building'
  }
]

const activeClass = 'bg-blue-600 text-white shadow-xs hover:bg-blue-700'
const inactiveClass = 'hover:bg-gray-100 text-gray-700'

function isActive(path) {
  return route.path === path
}
</script>
