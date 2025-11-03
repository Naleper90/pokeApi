# 🎮 Pokédex - Buscador de Pokémon

Aplicación web interactiva para buscar y explorar información detallada de Pokémon utilizando la [PokéAPI](https://pokeapi.co/).

## ✨ Características

- 🔍 **Búsqueda inteligente** con autocompletado
- ⌨️ **Navegación con teclado** (flechas, Enter, Esc)
- 🎨 **Colores dinámicos** según el tipo del Pokémon
- 📊 **Estadísticas visuales** con barras de progreso
- 📱 **Diseño responsive** adaptado a móviles
- 🌍 **Descripciones en español**
- 🔄 **Información de generaciones** (Kanto, Johto, etc.)

## 🚀 Tecnologías utilizadas

- HTML5
- CSS3 (Flexbox, animaciones)
- JavaScript (ES6+)
- Fetch API
- LocalStorage
- [PokéAPI](https://pokeapi.co/)

## 📂 Estructura del proyecto
```
pokeApi/
├── index.html          # Página principal con buscador
├── detalle.html        # Página de detalles del Pokémon
├── css/
│   ├── styles.css      # Estilos de la página principal
│   └── dstyles.css     # Estilos de la página de detalles
├── js/
│   ├── script.js       # Lógica del buscador
│   └── detalle.js      # Lógica de la página de detalles
└── .gitignore
```

## 🎯 Funcionalidades

### Página principal (index.html)
- Buscador con sugerencias en tiempo real
- Búsqueda por nombre o ID
- Ejemplos clicables
- Indicador de carga
- Manejo de errores

### Página de detalles (detalle.html)
- Imagen oficial del Pokémon
- Información básica (ID, tipo, altura, peso)
- Descripción de la Pokédex
- Generación de origen
- Lista de habilidades
- Estadísticas base con visualización

## 🎨 Características visuales

- Cursor personalizado (Pokébola)
- Efectos hover en tarjetas
- Animaciones suaves
- Color de tarjeta adaptado al tipo del Pokémon
- Fuentes personalizadas (Press Start 2P, Russo One)

## 💻 Cómo usar

1. Clona el repositorio:
```bash
git clone https://github.com/Naleper90/pokeApi.git
```

2. Abre `index.html` en tu navegador

3. ¡Empieza a buscar Pokémon! 🎉

## 📝 Uso

1. Escribe el nombre o ID de un Pokémon en el buscador
2. Selecciona una sugerencia o presiona "Buscar"
3. Haz clic en la tarjeta del Pokémon para ver más detalles
4. En la página de detalles, explora toda la información disponible


## 👨‍💻 Autor

**Natalia Alejo Pérez** - Proyecto de Desarrollo de Aplicaciones Web (DAW)

## 📄 Licencia

Este proyecto es de código abierto y está disponible para fines educativos.

## 🙏 Créditos

- Datos e imágenes: [PokéAPI](https://pokeapi.co/)
- Sprites: [PokeAPI/sprites](https://github.com/PokeAPI/sprites)