# Insight Navigator

PROYECTO

Crear desde cero una aplicación web profesional e interactiva denominada:

MYSTERY INSIGHTS | MAQUINARIAS

Subtítulo:

Dashboard de Evaluaciones Mystery Shopping

El sistema debe estar orientado a reuniones gerenciales y análisis de desempeño comercial de concesionarias automotrices.

No quiero una sola página larga con muchos gráficos.

Quiero una aplicación analítica modular, donde cada módulo responda una pregunta de negocio distinta.

La aplicación debe permitir pasar desde una visión ejecutiva general hasta el detalle de una pregunta específica de una evaluación.

OBJETIVO DEL SISTEMA

Construir una plataforma para analizar evaluaciones Mystery Shopping realizadas a diferentes:

Concesionarias

Marcas

Ubicaciones

Locales

Indicadores

Preguntas

Evaluaciones

Debe permitir comparar especialmente:

MAQUINARIAS vs COMPETENCIA

y detectar:

fortalezas,

oportunidades,

brechas,

indicadores críticos,

locales con menor desempeño,

concesionarias líderes,

preguntas con bajo cumplimiento,

hallazgos cualitativos de los evaluadores.

PRINCIPIO DE DISEÑO

El sistema debe permitir responder progresivamente:

¿Cómo estamos?

¿Cómo estamos frente a la competencia?

¿Dónde están los mejores y peores resultados?

¿Qué indicadores explican el resultado?

¿Qué preguntas están generando las brechas?

¿Qué ocurrió realmente durante la visita?

El flujo debe ser:

RESULTADO GENERAL

↓

BENCHMARK

↓

CONCESIONARIA

↓

LOCAL

↓

INDICADOR

↓

PREGUNTA

↓

HALLAZGO

El usuario debe poder llegar desde el resultado general hasta el detalle de una evaluación en máximo 3 o 4 clics.

ARQUITECTURA GENERAL

Crear 5 módulos principales:

Resumen Ejecutivo

Benchmark

Concesionarias

Indicadores

Hallazgos

NO crear una sexta página innecesaria si el detalle puede resolverse dentro de Hallazgos.

NAVEGACIÓN

Crear menú lateral izquierdo fijo en desktop.

Encabezado del menú:

MYSTERY INSIGHTS

Debajo:

MAQUINARIAS

Opciones:

Resumen Ejecutivo

Benchmark

Concesionarias

Indicadores

Hallazgos

Usar iconos minimalistas.

El módulo seleccionado debe resaltarse.

El menú debe poder contraerse.

En tablet y móvil convertirlo en menú responsive.

ENCABEZADO SUPERIOR

En todos los módulos mostrar un header limpio.

Izquierda:

Título del módulo.

Debajo:

breve descripción contextual.

Derecha:

filtros globales.

Filtros:

Periodo

Concesionaria

Marca

Ubicación

Botón:

Limpiar filtros

También mostrar:

Filtros activos

Ejemplo:

Maquinarias · Nissan · Surquillo

Si no existen filtros:

Todas las evaluaciones

NO colocar Indicador como filtro global.

Indicador debe ser un filtro específico del módulo Indicadores.

DATOS

Construir el sistema preparado para trabajar con información real.

No hardcodear resultados dentro de componentes.

Crear una capa de datos centralizada que posteriormente pueda conectarse a:

Excel

CSV

Google Sheets

Supabase

API

Inicialmente puede trabajar con datos demo estructurados correctamente.

Los datos demo deben poder sustituirse fácilmente por los datos reales.

MODELO DE DATOS

Crear una estructura similar a:

EVALUACIONES

Campos:

id_evaluacion
fecha
periodo
concesionaria
marca
ubicacion
local
tipo_empresa
puntaje_global
comentario_general
evaluador

tipo_empresa debe permitir:

MAQUINARIAS

COMPETENCIA

INDICADORES

Campos:

id_indicador
nombre_indicador
area
peso
orden
descripcion

Ejemplos de indicadores:

Experiencia

Instalaciones y Ambiente General

Identificación de Necesidades

Presentación del Producto

Propuesta de Valor y Diferenciación

Estrategia Comercial

Cierre Comercial

Seguimiento

Valor Marca Maquinarias

Omisiones al Discurso Comercial

Los nombres deben ser editables desde la fuente de datos.

RESULTADOS POR INDICADOR

Campos:

id_evaluacion
id_indicador
resultado
peso
aporte_ponderado

PREGUNTAS

Campos:

id_pregunta
id_indicador
pregunta
peso_pregunta
orden

RESPUESTAS

Campos:

id_evaluacion
id_pregunta
respuesta
puntaje
comentario
evidencia

