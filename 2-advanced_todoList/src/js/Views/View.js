export default class View {
  _data;

  render(data, renderHome = false, handler) {
    if (!data) console.log("no data");
    if (!data) return;

    this._data = data;
    const markup = this._generateMarkup(this._data);

    this._parentElement.insertAdjacentHTML("afterbegin", markup);

    if (renderHome === false) return;

    this._AddHandlersElement(
      this._parentElement.querySelector(`[data-id="${this._data.id}"]`),
      handler
    );
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }
}
