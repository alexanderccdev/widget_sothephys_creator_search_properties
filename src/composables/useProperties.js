import { computed } from 'vue'
import { usePropertyStore } from '@/stores/propertyStore'
import { formatPrice, formatArea, formatPricePerSqm, calculatePricePerSqm } from '@/utils/formatters'

export function useProperties() {
  const propertyStore = usePropertyStore()

  // --- NUEVAS PROPIEDADES EXPUESTAS ---
  const loading = computed(() => propertyStore.loading)
  const error = computed(() => propertyStore.error)
  const fetchProperties = (filters) => propertyStore.fetchProperties(filters)
  // ------------------------------------

  const properties = computed(() => propertyStore.properties)
  
  const formattedProperties = computed(() => {
    return propertyStore.properties.map(prop => ({
      ...prop,
      formattedPrice: formatPrice(prop.price),
      formattedArea: formatArea(prop.area),
      pricePerSqm: calculatePricePerSqm(prop.price, prop.area),
      formattedPricePerSqm: formatPricePerSqm(calculatePricePerSqm(prop.price, prop.area))
    }))
  })

  const totalProperties = computed(() => propertyStore.totalProperties)
  const averagePrice = computed(() => propertyStore.averagePrice)
  const averageArea = computed(() => propertyStore.averageArea)

  const formattedAveragePrice = computed(() => formatPrice(averagePrice.value))
  const formattedAverageArea = computed(() => formatArea(parseFloat(averageArea.value)))

  function selectProperty(property) {
    propertyStore.selectProperty(property)
  }

  function clearSelection() {
    propertyStore.clearSelection()
  }

  return {
    properties,
    formattedProperties,
    totalProperties,
    fetchProperties,
    loading,
    error,
    averagePrice,
    averageArea,
    formattedAveragePrice,
    formattedAverageArea,
    selectProperty,
    clearSelection,
    selectedProperty: computed(() => propertyStore.selectedProperty)
  }
}