REGLA DE PONDERACIÓN

MUY IMPORTANTE.

Los indicadores pueden tener pesos diferentes.

No utilizar promedio simple si los indicadores tienen distintas ponderaciones.

La fórmula general debe ser:

Puntaje Global = SUMA(Resultado Indicador × Peso Indicador) / SUMA(Pesos aplicables)

Si los pesos están expresados como porcentajes que suman 100%:

Puntaje Global = SUMA(Resultado × Peso)

Ejemplo:

Indicador A:

Resultado 80%
Peso 5%

Aporte:

4 puntos

Indicador B:

Resultado 80%
Peso 10%

Aporte:

8 puntos

El indicador B debe impactar el doble que el indicador A.

VALORES VACÍOS

Si una pregunta todavía no ha sido evaluada:

NO convertirla automáticamente en 0%.

Debe considerarse:

Sin evaluar

Evitar que un valor vacío reduzca incorrectamente el promedio.

Los cálculos deben utilizar únicamente elementos válidamente evaluados según la lógica de la evaluación.

BENCHMARK

Crear una lógica de benchmark dinámica.

El benchmark principal debe comparar:

MAQUINARIAS vs COMPETENCIA

Calcular:

Promedio Maquinarias

Promedio Competencia

Brecha:

Brecha = Resultado Maquinarias - Resultado Competencia

Mostrar la brecha en:

puntos porcentuales (pp)

Ejemplo:

Maquinarias: 55.2%

Competencia: 47.8%

Brecha:

+7.4 pp

Nunca mostrar:

+7.4%

cuando realmente sean puntos porcentuales.

IMPORTANTE SOBRE FILTROS Y BENCHMARK

Los filtros no deben destruir la referencia comparativa.

Ejemplo:

Si selecciono:

Concesionaria = Maquinarias

el dashboard debe seguir pudiendo comparar Maquinarias contra la competencia correspondiente.

No filtrar ambos lados de la comparación hasta hacerlos iguales.

Crear funciones independientes para:

resultado seleccionado

y

benchmark de referencia.

Mostrar siempre qué universo se está utilizando como referencia.

MÓDULO 1

RESUMEN EJECUTIVO

Debe responder:

¿Cómo estamos?

Debe ser la primera pantalla al abrir la aplicación.

Su diseño debe estar preparado para proyectarse en una reunión gerencial.

No utilizar tablas largas.

No mostrar preguntas individuales.

RESUMEN EJECUTIVO — KPIs

Primera fila:

crear tarjetas con:

Puntaje Global

Mostrar porcentaje general.

Subtexto:

Promedio ponderado de evaluaciones seleccionadas

Evaluaciones

Cantidad total.

Maquinarias

Promedio correspondiente a Maquinarias.

Competencia

Promedio correspondiente a competencia.

Brecha

Maquinarias - Competencia.

Indicadores críticos

Cantidad de indicadores debajo del umbral definido.

UMBRALES

Utilizar inicialmente:

Alto:

≥ 70%

Medio:

50% a 69.99%

Crítico:

< 50%

Construir estos valores como constantes configurables.

DISTRIBUCIÓN DE RESULTADOS

Mostrar un gráfico compacto:

Alto
Medio
Crítico

Debe mostrar:

cantidad

y

porcentaje.

Puede ser:

donut

o

barras apiladas.

No utilizar gráficos 3D.

BENCHMARK EJECUTIVO

Crear una visualización comparativa simple:

MAQUINARIAS

vs

COMPETENCIA

Mostrar:

resultado

brecha

cantidad de evaluaciones utilizadas.

Agregar automáticamente una frase contextual.

Ejemplo:

Maquinarias se encuentra 7.4 pp sobre la competencia.

Si la brecha es negativa:

Maquinarias se encuentra 4.2 pp por debajo de la competencia.

PRINCIPALES FORTALEZAS

Mostrar máximo 3 indicadores con mejores resultados.

Formato compacto.

Ejemplo:

Experiencia — 88%

Instalaciones — 73%

Propuesta de valor — 72%

¿DÓNDE DEBEMOS ACTUAR?

Esta sección debe ser muy importante visualmente.

Mostrar máximo 3 a 5 prioridades.

No utilizar solamente el porcentaje más bajo.

Considerar:

resultado,

brecha,

peso,

criticidad.

Crear un índice denominado:

Impacto de Prioridad

Puede calcularse inicialmente como:

Impacto = (1 - Resultado Normalizado) × Peso

y utilizar la brecha como criterio adicional de ordenamiento.

Mostrar:

Indicador

Resultado

Peso

Brecha

Nivel de prioridad

