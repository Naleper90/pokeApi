const entrada = document.getElementById("entrada");
const botonBuscar = document.getElementById("buscar");
const botonLimpiar = document.getElementById("limpiar");
const contenedorImagen = document.getElementById("contenedorImagen");
const imagen = document.getElementById("imagen");
const nombre = document.getElementById("nombre");

// Mensaje inicial y ejemplos
const mensajeInicial = document.querySelector(".mensaje-inicial");
const ejemplos = document.querySelector(".ejemplos");

// URL base de la PokéAPI
const API = "https://pokeapi.co/api/v2/pokemon/";
let ultimoPokemon = null;

// Eventos principales
botonBuscar.addEventListener("click", buscarPokemon);
botonLimpiar.addEventListener("click", limpiar);
entrada.addEventListener("keydown", (e) => {
  if (e.key === "Enter") buscarPokemon();
});

// Click en la tarjeta para ir al detalle
if (contenedorImagen) {
  contenedorImagen.addEventListener("click", () => {
    if (!ultimoPokemon) return;
    localStorage.setItem("pokemonSeleccionado", JSON.stringify(ultimoPokemon));
    window.location.href = "detalle.html";
  });
}

// Click en etiquetas de ejemplo
document.querySelectorAll(".tag").forEach(tag => {
  tag.addEventListener("click", () => {
    entrada.value = tag.textContent.toLowerCase();
    buscarPokemon();
  });
});

// Buscar Pokémon por nombre o ID
async function buscarPokemon() {
  const valor = entrada.value.trim().toLowerCase();
  if (!valor) return;
  await obtenerPokemon(valor);
}

// Obtener datos desde la API
async function obtenerPokemon(identificador) {
  mostrarMensaje("🔍 Buscando...", "loading");
  
  try {
    console.log("1. Iniciando fetch..."); 
    const res = await fetch(API + identificador);
    console.log("2. Respuesta recibida:", res.ok); 
    if (!res.ok) throw new Error("Pokémon no encontrado");
    
    const data = await res.json();
    console.log("3. Pokémon encontrado:", data.name);
    ultimoPokemon = data;
    mostrarMensaje("");
    mostrarPokemon(data);
  } catch (e) {
    console.log("4. ERROR CAPTURADO:", e.message); 
    mostrarMensaje("❌ Pokémon no encontrado. Intenta con otro nombre o ID.", "error");
  }
}

// Mostrar mensaje dentro del buscador
function mostrarMensaje(texto, tipo = "error") {
  let mensaje = document.getElementById("mensaje");

  if (!mensaje) {
    const buscador = document.querySelector(".buscador");
    mensaje = document.createElement("p");
    mensaje.id = "mensaje";
    mensaje.style.marginTop = "8px";
    mensaje.style.fontWeight = "600";
    mensaje.style.color = "#e3350d";
    mensaje.style.fontSize = "0.95rem";
    mensaje.style.textAlign = "center";
    buscador.appendChild(mensaje);
  }

  mensaje.textContent = texto;
  mensaje.style.display = texto ? "block" : "none";

  if (tipo === "loading") {
    mensaje.style.color = "#2a75bb";
  } else {
    mensaje.style.color = "#e3350d"; 
  }
}


// Mostrar datos básicos 
function mostrarPokemon(data) {
  nombre.textContent = data.name;

  const imgUrl =
    data?.sprites?.other?.["official-artwork"]?.front_default ||
    data?.sprites?.front_default || "";

  if (imgUrl) {
    imagen.src = imgUrl;
    contenedorImagen.hidden = false;
  } else {
    contenedorImagen.hidden = true;
  }

  // Ocultar mensaje inicial y ejemplos
  if (mensajeInicial) mensajeInicial.style.display = "none";
  if (ejemplos) ejemplos.style.display = "none";

  // Color dinámico según tipo principal 
  const tipoPrincipal = data.types[0].type.name;
  const coloresTipo = {
    normal: "#A8A77A", 
    fire: "#EE8130", 
    water: "#6390F0", 
    electric: "#F7D02C",
    grass: "#7AC74C", 
    ice: "#96D9D6", 
    fighting: "#C22E28", 
    poison: "#A33EA1",
    ground: "#E2BF65", 
    flying: "#A98FF3", 
    psychic: "#F95587", 
    bug: "#A6B91A",
    rock: "#B6A136", 
    ghost: "#735797", 
    dragon: "#6F35FC", 
    dark: "#705746",
    steel: "#B7B7CE", 
    fairy: "#D685AD"
  };

  const colorTipo = coloresTipo[tipoPrincipal] || "#ffcb05";

  // Nombre del color del tipo
  nombre.style.color = colorTipo;

  // Aplicar color dinámico a la tarjeta (.imagen)
  if (contenedorImagen) {
    contenedorImagen.style.setProperty('--tipo-color', colorTipo);
  }
}

