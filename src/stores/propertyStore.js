import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const usePropertyStore = defineStore('property', () => {
  // State
  const properties = ref([
    {
      id: 1,
      address: 'Av. Callao 1300',
      price: 350000,
      area: 151.4,
      rooms: 4,
      bedrooms: 3,
      bathrooms: 2,
      parking: 0,
      coordinates: [-34.5879, -58.3925]
    },
    {
      id: 2,
      address: 'Ayacucho 2100',
      price: 420000,
      area: 137.0,
      rooms: 4,
      bedrooms: 3,
      bathrooms: 2,
      parking: 1,
      coordinates: [-34.5912, -58.3892]
    },
    {
      id: 3,
      address: 'Pereyra Lucena 2500',
      price: 479000,
      area: 134.0,
      rooms: 4,
      bedrooms: 2,
      bathrooms: 2,
      parking: 0,
      coordinates: [-34.5935, -58.3978]
    },
    {
      id: 4,
      address: 'Av. Pueyrredon 1800',
      price: 395000,
      area: 142.0,
      rooms: 4,
      bedrooms: 3,
      bathrooms: 2,
      parking: 1,
      coordinates: [-34.5889, -58.4012]
    },
    {
      id: 5,
      address: 'Austria 2300',
      price: 350000,
      area: 119.0,
      rooms: 4,
      bedrooms: 2,
      bathrooms: 2,
      parking: 0,
      coordinates: [-34.5921, -58.3889]
    },
    {
      id: 6,
      address: 'Paraguay 2100',
      price: 440000,
      area: 128.0,
      rooms: 4,
      bedrooms: 3,
      bathrooms: 2,
      parking: 1,
      coordinates: [-34.5902, -58.3901]
    },
    {
      id: 7,
      address: 'Junín 1300',
      price: 480000,
      area: 150.0,
      rooms: 4,
      bedrooms: 3,
      bathrooms: 3,
      parking: 1,
      coordinates: [-34.5876, -58.3945]
    },
    {
      id: 8,
      address: 'Av. Santa Fe 2500',
      price: 445000,
      area: 141.0,
      rooms: 4,
      bedrooms: 3,
      bathrooms: 2,
      parking: 0,
      coordinates: [-34.5902, -58.3912]
    },
    {
      id: 9,
      address: 'Riobamba 1200',
      price: 390000,
      area: 138.0,
      rooms: 4,
      bedrooms: 2,
      bathrooms: 2,
      parking: 1,
      coordinates: [-34.5868, -58.3956]
    },
    {
      id: 10,
      address: 'Larrea 1100',
      price: 420000,
      area: 154.0,
      rooms: 4,
      bedrooms: 3,
      bathrooms: 2,
      parking: 1,
      coordinates: [-34.5859, -58.3967]
    },
    {
      id: 11,
      address: 'Montevideo 1500',
      price: 375000,
      area: 143.0,
      rooms: 4,
      bedrooms: 3,
      bathrooms: 2,
      parking: 0,
      coordinates: [-34.5881, -58.3989]
    },
    {
      id: 12,
      address: 'Av. Pueyrredon 1700',
      price: 350000,
      area: 130.0,
      rooms: 4,
      bedrooms: 2,
      bathrooms: 2,
      parking: 0,
      coordinates: [-34.5884, -58.4015]
    },
    {
      id: 13,
      address: 'Agüero 1600',
      price: 420000,
      area: 155.0,
      rooms: 4,
      bedrooms: 3,
      bathrooms: 2,
      parking: 1,
      coordinates: [-34.5883, -58.3934]
    }
  ])

  const selectedProperty = ref(null)
  const loading = ref(false)
  const error = ref(null)

  // Getters
  const totalProperties = computed(() => properties.value.length)
  
  const averagePrice = computed(() => {
    if (properties.value.length === 0) return 0
    const total = properties.value.reduce((sum, prop) => sum + prop.price, 0)
    return Math.round(total / properties.value.length)
  })

  const averageArea = computed(() => {
    if (properties.value.length === 0) return 0
    const total = properties.value.reduce((sum, prop) => sum + prop.area, 0)
    return (total / properties.value.length).toFixed(1)
  })

  const propertiesByPrice = computed(() => {
    return [...properties.value].sort((a, b) => a.price - b.price)
  })

  const propertiesWithPricePerSqm = computed(() => {
    return properties.value.map(prop => ({
      ...prop,
      pricePerSqm: Math.round(prop.price / prop.area)
    }))
  })

  // Actions
  function selectProperty(property) {
    selectedProperty.value = property
  }

  function clearSelection() {
    selectedProperty.value = null
  }

  return {
    // State
    properties,
    selectedProperty,
    loading,
    error,
    // Getters
    totalProperties,
    averagePrice,
    averageArea,
    propertiesByPrice,
    propertiesWithPricePerSqm,
    // Actions
    selectProperty,
    clearSelection
  }
})
