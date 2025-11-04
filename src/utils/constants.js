// Constantes de la aplicación

export const APP_NAME = 'Listado de Alternativas'
export const APP_SUBTITLE = 'Departamentos de 4 ambientes - Zona Premium Recoleta'

// Configuración del mapa
export const MAP_CONFIG = {
  defaultCenter: [-34.5868, -58.4103], // Recoleta, Buenos Aires
  defaultZoom: 15,
  maxZoom: 18,
  minZoom: 10,
  tileUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  attribution: '© OpenStreetMap contributors'
}

// Rutas de navegación
export const ROUTES = {
  HOME: '/',
  PROPERTIES: '/properties',
  TABLE: '/table',
  STATISTICS: '/statistics',
  PURCHASE: '/purchase-process'
}

// Criterios de búsqueda
export const SEARCH_CRITERIA = {
  location: 'Departamento en Recoleta',
  zone: 'Av. del Libertador hasta Av. Callao y Av. Santa Fe y Libertad',
  rooms: 4,
  budget: 500000,
  currency: 'USD',
  features: 'Con patio, jardín o amplia terraza'
}

// Tipos de moneda
export const CURRENCY = {
  USD: 'USD',
  ARS: 'ARS'
}

// Formato de números
export const NUMBER_FORMAT = {
  locale: 'es-AR',
  currency: 'USD'
}

export const API = {
  PROXY_URL: 'https://micreditodev.com/upload.php',
  ZOHO_BASE_URL: 'https://www.zohoapis.com/creator/custom/sirargentina/'
}