//Autocompletado y sugerencias

const listaSugerencias = document.createElement("ul");
listaSugerencias.id = "sugerencias";
document.querySelector(".buscador").appendChild(listaSugerencias);

let todosLosNombres = [];
let sugeridos = [];
let sugIndex = -1;

// Cargar todos los Pokémon una sola vez
async function cargarListaPokemon() {
  if (todosLosNombres.length) return;
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1025");
  const data = await res.json();
  todosLosNombres = data.results.map(p => p.name);
}

function renderSugerencias(texto) {
  listaSugerencias.innerHTML = "";
  sugIndex = -1;

  if (texto.length == 0) return;
  //no filtrar a pelo
  sugeridos = todosLosNombres
    .filter(n => n.startsWith(texto))
    .slice(0, 8);

  const re = new RegExp(`^(${texto})`, "i");

  sugeridos.forEach((nombre, i) => {
    const li = document.createElement("li");
    li.className = "sug-item";
    li.dataset.value = nombre;
    li.innerHTML = nombre.replace(re, "<strong>$1</strong>") + "";
    li.addEventListener("click", () => {
      entrada.value = nombre;
      listaSugerencias.innerHTML = "";
      buscarPokemon();
    });
    listaSugerencias.appendChild(li);
  });
}

//Input mostrar sugerencias
entrada.addEventListener("input", async () => {
  const texto = entrada.value.trim().toLowerCase();

  await cargarListaPokemon();

  if (texto.length == 0) {
    listaSugerencias.innerHTML = "";
    return;
  }
  renderSugerencias(texto);
});

// Teclado: Enter Esc
entrada.addEventListener("keydown", (e) => {
  const items = [...listaSugerencias.querySelectorAll(".sug-item")];
  if (!items.length) return;

  if (e.key === "ArrowDown") {
    e.preventDefault();
    sugIndex = (sugIndex + 1) <= items.length - 1 ? sugIndex + 1 : 0;
    items.forEach(el => el.classList.remove("sug-active"));
    items[sugIndex].classList.add("sug-active");
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    sugIndex = (sugIndex - 1) >= 0 ? sugIndex - 1 : items.length - 1;
    items.forEach(el => el.classList.remove("sug-active"));
    items[sugIndex].classList.add("sug-active");
  } else if (e.key === "Enter") {
    if (sugIndex >= 0) {
      e.preventDefault();
      const elegido = items[sugIndex].dataset.value;
      entrada.value = elegido;
      listaSugerencias.innerHTML = "";
      buscarPokemon();
    }
  } else if (e.key === "Escape") {
    listaSugerencias.innerHTML = "";
  }
});

// Cerrar al hacer clic fuera
document.addEventListener("click", (e) => {
  if (!document.querySelector(".buscador")?.contains(e.target)) {
    listaSugerencias.innerHTML = "";
  }
});

// Al limpiar, vacía sugerencias también
const _limpiarOriginal = limpiar;
limpiar = function () {
  _limpiarOriginal();
  if (listaSugerencias) listaSugerencias.innerHTML = "";
};


// Limpiar búsqueda y restaurar estado inicial
function limpiar() {
  entrada.value = "";
  nombre.textContent = "—";

  if (contenedorImagen) {
    contenedorImagen.hidden = true;
    contenedorImagen.style.setProperty('--tipo-color', '#ffcb05'); 
  }

  nombre.style.color = "#ffcb05";
  ultimoPokemon = null;

  if (mensajeInicial) mensajeInicial.style.display = "block";
  if (ejemplos) ejemplos.style.display = "block";
}
