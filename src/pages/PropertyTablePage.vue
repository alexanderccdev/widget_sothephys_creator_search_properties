<template>
  <div class="space-y-6">
    <!-- Header de la tabla -->
    <div class="bg-white rounded-xl border shadow-sm p-6">
      <div class="flex items-center justify-between mb-2">
        <div class="flex items-center gap-2">
          <i class="pi pi-table text-blue-600 text-xl"></i>
          <h2 class="text-xl font-bold text-gray-800">Tabla Completa de Propiedades</h2>
        </div>
        <Button 
          label="Exportar a CSV" 
          icon="pi pi-download" 
          @click="exportCSV"
          severity="secondary"
          size="small"
        />
      </div>
      <p class="text-sm text-gray-600">
        Haz clic en cualquier dirección para ver los detalles completos de la propiedad
      </p>
    </div>

    <!-- DataTable -->
    <div class="bg-white rounded-xl border shadow-sm overflow-hidden">
      <DataTable 
        ref="dt"
        :value="formattedProperties" 
        :paginator="true" 
        :rows="10"
        :rowsPerPageOptions="[5, 10, 20, 50]"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} propiedades"
        :globalFilterFields="['address', 'price', 'area']"
        v-model:filters="filters"
        filterDisplay="menu"
        :loading="loading"
        stripedRows
        showGridlines
        responsiveLayout="scroll"
        class="property-table"
      >
        <!-- Header con búsqueda global -->
        <template #header>
          <div class="flex justify-between items-center p-4">
            <span class="text-lg font-semibold text-gray-700">
              Listado de {{ totalProperties }} Propiedades
            </span>
            <IconField iconPosition="left">
              <InputIcon>
                <i class="pi pi-search" />
              </InputIcon>
              <InputText 
                v-model="filters['global'].value" 
                placeholder="Buscar propiedades..." 
                class="w-full md:w-auto"
              />
            </IconField>
          </div>
        </template>

        <!-- Empty state -->
        <template #empty>
          <div class="text-center py-8">
            <i class="pi pi-inbox text-5xl text-gray-300 mb-3"></i>
            <p class="text-gray-500">No se encontraron propiedades</p>
          </div>
        </template>

        <!-- Columna ID -->
        <Column 
          field="id" 
          header="ID" 
          :sortable="true" 
          style="width: 80px"
          class="text-center"
        >
          <template #body="{ data }">
            <span class="font-medium text-gray-700">{{ data.id }}</span>
          </template>
        </Column>

        <!-- Columna Dirección -->
        <Column 
          field="address" 
          header="Dirección" 
          :sortable="true" 
          style="min-width: 200px"
        >
          <template #body="{ data }">
            <button 
              @click="handleViewDetails(data)"
              class="flex items-center text-left hover:text-blue-600 hover:underline transition-colors"
            >
              <i class="pi pi-map-marker text-gray-400 mr-2"></i>
              <span class="font-medium">{{ data.address }}</span>
            </button>
          </template>
        </Column>

        <!-- Columna Precio -->
        <Column 
          field="price" 
          header="Precio" 
          :sortable="true" 
          dataType="numeric"
          style="min-width: 120px"
          class="text-right"
        >
          <template #body="{ data }">
            <span class="font-semibold text-gray-900">{{ data.formattedPrice }}</span>
          </template>
        </Column>

        <!-- Columna Superficie -->
        <Column 
          field="area" 
          header="Superficie" 
          :sortable="true" 
          dataType="numeric"
          style="min-width: 120px"
          class="text-right"
        >
          <template #body="{ data }">
            <span>{{ data.formattedArea }}</span>
          </template>
        </Column>

        <!-- Columna USD/m² -->
        <Column 
          field="pricePerSqm" 
          header="USD/m²" 
          :sortable="true" 
          dataType="numeric"
          style="min-width: 120px"
          class="text-right"
        >
          <template #body="{ data }">
            <span class="font-medium text-green-600">{{ data.formattedPricePerSqm }}</span>
          </template>
        </Column>

        <!-- Columna Ambientes -->
        <Column 
          field="rooms" 
          header="Amb." 
          :sortable="true" 
          style="width: 80px"
          class="text-center"
        >
          <template #body="{ data }">
            <span>{{ data.rooms }}</span>
          </template>
        </Column>

        <!-- Columna Dormitorios -->
        <Column 
          field="bedrooms" 
          header="Dorm." 
          :sortable="true" 
          style="width: 80px"
          class="text-center"
        >
          <template #body="{ data }">
            <span>{{ data.bedrooms }}</span>
          </template>
        </Column>

        <!-- Columna Baños -->
        <Column 
          field="bathrooms" 
          header="Baños" 
          :sortable="true" 
          style="width: 80px"
          class="text-center"
        >
          <template #body="{ data }">
            <span>{{ data.bathrooms }}</span>
          </template>
        </Column>

        <!-- Columna Cocheras -->
        <Column 
          field="parking" 
          header="Coch." 
          :sortable="true" 
          style="width: 80px"
          class="text-center"
        >
          <template #body="{ data }">
            <span>{{ data.parking }}</span>
          </template>
        </Column>

        <!-- Columna Estado -->
        <Column 
          field="status" 
          header="Estado" 
          :sortable="true" 
          style="min-width: 120px"
          class="text-center"
        >
          <template #body="{ data }">
            <Tag 
              :value="getStatusLabel(data)" 
              :severity="getStatusSeverity(data)"
            />
          </template>
        </Column>

        <!-- Columna Acción -->
        <Column 
          header="Acción" 
          style="width: 100px"
          class="text-center"
        >
          <template #body="{ data }">
            <Button 
              icon="pi pi-external-link" 
              @click="handleViewDetails(data)"
              text
              rounded
              severity="secondary"
              size="small"
            />
          </template>
        </Column>
      </DataTable>
    </div>

    <!-- Modal de detalles -->
    <PropertyDetailDialog 
      v-model="showDetailDialog"
      :property="selectedProperty"
      @contact="handleContact"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { FilterMatchMode } from 'primevue/api'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import Tag from 'primevue/tag'
import PropertyDetailDialog from '@/components/property/PropertyDetailDialog.vue'
import { useProperties } from '@/composables/useProperties'

const { formattedProperties, totalProperties } = useProperties()

const dt = ref()
const loading = ref(false)
const showDetailDialog = ref(false)
const selectedProperty = ref(null)

// Filtros de DataTable
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS }
})

// Determinar estado basado en precio
function getStatusLabel(property) {
  if (property.price < 380000) return 'Excelente'
  if (property.price < 430000) return 'Bueno'
  return 'Regular'
}

function getStatusSeverity(property) {
  if (property.price < 380000) return 'success'
  if (property.price < 430000) return 'info'
  return 'warning'
}

function handleViewDetails(property) {
  selectedProperty.value = property
  showDetailDialog.value = true
}

function handleContact(property) {
  console.log('Contactar por:', property)
}

function exportCSV() {
  dt.value.exportCSV()
}
</script>

<style>
.property-table .p-datatable-header {
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
}

.property-table .p-datatable-thead > tr > th {
  background: #f3f4f6;
  color: #374151;
  font-weight: 600;
  padding: 0.75rem 0.5rem;
}

.property-table .p-datatable-tbody > tr:hover {
  background: #f9fafb;
}

.property-table .p-paginator {
  background: #f9fafb;
  border-top: 1px solid #e5e7eb;
  padding: 1rem;
}
</style>
