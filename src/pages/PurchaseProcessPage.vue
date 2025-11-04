<template>
  <div class="space-y-8 p-6">
    <!-- Título y Descripción Principal -->
    <div class="text-center space-y-4">
      <h1 class="text-3xl font-bold text-gray-900">Proceso de Compra</h1>
      <p class="text-lg text-gray-600 max-w-3xl mx-auto">
        En <strong>Sotheby's International Realty</strong> lo acompañamos en
        cada paso del proceso de compra, representando exclusivamente sus
        intereses como comprador.
      </p>
    </div>

    <!-- Tarjeta de Beneficios -->
    <div class="rounded-xl border shadow-sm bg-blue-50 border-blue-200 p-6">
      <div class="mb-6">
        <div class="flex items-center gap-2 text-blue-900 font-semibold text-lg">
          <i class="pi pi-shield text-2xl"></i>
          <h2>¿Por qué elegirnos como sus Agentes Exclusivos del Comprador?</h2>
        </div>
      </div>

      <div class="grid md:grid-cols-2 gap-6">
        <div class="flex gap-3">
          <i class="pi pi-check-circle text-blue-600 text-xl mt-1 flex-shrink-0"></i>
          <div>
            <h3 class="font-semibold text-blue-900">Búsqueda Integral</h3>
            <p class="text-blue-700 text-sm">
              Acceso a propiedades publicadas Y off-market exclusivas que no
              están disponibles al público general.
            </p>
          </div>
        </div>

        <div class="flex gap-3">
          <i class="pi pi-check-circle text-blue-600 text-xl mt-1 flex-shrink-0"></i>
          <div>
            <h3 class="font-semibold text-blue-900">Representación Exclusiva</h3>
            <p class="text-blue-700 text-sm">
              Siempre representamos SUS intereses como comprador, no los del
              vendedor.
            </p>
          </div>
        </div>

        <div class="flex gap-3">
          <i class="pi pi-check-circle text-blue-600 text-xl mt-1 flex-shrink-0"></i>
          <div>
            <h3 class="font-semibold text-blue-900">Sin Costo Adicional</h3>
            <p class="text-blue-700 text-sm">
              El costo de transacción será el mismo si va directo o nos
              contrata como sus agentes exclusivos.
            </p>
          </div>
        </div>

        <div class="flex gap-3">
          <i class="pi pi-check-circle text-blue-600 text-xl mt-1 flex-shrink-0"></i>
          <div>
            <h3 class="font-semibold text-blue-900">Experiencia Sotheby's</h3>
            <p class="text-blue-700 text-sm">
              Respaldo de la red internacional más prestigiosa en bienes
              raíces de lujo.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Proceso de Representación -->
    <div>
      <h2 class="text-2xl font-bold text-gray-900 mb-6 text-center">
        Nuestro Proceso de Representación
      </h2>

      <div class="grid gap-6">
        <!-- Paso 1 -->
        <div class="bg-white rounded-xl border shadow-sm hover:shadow-lg transition-shadow p-6">
          <div class="flex gap-4">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                <i class="pi pi-file-edit text-2xl"></i>
              </div>
            </div>
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-2">
                <span class="inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium text-blue-600 border-blue-600">
                  Paso 1
                </span>
                <h3 class="text-lg font-semibold text-gray-900">
                  Definición de Requerimientos
                </h3>
              </div>
              <p class="text-gray-600">
                Analizamos sus necesidades específicas, presupuesto y
                preferencias para crear un perfil de búsqueda personalizado.
              </p>
            </div>
          </div>
        </div>

        <!-- Paso 2 -->
        <div class="bg-white rounded-xl border shadow-sm hover:shadow-lg transition-shadow p-6">
          <div class="flex gap-4">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                <i class="pi pi-search text-2xl"></i>
              </div>
            </div>
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-2">
                <span class="inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium text-blue-600 border-blue-600">
                  Paso 2
                </span>
                <h3 class="text-lg font-semibold text-gray-900">
                  Búsqueda Integral del Mercado
                </h3>
              </div>
              <p class="text-gray-600">
                Realizamos una búsqueda exhaustiva en TODO el mercado
                inmobiliario, incluyendo propiedades publicadas y off-market
                exclusivas.
              </p>
            </div>
          </div>
        </div>

        <!-- Paso 3 -->
        <div class="bg-white rounded-xl border shadow-sm hover:shadow-lg transition-shadow p-6">
          <div class="flex gap-4">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                <i class="pi pi-check-circle text-2xl"></i>
              </div>
            </div>
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-2">
                <span class="inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium text-blue-600 border-blue-600">
                  Paso 3
                </span>
                <h3 class="text-lg font-semibold text-gray-900">
                  Selección y Análisis
                </h3>
              </div>
              <p class="text-gray-600">
                Preseleccionamos las mejores opciones y realizamos un
                análisis detallado de cada propiedad según sus criterios.
              </p>
            </div>
          </div>
        </div>

        <!-- Paso 4 -->
        <div class="bg-white rounded-xl border shadow-sm hover:shadow-lg transition-shadow p-6">
          <div class="flex gap-4">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                <i class="pi pi-key text-2xl"></i>
              </div>
            </div>
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-2">
                <span class="inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium text-blue-600 border-blue-600">
                  Paso 4
                </span>
                <h3 class="text-lg font-semibold text-gray-900">
                  Visitas y Evaluación
                </h3>
              </div>
              <p class="text-gray-600">
                Coordinamos las visitas a las propiedades seleccionadas y
                proporcionamos análisis comparativo profesional.
              </p>
            </div>
          </div>
        </div>

        <!-- Paso 5 -->
        <div class="bg-white rounded-xl border shadow-sm hover:shadow-lg transition-shadow p-6">
          <div class="flex gap-4">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                <i class="pi pi-dollar text-2xl"></i>
              </div>
            </div>
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-2">
                <span class="inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium text-blue-600 border-blue-600">
                  Paso 5
                </span>
                <h3 class="text-lg font-semibold text-gray-900">
                  Negociación Comercial
                </h3>
              </div>
              <p class="text-gray-600">
                Negociamos en su nombre para obtener las mejores condiciones
                de precio y términos contractuales.
              </p>
            </div>
          </div>
        </div>

        <!-- Paso 6 -->
        <div class="bg-white rounded-xl border shadow-sm hover:shadow-lg transition-shadow p-6">
          <div class="flex gap-4">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                <i class="pi pi-users text-2xl"></i>
              </div>
            </div>
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-2">
                <span class="inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium text-blue-600 border-blue-600">
                  Paso 6
                </span>
                <h3 class="text-lg font-semibold text-gray-900">
                  Cierre de Operación
                </h3>
              </div>
              <p class="text-gray-600">
                Lo acompañamos durante todo el proceso legal hasta la
                escrituración y entrega de llaves.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Tarjeta de Compromiso -->
    <div class="rounded-xl border shadow-sm bg-gray-50 border-gray-200 p-8 text-center">
      <h3 class="text-xl font-bold text-gray-900 mb-4">
        Nuestro Compromiso
      </h3>
      <p class="text-gray-700 max-w-2xl mx-auto leading-relaxed">
        Como agentes exclusivos del comprador de
        <strong>Sotheby's International Realty</strong>, nuestro único
        objetivo es encontrar la propiedad perfecta para usted al mejor
        precio y condiciones posibles. Trabajamos exclusivamente en su
        beneficio, con total transparencia y profesionalismo.
      </p>
      <div class="mt-6">
        <span class="inline-block bg-blue-600 text-white px-6 py-2 text-sm font-medium rounded-md">
          Sin costo adicional • Representación exclusiva • Acceso total al mercado
        </span>
      </div>
    </div>

    <!-- Tarjeta de Contacto -->
    <div class="rounded-xl border shadow-sm bg-blue-600 text-white p-8 text-center">
      <h3 class="text-xl font-bold mb-4">
        ¿Listo para comenzar su búsqueda?
      </h3>
      <p class="mb-6 opacity-90">
        Contáctenos para una consulta gratuita y personalizada sobre su
        proceso de compra.
      </p>
      <div class="mb-4">
        <h4 class="font-semibold text-lg mb-3">Ramón García Llorente</h4>
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <div class="flex items-center gap-2 text-sm opacity-90">
            <i class="pi pi-envelope"></i>
            <span>rgarciallorente@argentinasothebysrealty.com</span>
          </div>
          <div class="flex items-center gap-2 text-sm opacity-90">
            <i class="pi pi-phone"></i>
            <span>+54 9 11 3890-7251</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>