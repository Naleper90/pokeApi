// Recuperar los datos del Pokémon almacenado
const data = JSON.parse(localStorage.getItem("pokemonSeleccionado"));

// Referencias al DOM
const nombre = document.getElementById("nombre");
const imagen = document.getElementById("imagen");
const idEl = document.getElementById("id");
const tipo = document.getElementById("tipo");
const altura = document.getElementById("altura");
const peso = document.getElementById("peso");
const habilidades = document.getElementById("habilidades");
const stats = document.getElementById("stats");
const volver = document.getElementById("volver");
const descripcion = document.getElementById("descripcion");
const generacion = document.getElementById("generacion");

// Si hay datos, pintamos la ficha
if (data) {
  nombre.textContent = data.name;

  const imgUrl =
    data?.sprites?.other?.["official-artwork"]?.front_default ||
    data?.sprites?.front_default || "";
  if (imgUrl) imagen.src = imgUrl;

  idEl.textContent = "Nº " + String(data.id).padStart(3, '0');

  const tipos = Array.isArray(data.types) ? data.types : [];
  const tipoPrincipal = tipos[0]?.type?.name || "normal";
  tipo.textContent = "Tipo: " + (tipos.map(t => t.type.name).join(", ") || "—");

  // Color dinámico según tipo
  const colorTipo = TYPE_COLORS[tipoPrincipal] || "#ffcb05";
  nombre.style.color = colorTipo;
  if (descripcion) descripcion.style.borderLeftColor = colorTipo;
  if (generacion) generacion.style.borderLeftColor = colorTipo;

  altura.textContent = "Altura: " + (data.height / 10).toFixed(1) + " m";
  peso.textContent = "Peso: " + (data.weight / 10).toFixed(1) + " kg";

  // HABILIDADES 
habilidades.innerHTML = (data.abilities || [])
  .map(a => {
    const nombre = a.ability.name.replace(/-/g, ' ');
    return `<li style="text-transform: capitalize;">${nombre}</li>`;
  })
  .join("");

  // ESTADÍSTICAS 
  const statNames = {
    hp: "HP",
    attack: "Atk",
    defense: "Def",
    "special-attack": "SpA",
    "special-defense": "SpD",
    speed: "Spe",
  };

  stats.innerHTML = (data.stats || [])
    .map(s => {
      const nombreStat = statNames[s.stat?.name] || s.stat?.name || "—";
      const val = s.base_stat ?? 0;
      const max = 180;
      return `
        <li class="stat-row">
          <span class="stat-name">${nombreStat}</span>
          <progress max="${max}" value="${val}"></progress>
          <span class="stat-val">${val}</span>
        </li>
      `;
    })
    .join("");

  // DESCRIPCIÓN Y GENERACIÓN 
  (async () => {
    try {
      const resSpecies = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${data.id}`);
      if (!resSpecies.ok) throw new Error("No se pudo cargar species");
      const species = await resSpecies.json();

      // Descripción en español (fallback a inglés)
      const entryEs = species.flavor_text_entries?.find(e => e.language.name === "es");
      const entryEn = species.flavor_text_entries?.find(e => e.language.name === "en");
      const texto = (entryEs?.flavor_text || entryEn?.flavor_text || "Descripción no disponible")
        .replace(/\f/g, " ")
        .replace(/\s+/g, " ")
        .trim();
      if (descripcion) descripcion.textContent = texto;

      // Generación
      const genName = species.generation?.name || "";
      const genMap = {
        "generation-i": "Primera (Kanto)",
        "generation-ii": "Segunda (Johto)",
        "generation-iii": "Tercera (Hoenn)",
        "generation-iv": "Cuarta (Sinnoh)",
        "generation-v": "Quinta (Teselia / Unova)",
        "generation-vi": "Sexta (Kalos)",
        "generation-vii": "Séptima (Alola)",
        "generation-viii": "Octava (Galar / Hisui)",
        "generation-ix": "Novena (Paldea)"
      };
      if (generacion) generacion.textContent = genMap[genName] || "—";
    } catch {
      if (descripcion) descripcion.textContent = "Descripción no disponible.";
      if (generacion) generacion.textContent = "—";
    }
  })();

} else {
  document.querySelector("main").innerHTML = "<h2>No hay datos del Pokémon 😕</h2>";
}

// Botón para volver al buscador
volver.addEventListener("click", () => {
  window.location.href = "index.html";
});