Ejemplo:

ALTA

MEDIA

BAJA

Agregar:

Ver análisis →

Al pulsar:

abrir módulo Indicadores con ese indicador seleccionado.

NO SOBRECARGAR RESUMEN

La pantalla de Resumen Ejecutivo NO debe tener:

ranking completo,

heatmap gigante,

preguntas individuales,

comentarios extensos,

tablas detalladas.

Todo eso pertenece a otros módulos.

MÓDULO 2

BENCHMARK

Debe responder:

¿Cómo estamos frente a la competencia?

Su estructura debe ser diferente al Resumen Ejecutivo.

No repetir las seis tarjetas anteriores.

HERO BENCHMARK

Parte superior:

MAQUINARIAS

resultado grande.

Centro:

VS

COMPETENCIA

resultado grande.

Debajo:

Brecha

Cantidad de evaluaciones por grupo.

BENCHMARK POR INDICADOR

Crear visualización tipo:

dumbbell chart

o

bullet chart horizontal.

Por cada indicador mostrar:

Maquinarias

Competencia

Brecha.

Ordenar inicialmente por:

brecha absoluta.

Permitir cambiar orden:

Mayor ventaja Maquinarias

Mayor ventaja competencia

Mayor resultado

Menor resultado

BRECHAS POSITIVAS

Crear bloque:

Dónde Maquinarias supera a la competencia

Mostrar Top 5.

Ejemplo:

Seguimiento +XX pp

Cierre Comercial +XX pp

Estrategia Comercial +XX pp

BRECHAS NEGATIVAS

Crear:

Dónde debemos cerrar brechas

Mostrar Top 5 indicadores donde competencia supera a Maquinarias.

Usar color semántico rojo o ámbar.

Cada indicador debe ser clickeable.

Click:

abrir módulo Indicadores conservando el indicador.

MÓDULO 3

CONCESIONARIAS

Debe responder:

¿Dónde están los mejores y peores resultados?

NO comenzar con seis tarjetas KPI.

La protagonista debe ser una comparación entre concesionarias/locales.

RANKING

Crear ranking vertical interactivo.

Mostrar:

Posición

Concesionaria

Marca

Ubicación

Puntaje

Brecha vs benchmark

Cantidad de evaluaciones

Utilizar barras horizontales.

Permitir ordenar:

Mayor puntaje

Menor puntaje

Mayor brecha positiva

Mayor brecha negativa

SELECCIÓN

Al hacer clic sobre una concesionaria:

mostrar un panel analítico específico debajo o al costado.

Mostrar:

Concesionaria

Marca

Ubicación

Puntaje

Benchmark

Brecha

Cantidad de evaluaciones

MAPA DE CALOR

Crear un heatmap:

Filas:

Concesionarias/locales.

Columnas:

Indicadores.

Celdas:

Resultado.

Colores:

verde

amarillo

rojo.

Incluir número dentro de cada celda cuando haya espacio.

Ejemplo:

82%

64%

35%

Tooltip:

Concesionaria

Indicador

Resultado

Benchmark

Brecha.

DRILL DOWN

Permitir navegar jerárquicamente:

Concesionaria

↓

Marca

↓

Ubicación

↓

Evaluación

Mostrar breadcrumbs.

Ejemplo:

Concesionarias / Maquinarias / Nissan / Surquillo

MÓDULO 4

INDICADORES

Debe responder:

¿Qué explica los resultados?

Este módulo debe sentirse analítico.

NO copiar el diseño del Resumen Ejecutivo.

BARRA DE CONTROL

Agregar:

Buscar indicador

Indicador ▼

Ordenar por ▼

Opciones:

resultado,

brecha,

peso,

prioridad.

MATRIZ ANALÍTICA

Mostrar:

Indicador

Peso

Resultado

Maquinarias

Competencia

Brecha

Impacto

Estado

Permitir ordenar columnas.

ESTADOS

Utilizar:

Favorable

Atención

Crítico

Sin evaluar

No depender solamente del color.

Mostrar también texto o icono.

DETALLE DEL INDICADOR

Al seleccionar un indicador:

abrir una sección dedicada.

Mostrar encabezado:

Nombre del Indicador

Peso

Resultado

Benchmark

Brecha

Cantidad de evaluaciones.

DESEMPEÑO POR CONCESIONARIA

Mostrar gráfico horizontal.

Por ejemplo:

Autosummit — 82%

Maquinarias — 73%

Grupo Pana — 65%

Vigo — 41%

Orden descendente.

DESEMPEÑO POR UBICACIÓN

Mostrar debajo otro gráfico o tabla compacta.

Debe actualizarse según el indicador seleccionado.

