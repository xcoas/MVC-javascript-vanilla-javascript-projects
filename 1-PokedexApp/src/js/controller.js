//tutaj używamy funkcji do robienia wszystkiego
import { state, modifyState } from "./model";
import View from "./View";

const init = async function () {
  for (;;) {
    if (state.pokemonIndex >= state.maxPokemons) break;
    await modifyState();
    View._renderCard(state);
    state.pokemonIndex += 1;
  }
};

init();
