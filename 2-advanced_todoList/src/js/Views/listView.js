import View from "./View";
import { TODOPXHEIGHT } from "../config";
import { state } from "../model";
import { hasLetters } from "../helpers";
import todoView from "./todoView";

class listView extends View {
  _parentElement = document.querySelector(".main--main");

  _generateMarkup(data) {
    if (!data) console.log("no data");
    if (!data) return "";
    let markup = "";
    markup += `<div class="todo--list todo--list--closed" data-id="${data.id}">
              <h2 class="todo--date">${
                data.createDate.slice(0, -4) + data.createDate.slice(-2)
              }</h2>
              <h2 class="todo--list--name">${data.name}</h2>
              <div class="divider"></div>
              <div class="closed toggleHidden">
                <h3 class="description">${data.description}...</h3>
              </div>
              <div class="open hidden toggleHidden">
                <div class="todo--list--open--button">Open</div>
                <div class="todo--list--delete--button">Delete</div>`;

    data.tasks.forEach((task) => {
      markup += `<h3 class="todo--task">${task.taskName}</h3>
                <div class="small--divider"></div>`;
    });

    markup += `</div>
              <div class="icon">
                <i class="fa-solid fa-angle-down angle--rotate scroll__list"></i>
              </div>
            </div>`;

    return markup;
  }

  _ChangePageToList() {
    document.querySelector(".main--page").classList.toggle("hidden");
    document.querySelector(".list--page").classList.toggle("hidden");
  }

  _AddHandlersElement(element, GenerateFunction) {
    if (!element) return;

    element
      .querySelector(".scroll__list")
      .addEventListener("click", function (e) {
        const numOftoDos = state.Lists.find(
          (list) => list.id === Number(element.dataset.id)
        ).tasks.length;
        if (element.getBoundingClientRect().height === 200) {
          const heightToDoPx = TODOPXHEIGHT * numOftoDos;
          element.style.height = heightToDoPx + 200 + `px`;
        } else {
          element.style.height = `200px`;
        }
        element.querySelectorAll(".toggleHidden").forEach((element) => {
          element.classList.toggle("hidden");
        });
      });

    element
      .querySelector(".todo--list--open--button")
      .addEventListener("click", (e) => {
        const listId = Number(element.dataset.id);
        this._ChangePageToList();
        const selectedList = state.Lists.find((list) => list.id === listId);
        todoView._GenerateTasks(selectedList);
      });

    element
      .querySelector(".todo--list--delete--button")
      .addEventListener("click", function (e) {
        const listId = Number(this.closest(".todo--list").dataset.id);
        const listIndex = state.Lists.findIndex((list) => list.id === listId);
        state.Lists.splice(listIndex, 1);
        GenerateFunction();
        console.log(state.Lists);
      });
  }

  _CloseListViewPopup() {
    document.querySelector(".newlistPopup").classList.add("hidden");
    document.querySelector(".list--name--label").value = "";
  }

  _ToggleAddNewListPopup() {
    document
      .querySelector(".new--list--button")
      .addEventListener("click", function (e) {
        document.querySelector(".newlistPopup").classList.remove("hidden");
      });
  }

  _insertAddNewListBtn() {
    document
      .querySelector(".main--main")
      .insertAdjacentHTML(
        "beforeend",
        `<div class="new--list--button">Add new List</div>`
      );
    this._ToggleAddNewListPopup();
  }

  _AddHandlersNewListPopup() {
    [
      document.querySelector(".outlay--newList"),
      document.querySelector(".close--newList--popup"),
    ].forEach((closer) =>
      closer.addEventListener("click", this._CloseListViewPopup)
    );
  }

  _addNewTaskListHandler(handler, genFunction) {
    document.querySelector(".add--newList--btn--submit").addEventListener(
      "click",
      function (e) {
        e.preventDefault();
        if (!hasLetters(document.querySelector(".list--name--label").value))
          return;

        handler(document.querySelector(".list--name--label").value);
        genFunction();

        this._CloseListViewPopup();
      }.bind(this)
    );
  }
}

export default new listView();
