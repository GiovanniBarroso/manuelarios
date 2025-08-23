# 🌟 Manuela Rios Micropigmentación

Sitio web profesional para servicios de micropigmentación en Dos Hermanas, Sevilla.

## 📁 Estructura del Proyecto

```
ManuelaRios/
├── index.html              # Página principal
├── css/
│   └── styles.css          # Estilos principales
├── js/
│   └── script.js           # JavaScript funcionalidades
├── img/
│   ├── hero-bg.jpg         # Imagen principal del hero
│   ├── about-image.jpg     # Imagen sección "Sobre nosotros"
│   ├── gallery/            # Imágenes de la galería
│   │   ├── cejas-1.jpg
│   │   ├── labios-1.jpg
│   │   ├── ojos-1.jpg
│   │   ├── cejas-2.jpg
│   │   └── labios-2.jpg
│   └── icons/
│       ├── favicon.ico
│       └── apple-touch-icon.png
└── README.md               # Este archivo
```

## 🚀 Pasos para el Despliegue

### 1. Preparar las Imágenes

Necesitas conseguir y optimizar estas imágenes:

**Imágenes obligatorias:**
- `img/hero-bg.jpg` (1920x1080px) - Fondo principal
- `img/about-image.jpg` (500x400px) - Foto profesional de Manuela
- `img/gallery/cejas-1.jpg` (400x500px) - Trabajo de cejas
- `img/gallery/labios-1.jpg` (400x500px) - Trabajo de labios
- `img/gallery/ojos-1.jpg` (400x500px) - Trabajo de ojos
- `img/gallery/cejas-2.jpg` (400x500px) - Otro trabajo de cejas
- `img/gallery/labios-2.jpg` (400x500px) - Otro trabajo de labios

**Imágenes SEO (opcionales pero recomendadas):**
- `img/og-image.jpg` (1200x630px) - Para redes sociales
- `img/twitter-card.jpg` (1200x600px) - Para Twitter

### 2. Registrar el Dominio

#### Opciones recomendadas para `manuelarios.makeup`:

**Proveedores de dominios:**
- **Namecheap** (recomendado) - ~12€/año
- **GoDaddy** - ~15€/año  
- **Gandi** - ~15€/año
- **Google Domains** - ~12€/año

**Pasos:**
1. Ve a la página del proveedor
2. Busca `manuelarios.makeup`
3. Si está disponible, añade al carrito
4. Completa la compra (necesitarás datos personales/empresa)

### 3. Elegir Hosting

#### Opciones recomendadas (fácil despliegue):

**Hosting Gratuito/Fácil:**
- **Netlify** (RECOMENDADO)
  - ✅ Gratuito para sitios estáticos
  - ✅ SSL automático
  - ✅ Dominio personalizado incluido
  - ✅ Deploy automático desde GitHub

- **Vercel**
  - ✅ Gratuito
  - ✅ Muy rápido
  - ✅ SSL automático

**Hosting Tradicional:**
- **SiteGround** - ~6€/mes
- **Hostinger** - ~3€/mes

### 4. Despliegue en Netlify (RECOMENDADO)

#### Método 1: Drag & Drop (Más fácil)
1. Ve a [netlify.com](https://netlify.com)
2. Crea una cuenta gratuita
3. Arrastra toda la carpeta `ManuelaRios/` a la zona de "Deploy"
4. Netlify te dará una URL temporal
5. Ve a Site Settings > Domain Management
6. Añade tu dominio personalizado `manuelarios.makeup`
7. Configura los DNS según las instrucciones

#### Método 2: Con GitHub (Recomendado para futuras actualizaciones)
1. Crea una cuenta en [GitHub](https://github.com)
2. Crea un nuevo repositorio llamado `manuela-rios-web`
3. Sube todos los archivos del proyecto
4. Ve a Netlify y conecta con GitHub
5. Selecciona tu repositorio
6. Deploy automático cada vez que hagas cambios

### 5. Configurar DNS del Dominio

Una vez tengas el dominio y hosting:

1. En tu proveedor de dominio, ve a DNS Settings
2. Añade estos registros DNS (ejemplo para Netlify):
   ```
   Type: CNAME
   Name: www
   Value: tu-sitio.netlify.app

   Type: A
   Name: @
   Value: [IP que te proporcione Netlify]
   ```

### 6. Optimizaciones Post-Despliegue

#### SEO y Performance:
- [ ] Envía el sitio a Google Search Console
- [ ] Configura Google Analytics (opcional)
- [ ] Verifica que todas las imágenes cargan correctamente
- [ ] Prueba la velocidad en PageSpeed Insights
- [ ] Verifica el sitio en dispositivos móviles

#### Testing Checklist:
- [ ] Navegación funciona en móvil
- [ ] WhatsApp abre correctamente
- [ ] Instagram abre correctamente
- [ ] Formularios de contacto funcionan
- [ ] Galería se desliza correctamente
- [ ] Servicios se expanden correctamente

## 💰 Costos Estimados

- **Dominio**: 12-15€/año
- **Hosting Netlify**: GRATIS
- **Total primer año**: ~15€
- **Años siguientes**: ~15€/año

## 🛠 Tecnologías Utilizadas

- **HTML5** - Estructura semántica
- **CSS3** - Estilos modernos con variables CSS
- **JavaScript** - Interactividad y efectos
- **AOS** - Animaciones al scroll
- **Font Awesome** - Iconos
- **Google Fonts** - Tipografía (Poppins, Playfair Display)