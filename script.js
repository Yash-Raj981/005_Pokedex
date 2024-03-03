const pokemonImageUrl = "https://assets.pokemon.com/assets/cms2/img/pokedex/full/"; /// 1010 image limit
const pokemonImageUrl2 = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"; /// extrapokes images
const pokemonApiUrl = "https://pokeapi.co/api/v2/pokemon/";
const poke_box = document.getElementById("pokemons");

const normal_poke_count = 1010; // 1 to 1010
const extra_poke_count = 271; // 10001 to 10271
const poke_count = 1010; //default
const colors = {
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
  fairy: "#D685AD",
};

function toUpper(s) {
  return s[0].toUpperCase() + s.slice(1);
}

const fetchPokemons = async () => {
  for (let i = 1; i <= poke_count; i++) {
    const url = pokemonApiUrl + `${i}`;
    const response = await fetch(url);
    let data = await response.json();
    createPokemonCard(data);
  }
};

const createPokemonCard = (pokemon) => {
  const pokeCard = document.createElement("div");
  pokeCard.classList.add("poke-card");

  let id = pokemon.id.toString().padStart(3, "0");
  let name = toUpper(pokemon.name);
  let types = pokemon.types.map((type) => type.type.name);

  let type;

  if (types.length > 1) {
    type = toUpper(types[0]) + ", " + toUpper(types[1]);
  } else {
    type = toUpper(types[0]);
  }
  pokeCard.style.background = colors[types[0]];

  const pokemonInnerHTML = `
    <div class="poke-card--front">
      <div class="poke-image">
          <img src="${pokemonImageUrl + id}.png"  alt="${name}">
      </div>
      <div class="poke-info">
          <span class="pokemon-id">#${id}</span>
          <p class="pokemon-name">${name}</p>
          <span class="pokemon-type">Type: ${type}</span>
      </div>
      </div>
      <div class="poke-card--back"></div>`;
  pokeCard.innerHTML = pokemonInnerHTML;
  poke_box.appendChild(pokeCard);
};

fetchPokemons();
