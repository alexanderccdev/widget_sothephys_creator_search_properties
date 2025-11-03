// Utilidades de formateo

/**
 * Formatea un número como precio en USD
 * @param {number} value - Valor a formatear
 * @returns {string} - Precio formateado
 */
export function formatPrice(value) {
  if (!value && value !== 0) return 'N/A'
  return `US$ ${value.toLocaleString('es-AR')}`
}

/**
 * Formatea un número como área en m²
 * @param {number} value - Valor a formatear
 * @returns {string} - Área formateada
 */
export function formatArea(value) {
  if (!value && value !== 0) return 'N/A'
  return `${value.toFixed(1)} m²`
}

/**
 * Formatea un número como precio por m²
 * @param {number} value - Valor a formatear
 * @returns {string} - Precio por m² formateado
 */
export function formatPricePerSqm(value) {
  if (!value && value !== 0) return 'N/A'
  return `USD ${Math.round(value)}/m²`
}

/**
 * Calcula el precio por m²
 * @param {number} price - Precio total
 * @param {number} area - Área en m²
 * @returns {number} - Precio por m²
 */
export function calculatePricePerSqm(price, area) {
  if (!area || area === 0) return 0
  return price / area
}

/**
 * Formatea un número con separadores de miles
 * @param {number} value - Valor a formatear
 * @returns {string} - Número formateado
 */
export function formatNumber(value) {
  if (!value && value !== 0) return '0'
  return value.toLocaleString('es-AR')
}
