import { computed } from 'vue'
import { usePropertyStore } from '@/stores/propertyStore'
import { formatPrice, formatArea, formatPricePerSqm, calculatePricePerSqm } from '@/utils/formatters'

export function useStatistics() {
  const propertyStore = usePropertyStore()

  // Estadísticas básicas
  const totalProperties = computed(() => propertyStore.totalProperties)
  const averagePrice = computed(() => propertyStore.averagePrice)
  const averageArea = computed(() => parseFloat(propertyStore.averageArea))

  // Precio por m² promedio
  const averagePricePerSqm = computed(() => {
    if (averageArea.value === 0) return 0
    return Math.round(averagePrice.value / averageArea.value)
  })

  // Precios mínimo y máximo
  const minPrice = computed(() => {
    if (propertyStore.properties.length === 0) return 0
    return Math.min(...propertyStore.properties.map(p => p.price))
  })

  const maxPrice = computed(() => {
    if (propertyStore.properties.length === 0) return 0
    return Math.max(...propertyStore.properties.map(p => p.price))
  })

  // Superficies mínima y máxima
  const minArea = computed(() => {
    if (propertyStore.properties.length === 0) return 0
    return Math.min(...propertyStore.properties.map(p => p.area))
  })

  const maxArea = computed(() => {
    if (propertyStore.properties.length === 0) return 0
    return Math.max(...propertyStore.properties.map(p => p.area))
  })

  // Distribución por rangos de precio
  const priceDistribution = computed(() => {
    const ranges = [
      { label: '< $380K', min: 0, max: 379999, count: 0, color: '#10b981' },
      { label: '$380K-$430K', min: 380000, max: 429999, count: 0, color: '#3b82f6' },
      { label: '$430K-$480K', min: 430000, max: 479999, count: 0, color: '#f59e0b' },
      { label: '> $480K', min: 480000, max: Infinity, count: 0, color: '#ef4444' }
    ]

    propertyStore.properties.forEach(prop => {
      const range = ranges.find(r => prop.price >= r.min && prop.price <= r.max)
      if (range) range.count++
    })

    return ranges
  })

  // Distribución por superficie
  const areaDistribution = computed(() => {
    const ranges = [
      { label: '< 130m²', min: 0, max: 129.9, count: 0 },
      { label: '130-140m²', min: 130, max: 139.9, count: 0 },
      { label: '140-150m²', min: 140, max: 149.9, count: 0 },
      { label: '> 150m²', min: 150, max: Infinity, count: 0 }
    ]

    propertyStore.properties.forEach(prop => {
      const range = ranges.find(r => prop.area >= r.min && prop.area <= r.max)
      if (range) range.count++
    })

    return ranges
  })

  // Propiedades ordenadas por precio
  const propertiesByPrice = computed(() => {
    return [...propertyStore.properties]
      .sort((a, b) => a.price - b.price)
      .map(p => ({
        address: p.address,
        price: p.price,
        pricePerSqm: calculatePricePerSqm(p.price, p.area)
      }))
  })

  // Distribución de dormitorios
  const bedroomsDistribution = computed(() => {
    const distribution = {}
    propertyStore.properties.forEach(prop => {
      const key = prop.bedrooms || 0
      distribution[key] = (distribution[key] || 0) + 1
    })
    return Object.entries(distribution).map(([bedrooms, count]) => ({
      bedrooms: parseInt(bedrooms),
      count
    }))
  })

  // Distribución de cocheras
  const parkingDistribution = computed(() => {
    const withParking = propertyStore.properties.filter(p => p.parking > 0).length
    const withoutParking = propertyStore.properties.length - withParking
    return {
      withParking,
      withoutParking,
      percentage: propertyStore.properties.length > 0 
        ? Math.round((withParking / propertyStore.properties.length) * 100)
        : 0
    }
  })

  // Formateados
  const formattedAveragePrice = computed(() => formatPrice(averagePrice.value))
  const formattedAverageArea = computed(() => formatArea(averageArea.value))
  const formattedAveragePricePerSqm = computed(() => formatPricePerSqm(averagePricePerSqm.value))
  const formattedMinPrice = computed(() => formatPrice(minPrice.value))
  const formattedMaxPrice = computed(() => formatPrice(maxPrice.value))

  return {
    // Básicas
    totalProperties,
    averagePrice,
    averageArea,
    averagePricePerSqm,
    minPrice,
    maxPrice,
    minArea,
    maxArea,
    // Distribuciones
    priceDistribution,
    areaDistribution,
    bedroomsDistribution,
    parkingDistribution,
    propertiesByPrice,
    // Formateados
    formattedAveragePrice,
    formattedAverageArea,
    formattedAveragePricePerSqm,
    formattedMinPrice,
    formattedMaxPrice
  }
}
