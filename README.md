# 🖋️ Manuela Ríos — Landing Page

Proyecto de landing page estática para **Manuela Ríos Micropigmentación**, diseñado para demostrar cómo se puede crear una web **bien organizada, optimizada y profesional** sin necesidad de frameworks pesados.

Todo el código está en la carpeta `public/` y la estructura sigue buenas prácticas de **SEO**, **accesibilidad**, **rendimiento**, **calidad de código**, y **automatización con GitHub Actions**.

Gracias por tu visita !

---
```
## 📁 Estructura del proyecto

manuelarios/
│
├── public/                 # Archivos estáticos
│   ├── index.html          # Landing principal
│   ├── css/
│   ├── js/
│   ├── img/
│   └── assets, favicons…
│
├── .github/workflows/      # CI/CD (lint + deploy a GitHub Pages)
├── .husky/                 # Hooks pre-commit y pre-push
├── package.json            # Scripts de calidad y herramientas
├── pnpm-lock.yaml
└── README.md
```
---

## 🧰 Scripts disponibles

Este proyecto tiene configuradas herramientas de calidad como **Prettier**, **ESLint**, **HTMLHint**, **Stylelint** y **broken-link-checker**.

Ejecuta los scripts desde la raíz del proyecto:

### 📌 Instalar dependencias

pnpm install

---

## ▶️ Servir la web en local
(Usando `serve`, incluido en devDependencies)

npx serve public -l 4173

Opcionalmente, añade un script `dev` al package.json:

"dev": "serve public -l 4173"

Y entonces:

pnpm dev

---

## ✔️ Scripts de linting / calidad

### Formatear automáticamente
pnpm format

### Comprobar formato (lo que usa el CI)
pnpm run lint:format

### Lint de HTML
pnpm run lint:html

### Lint de CSS
pnpm run lint:css

### Lint de JavaScript
pnpm run lint:js

### Lint completo (formato + HTML + CSS + JS)
pnpm lint

### Comprobar enlaces rotos
pnpm run lint:links

---

## 🚀 Deploy

El proyecto se despliega automáticamente mediante **GitHub Pages** a través del workflow `deploy.yml`.

Cada push a `main`:

1. Instala dependencias  
2. Ejecuta todos los linters  
3. Si todo está correcto → publica la carpeta `public/`

Si el formato o el lint falla, GitHub detendrá el deploy.  
Para corregirlo rápido:

pnpm format
git add .
git commit -m "Fix formatting"
git push

---

## 📄 Licencia

Proyecto con fines demostrativos.  
Puedes inspirarte en él para tus propias landing pages.
