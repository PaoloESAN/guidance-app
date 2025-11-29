# Guidance App

Aplicación de orientación vocacional construida con **Wails**, **Next.js 16**, **Tailwind CSS v4**, **Ant Design** y **Supabase**.

## Acerca del Proyecto

Guidance App es una herramienta diseñada para ayudar en el proceso de orientación vocacional. Combina un backend en Go con un frontend moderno en Next.js, empaquetado como aplicación de escritorio mediante Wails.

## Requisitos Previos

- [Go](https://golang.org/dl/) 1.21 o superior
- [Node.js](https://nodejs.org/) 18 o superior
- [Wails CLI](https://wails.io/docs/gettingstarted/installation)
- Cuenta en [Supabase](https://supabase.com/)
- API Key de [Groq](https://console.groq.com/home)

## Configuración

1. **Clona el repositorio:**
```bash
git clone <url-del-repositorio>
cd guidance-app
```

2. **Configura las variables de entorno:**

Crea o edita el archivo `.env` en la **carpeta raíz** del proyecto:
```
GROQ_API_KEY="tu api key de groq"
```
> Puedes obtener tu API key en: https://console.groq.com/home

Crea o edita el archivo `.env` en la carpeta `frontend/`:
```
NEXT_PUBLIC_SUPABASE_URL="tu url de supabase"
NEXT_PUBLIC_SUPABASE_ANON_KEY="tu clave de supabase"
```

## Desarrollo en Vivo

Para ejecutar en modo de desarrollo en Wails usa:

```bash
wails dev
```

Esto iniciará un servidor de desarrollo que proporciona recarga rápida de los cambios en el frontend.

Si prefieres desarrollar en un navegador y tener acceso a los métodos de Go, también hay un servidor de desarrollo disponible en http://localhost:34115.

> **Nota:** Para la experiencia completa, se recomienda usar `wails dev` desde la carpeta raíz del proyecto en lugar de ejecutar el frontend de forma independiente.

## Compilación

Para construir un paquete redistribuible en modo producción:

```bash
wails build
```

## Configuración del Proyecto

Puedes configurar el proyecto editando `wails.json`. Más información sobre la configuración del proyecto está disponible en: https://wails.io/docs/reference/project-config

## Estructura del Proyecto

```
guidance-app/
├── frontend/          # Aplicación Next.js
│   ├── app/           # App Router de Next.js
│   ├── components/    # Componentes React
│   └── ...
├── main.go            # Punto de entrada de Go
├── app.go             # Lógica de la aplicación
├── wails.json         # Configuración de Wails
└── README.md
```

## Tecnologías

- **Backend:** Go + Wails
- **Frontend:** Next.js 16, React
- **Estilos:** Tailwind CSS v4, Ant Design
- **Base de datos:** Supabase
- **IA:** Groq API

---

## Créditos

Este proyecto está basado en la plantilla de Wails para Next.js con Tailwind CSS.

**Plantilla original:** [wails-nextjs-tailwind-template](https://github.com/kairo913/wails-nextjs-tailwind-template) por [kairo913](https://github.com/kairo913)

Para crear un nuevo proyecto con esta plantilla:
```bash
wails init -n "Your Project Name" -t https://github.com/kairo913/wails-nextjs-tailwind-template
```