PREGUNTAS DEL INDICADOR

Crear sección:

Preguntas que explican este resultado

Mostrar inicialmente 5 preguntas con menor cumplimiento.

Columnas:

Pregunta

Cumplimiento

Evaluaciones

Peso

Impacto

Permitir:

Ver todas

INTERACCIÓN PREGUNTA

Al seleccionar una pregunta:

mostrar qué evaluaciones fallaron.

Permitir:

Ver hallazgos relacionados

Esto debe abrir Hallazgos con los registros correspondientes.

MÓDULO 5

HALLAZGOS

Debe responder:

¿Qué ocurrió realmente durante la visita?

Este módulo debe tener diseño parecido a:

auditoría

o

ficha de evaluación.

No debe parecer otro dashboard lleno de gráficas.

LAYOUT HALLAZGOS

Desktop:

crear dos columnas.

Izquierda:

lista de evaluaciones.

Derecha:

detalle de evaluación seleccionada.

Proporción aproximada:

30 / 70.

LISTA DE EVALUACIONES

Agregar buscador.

Cada registro debe mostrar:

Concesionaria

Marca

Ubicación

Fecha

Puntaje

Estado.

Permitir filtros internos.

FICHA DE EVALUACIÓN

Mostrar:

Concesionaria

Marca

Ubicación

Fecha

Evaluador

Puntaje

Benchmark

Brecha.

Mostrar claramente:

Alto

Medio

Crítico.

RESUMEN DE VISITA

Crear bloque:

Resumen de la visita

Mostrar comentario general.

No cortar innecesariamente el texto.

DESGLOSE POR INDICADOR

Mostrar acordeones.

Ejemplo:

Experiencia — 82%

Identificación de Necesidades — 48%

Presentación del Producto — 65%

Al abrir cada indicador:

mostrar preguntas y respuestas.

PREGUNTAS

Mostrar:

Pregunta

Respuesta

Puntaje

Comentario

Evidencia si existe.

Ejemplo:

¿El asesor preguntó el uso que dará al vehículo?

Respuesta:

Sí

Puntaje:

100%

COMENTARIOS DEL MYSTERY SHOPPER

Crear una sección destacada:

Comentarios del Mystery Shopper

Agrupar comentarios por:

experiencia,

asesor,

producto,

cierre,

seguimiento,

si los datos permiten hacerlo.

No esconder los comentarios dentro de tooltips.

RECOMENDACIONES

Crear una sección:

Oportunidades detectadas

Generar automáticamente una lista basada exclusivamente en los datos disponibles.

No inventar hechos.

Ejemplo:

Reforzar ofrecimiento de prueba de manejo.

Mejorar identificación de necesidades.

Fortalecer discurso sobre valor de la marca.

INTERACTIVIDAD GLOBAL

La aplicación debe permitir que los gráficos funcionen como filtros.

Ejemplo:

Click concesionaria

→ filtra datos.

Click indicador

→ abre indicador.

Click pregunta

→ muestra evaluaciones asociadas.

Click evaluación

→ abre hallazgo.

Crear navegación contextual entre módulos.

TOOLTIP

Todos los gráficos deben tener tooltip.

Ejemplo:

Indicador:

Seguimiento

Resultado Maquinarias:

82%

Competencia:

54%

Brecha:

+28 pp

Peso:

10%

Evaluaciones:

8

FILTROS

Todos los filtros deben funcionar realmente.

No crear botones decorativos.

Filtros globales:

Periodo

Concesionaria

Marca

Ubicación.

Filtros dependientes.

Ejemplo:

si selecciono Maquinarias:

Marca debe mostrar solamente marcas disponibles para Maquinarias.

Si selecciono Nissan:

Ubicación debe mostrar solamente ubicaciones Nissan correspondientes.

LIMPIAR FILTROS

Crear botón:

Limpiar filtros

Debe restablecer completamente el dashboard.

PERSISTENCIA DURANTE NAVEGACIÓN

Si selecciono:

Maquinarias

Nissan

Surquillo

y cambio de:

Resumen

a

Benchmark

a

Indicadores

los filtros deben mantenerse.

RESPONSIVE

Priorizar:

1920 × 1080

1366 × 768

1440 × 900

porque se utilizará en:

reuniones

laptops

proyectores.

Debe funcionar también en tablet.

Mobile puede usar diseño vertical.

DISEÑO VISUAL

Quiero un estilo:

corporativo

ejecutivo

minimalista

moderno

premium

analítico.

Inspiración:

Power BI ejecutivo

Tableau

Looker

SaaS analytics.

No copiar literalmente ningún producto.

PALETA

