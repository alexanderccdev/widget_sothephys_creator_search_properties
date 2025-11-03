<template>
  <div class="min-h-screen bg-gray-50">
    <AppHeader />
    
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <NavigationTabs />
      <router-view />
    </main>

    <footer class="bg-white border-t mt-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="text-center text-gray-600">
          <p>
            © 2024 Dashboard Inmobiliario Premium. Herramienta dinámica para presentación de propiedades.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import AppHeader from '@/components/common/AppHeader.vue'
import NavigationTabs from '@/components/common/NavigationTabs.vue'
</script>
