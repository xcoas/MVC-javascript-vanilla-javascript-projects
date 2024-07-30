import { state, modifyState } from "./model";

class PokeView {
  _ParentElement = document.querySelector(".poke--grid");
  _data;

  _giveObserver(element, data) {
    const obsCallbackFunction = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log("Element is intersecting:", entry);
          entry.target.classList.remove("hidden");
          state.maxPokemons += 1;
          state.pokemonIndex += 1;
          observer.unobserve(entry.target); // Unobserve once the element is visible
          if (state.maxPokemons > 20) {
            console.log(state.maxPokemons);
            modifyState();
            this._renderCard(data);
          } // Call renderCard with the data
        }
      });
    };

    const obsOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5, // Adjust as needed
    };

    const observer = new IntersectionObserver(obsCallbackFunction, obsOptions);
    observer.observe(element);
  }

  _renderCard(data) {
    this._data = data;
    const markup = this._generateMarkup(this._data);
    this._ParentElement.insertAdjacentHTML("beforeend", markup);

    const newCard = this._ParentElement.lastElementChild;
    this._giveObserver(newCard, this._data); // Pass data to the observer function
  }

  _generateMarkup(data) {
    const backgroundStyle =
      data.types.length > 1
        ? `background: linear-gradient(90deg, var(--card-${data.types[0]}-color) 50%, var(--card-${data.types[1]}-color) 50%);`
        : "";

    return `
      <div class="poke--card hidden ${
        data.types.length > 1 ? "" : `${data.types[0]}__type`
      }" style="${backgroundStyle}">
          <img src="${
            data.pokemonImg
          }" class="poke--image" alt="pokemon image" />
          <h2 class="poke--name">${data.pokemonName}</h2>
          <div class="poke--row">
            <div class="poke--column">
              <h3>Height</h3>
              <h2 class="poke--height">${data.pokemonHeight}</h2>
            </div>
            <div class="poke--column">
              <h3>Weight</h3>
              <h2 class="poke--weight">${data.pokemonWeight}</h2>
            </div>
          </div>
        </div>
    `;
  }
}

export default new PokeView();