Utilizar una identidad corporativa sobria.

Base:

blanco / gris muy claro.

Texto:

gris oscuro / negro suave.

Color principal:

azul corporativo oscuro.

Colores semánticos:

verde = favorable.

ámbar = atención.

rojo = crítico.

gris = sin evaluar.

Evitar saturar con colores.

TIPOGRAFÍA

Utilizar una tipografía moderna y muy legible.

Jerarquía:

Título del módulo

24-28px

KPIs

28-36px

Subtítulos

16-18px

Contenido

13-15px.

No utilizar textos demasiado pequeños.

TARJETAS

No convertir absolutamente todo en tarjetas.

Usar tarjetas solo cuando exista una razón visual.

Evitar:

tarjeta dentro de tarjeta.

Usar espacios en blanco y divisores.

GRÁFICOS

Utilizar principalmente:

barras horizontales

donut

heatmap

dumbbell chart

bullet chart

tablas analíticas.

Evitar:

3D

gauges excesivos

gráficos decorativos

animaciones innecesarias.

ANIMACIONES

Utilizar transiciones suaves:

150-250ms.

No utilizar animaciones exageradas.

ESTADOS VACÍOS

Si no existen datos:

mostrar:

No hay evaluaciones disponibles para los filtros seleccionados.

Nunca mostrar:

NaN

undefined

Infinity

0/0.

DATOS DEMO

Si todavía no se conecta una fuente real:

crear datos demo suficientes para probar toda la aplicación.

Incluir al menos estas concesionarias:

MAQUINARIAS

AUTOSUMMIT

GRUPO PANA

VIGO

ASTARA

GILDEMEISTER

Incluir diferentes marcas:

Nissan

Honda

Ford

Geely

Kia

Hyundai.

Crear al menos:

12 evaluaciones.

Usar diferentes ubicaciones en Lima.

Los resultados deben ser variados para probar:

fortalezas,

criticidad,

benchmark,

ranking,

brechas.

IMPORTANTE:

Los datos demo deben estar claramente separados de la lógica de la aplicación para poder reemplazarlos posteriormente.

COMPONENTES

Crear componentes reutilizables.

Ejemplo:

Sidebar

Header

GlobalFilters

MetricCard

StatusBadge

BenchmarkComparison

RankingChart

Heatmap

IndicatorTable

EvaluationList

EvaluationDetail

QuestionDetail

EmptyState.

ESTRUCTURA TÉCNICA

Mantener:

componentes separados

funciones de cálculo centralizadas

datos separados de UI

filtros centralizados

código limpio.

Crear funciones como:

calculateWeightedScore()

calculateBenchmark()

calculateGap()

calculateIndicatorPerformance()

calculatePriorityImpact()

filterEvaluations()

getCriticalQuestions()

No duplicar fórmulas en diferentes componentes.

PRINCIPIO FUNDAMENTAL

No quiero cinco dashboards iguales.

Cada módulo debe tener una composición propia.

Resumen Ejecutivo

KPIs + visión global + prioridades.

Benchmark

comparación + brechas.

Concesionarias

ranking + heatmap + drill-down.

Indicadores

matriz analítica + preguntas.

Hallazgos

ficha de visita + comentarios + evidencia.

EXPERIENCIA DURANTE UNA REUNIÓN

La interfaz debe permitir presentar la información de esta manera:

Primero:

Tenemos este resultado general.

Después:

Frente a la competencia estamos aquí.

Después:

Estas concesionarias explican el comportamiento.

Después:

Estos indicadores generan las principales brechas.

Después:

Estas preguntas son las causas.

Finalmente:

Esto fue exactamente lo observado durante la visita.

La navegación debe facilitar esta narrativa.

IMPORTANTE

NO crear solamente una landing page.

NO crear una página larga.

NO crear contenido estático.

NO hardcodear KPIs.

NO utilizar promedios simples cuando existan pesos diferentes.

NO reemplazar valores faltantes con 0%.

NO perder los filtros al cambiar de módulo.

NO repetir los mismos gráficos en todas las páginas.

NO crear botones que no funcionen.

RESULTADO FINAL

Quiero que el producto se perciba como:

una plataforma corporativa de Business Intelligence para Mystery Shopping

y no simplemente:

una página web con gráficos.

Construye toda la aplicación funcional desde cero siguiendo esta arquitectura.

Empieza desarrollando:

modelo de datos,

lógica de cálculos,

navegación,

filtros,

módulos,

visualizaciones,

responsive,

detalles visuales.

La prioridad es primero funcionalidad y consistencia de datos, después estética.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/a563ad0f-af65-4a5c-bf8b-9b5a75fd6997).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
