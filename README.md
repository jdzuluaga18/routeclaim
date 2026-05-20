[README.md](https://github.com/user-attachments/files/28075298/README.md)
# 🏔️ RouteClaim
### *Reclama tu ruta. Defiende tu zona.*

> Aplicación web progresiva deportiva que convierte las rutas físicas de la Comunitat Valenciana en un campo de batalla territorial. Conquista rutas, píntalas de tu color en el mapa 3D y defiéndelas frente a tus rivales.

---

## 📋 Tabla de contenidos

- [Descripción](#-descripción)
- [Demo](#-demo)
- [Características](#-características)
- [Tecnologías](#️-tecnologías)
- [Estructura del proyecto](#-estructura-del-proyecto)
- [Instalación y uso local](#-instalación-y-uso-local)
- [Despliegue](#-despliegue)
- [Rutas incluidas](#️-rutas-incluidas)
- [Base de datos](#-base-de-datos)
- [Identidad corporativa](#-identidad-corporativa)
- [Autor](#-autor)

---

## 📖 Descripción

**RouteClaim** es una aplicación web desarrollada como Proyecto Fin de Ciclo (PFC) del Grado Superior en **Desarrollo de Aplicaciones Web (DAW)**. La app gamifica la práctica del deporte al aire libre mediante un sistema de conquista territorial:

1. El usuario activa el GPS y selecciona una ruta.
2. Al completarla, la línea en el mapa cambia a **su color personal**.
3. Cualquier rival que recorra esa misma ruta en menor tiempo **se la arrebata**.
4. El objetivo: dominar el mayor número de rutas de la Comunitat Valenciana.

---

## 🚀 Demo

| Credencial | Valor |
|---|---|
| URL | Ver `url.txt` en la raíz del proyecto |
| Email demo | `demo@test.com` |
| Contraseña | `demo123` |
| Email demo 2 | `trail@test.com` |
| Email demo 3 | `mara@test.com` |

> En escritorio sin GPS el modo demo activa una posición simulada en Valencia automáticamente.

---

## ✨ Características

### Mapa interactivo 3D
- Mapa oscuro con terreno elevado en 3D (relieve real de la Comunitat Valenciana)
- Rutas trazadas siguiendo carreteras y senderos reales mediante **OSRM**
- Cada ruta muestra punto de inicio (hueco) y punto de fin (relleno) en el color del conquistador
- Rutas sin conquistar: trazo discontinuo verde apagado
- Rutas conquistadas: trazo continuo en el color del propietario con efecto glow
- Click en cualquier ruta abre un modal con información y mini mapa 3D

### Sistema de conquistas
- Al terminar una ruta el mapa cambia de color **al instante**
- Popup animado de conquista con tiempo, distancia y puntos ganados
- +100 puntos por cada nueva ruta conquistada
- Récord personal por ruta guardado en la cuenta

### GPS y actividades
- Geolocalización real con `navigator.geolocation` (requiere HTTPS en producción)
- Cronómetro en tiempo real visible durante la ruta con HUD flotante
- Botón "Terminar" guarda la actividad: tiempo, distancia, fecha y estado de conquista
- Historial completo de actividades en el perfil del usuario

### Perfil de usuario
- Tarjetas visuales de rutas conquistadas con **mini SVG del trazado** en tu color
- Mejor tiempo registrado por ruta
- Historial de las últimas 10 actividades con fecha, hora y tiempo
- Estadísticas: puntos totales, rutas conquistadas y posición en el ranking

### Registro personalizado
- Nombre de usuario único
- Selector de **12 colores** para el mapa
- Selector de **24 banderas** (incluida la valenciana 🏴󠁥󠁳󠁶󠁣󠁿)
- Elección de disciplina principal: Running, Bicicleta, Trekking o Todas

### Modos de juego
| Modo | Descripción |
|---|---|
| ⚔️ Versus | Enfrenta a un rival concreto. El que más rutas acumule gana. |
| 🧭 Solitario | Compite contra tus propios récords. Conquista toda tu zona. |
| 🏆 Conquista | Domina el mayor número de rutas en un tiempo determinado. |

---

## 🛠️ Tecnologías

| Tecnología | Uso |
|---|---|
| HTML5 | Estructura semántica de la landing y la app |
| CSS3 | Variables CSS, Grid, Flexbox, animaciones, media queries |
| JavaScript ES6+ | Lógica completa: async/await, fetch, localStorage |
| [MapLibre GL JS v4](https://maplibre.org/) | Mapa 3D interactivo open-source, sin token |
| [OSRM](https://project-osrm.org/) | Trazado real de rutas por carretera y sendero |
| CARTO Dark tiles | Tiles de mapa oscuros, libres y sin token |
| AWS Elevation Tiles | Modelo digital de elevación para terreno 3D |
| Google Fonts | Playfair Display · Barlow Condensed · Barlow |
| MySQL 8.0 | Base de datos relacional (producción) |

> **Sin dependencias de pago.** Todas las APIs y tiles utilizados son gratuitos y no requieren token.

---

## 📁 Estructura del proyecto

```
routeclaim/
│
├── index.html              # Landing page + app integrada (punto de entrada)
├── styles.css              # Estilos de la landing page
├── app.css                 # Estilos de la app funcional (post-login)
├── main.js                 # Lógica completa: mapa, GPS, conquistas, historial
├── routeclaim_v2.sql       # Schema MySQL completo con datos semilla
├── url.txt                 # URL de acceso al hosting desplegado
└── README.md               # Este archivo
```

### Archivos de documentación (entregables del PFC)
```
├── RouteClaim_Memoria_PFC.docx     # Memoria técnica completa
├── brand-identity.html             # Manual de imagen corporativa
```

---

## 💻 Instalación y uso local

### Opción 1 — Doble clic (sin instalar nada)

```
1. Descarga o clona el repositorio
2. Abre la carpeta del proyecto
3. Haz doble clic en index.html
4. Se abre directamente en el navegador
```

> Necesitas conexión a internet para las Google Fonts, los tiles del mapa y OSRM.

### Opción 2 — Live Server en VS Code (recomendado para desarrollo)

```bash
# 1. Abre VS Code
# 2. File → Open Folder → selecciona la carpeta routeclaim
# 3. Instala la extensión Live Server (Ritwick Dey)
# 4. Clic derecho sobre index.html → "Open with Live Server"
# 5. Abre en http://localhost:5500
```

### Opción 3 — Servidor Python

```bash
cd ruta/a/tu/carpeta/routeclaim
python -m http.server 8000
# Abre http://localhost:8000 en el navegador
# Para detener: Ctrl + C
```

---

## 🌐 Despliegue

La aplicación es **100% estática** — no requiere back-end, PHP, Node.js ni configuración de servidor.

### Netlify (recomendado — drag & drop)

```
1. Crea cuenta en netlify.com
2. Arrastra la carpeta del proyecto al dashboard
3. URL disponible en segundos: https://<nombre>.netlify.app
4. HTTPS automático incluido (necesario para GPS en móvil)
```

### GitHub Pages

```bash
# 1. Crea un repositorio en GitHub
# 2. Sube los archivos
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/tu-usuario/routeclaim.git
git push -u origin main

# 3. Settings → Pages → Branch: main → Save
# URL: https://tu-usuario.github.io/routeclaim
```

### Vercel

```
1. Conecta tu repositorio GitHub en vercel.com
2. Import Project → Deploy
3. URL: https://routeclaim.vercel.app
```

> ⚠️ **Importante:** El GPS real del navegador requiere **HTTPS**. En localhost funciona sin HTTPS. En producción usa siempre un hosting con certificado SSL (todos los mencionados lo incluyen gratis).

---

## 🗺️ Rutas incluidas

12 rutas reales de la Comunitat Valenciana con trazado calculado por OSRM:

| # | Ruta | Disciplina | Distancia | Dificultad |
|---|---|---|---|---|
| 1 | Vía Verde del Serpis | 🚴 Bicicleta | 45 km | Fácil |
| 2 | Puentes Colgantes de Chulilla | 🥾 Trekking | 9 km | Media |
| 3 | Parque Natural Turia – Ruta Roja | 🏃 Running | 12 km | Media |
| 4 | Forat de Bernia | 🥾 Trekking | 9 km | Media |
| 5 | Vía Verde Ojos Negros | 🚴 Bicicleta | 80 km | Fácil |
| 6 | Marjal de Pego – Oliva | 🚴 Bicicleta | 18 km | Fácil |
| 7 | Sierra Calderona – Cumbres | 🥾 Trekking | 14 km | Difícil |
| 8 | Paseo Ribera del Xúquer | 🏃 Running | 7 km | Fácil |
| 9 | Montanejos – Barranco del Mijares | 🥾 Trekking | 10 km | Media |
| 10 | Coll de Rates – Costa Blanca | 🚴 Bicicleta | 35 km | Difícil |
| 11 | Running Malvarrosa – Port Saplaya | 🏃 Running | 8 km | Fácil |
| 12 | Penyagolosa – Cima | 🥾 Trekking | 16 km | Difícil |

---

## 🗄️ Base de datos

El fichero `routeclaim_v2.sql` contiene el schema completo para **MySQL 8.0+**:

```bash
# Importar en MySQL
mysql -u root -p < routeclaim_v2.sql

# O desde phpMyAdmin:
# Importar → seleccionar routeclaim_v2.sql → Continuar
```

### Tablas principales

| Tabla | Descripción |
|---|---|
| `usuarios` | Perfil, color, bandera, disciplina, puntos y rutas (JSON) |
| `rutas` | Nombre, coordenadas, dificultad, conquistador y récord |
| `actividades` | Log de cada recorrido completado con tiempo y distancia |
| `conquistas` | Historial de cambios de propietario de cada ruta |
| `partidas` | Sesiones de juego entre usuarios (modos Versus/Conquista) |
| `notificaciones` | Alertas de ruta arrebatada, retos y récords |
| `ranking_zona` | Snapshots semanales del ranking por ciudad |

---

## 🎨 Identidad corporativa

### Paleta de colores

| Token | Hex | Uso |
|---|---|---|
| Olive (principal) | `#7A9968` | CTAs, rutas propias, highlights |
| Teal (secundario) | `#2E6B7E` | Rival, agua, elementos secundarios |
| Forest (fondo 2) | `#1A3D2E` | Superficies de tarjetas |
| Ink (fondo) | `#0D1A14` | Fondo principal |
| Rival Red | `#C0604A` | Alertas, acciones destructivas |
| Cream | `#F0EBE1` | Textos principales |

### Tipografía

| Familia | Uso |
|---|---|
| Playfair Display | Títulos, números grandes, logo |
| Barlow Condensed | Navegación, botones, etiquetas, UI |
| Barlow | Cuerpo de texto, descripciones |

### Logo

SVG vectorial: semicírculo con rayos de sol, tres picos de montaña con nieve en el central y cinta banner con puntas laterales. Disponible en `index.html` (inline SVG) y documentado en `brand-identity.html`.

---

## 👤 Autor

**Juan David Zuluaga Granados**
Ciclo Formativo de Grado Superior — Desarrollo de Aplicaciones Web (DAW)
Curso 2024 – 2025

---

## 📄 Licencia

Proyecto académico desarrollado como PFC del CFGS DAW.
Todos los derechos reservados © 2025 Juan David Zuluaga Granados.

---

*RouteClaim — Reclama tu ruta. Defiende tu zona.* 🏔️
