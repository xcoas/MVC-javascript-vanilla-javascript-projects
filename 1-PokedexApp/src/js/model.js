//tutaj robimy funkcje nie zwiazane z DOM

export const state = {
  pokemonIndex: 1,
  pokemonName: "",
  pokemonImg: "",
  pokemonWeight: 0,
  pokemonHeight: 0,
  types: [],
  maxPokemons: 11,
};

const loadPokemon = async function (id) {
  try {
    const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    const fetchedData = await data.json();
    return fetchedData;
  } catch (err) {
    console.log(err);
  }
};

export const modifyState = async function () {
  const currPokemonObj = await loadPokemon(state.pokemonIndex);
  state.pokemonName = currPokemonObj.name;
  state.pokemonImg = currPokemonObj.sprites.front_default;
  state.pokemonHeight = currPokemonObj.height;
  state.pokemonWeight = currPokemonObj.weight;
  state.types = currPokemonObj.types.map(function (el) {
    return el.type.name;
  });
};
