import View from "./View";
import { TODOPXHEIGHT } from "../config";
import { state } from "../model";

class todoView extends View {
  _parentElement = document.querySelector(".task--list--parent");

  _generateMarkup(taskData) {
    return `<div class="task" data-taskIdHtml="${taskData.taskId}">
            <h3 class="task--name ${
              taskData.completed ? `line__throught` : ``
            }">${taskData.taskName}</h2>
            <i class="fa-solid fa-check task--complete--btn"></i>
            <i class="fa-solid fa-xmark task--delete--btn"></i>
            <div class="small--divider"></div>
          </div>`;
  }

  _toggleLineThroughtClass(el) {
    el.classList.toggle("line__throught");
  }

  _GenerateTasks(selectedList) {
    selectedList.tasks.forEach((task) => {
      const markup = this._generateMarkup(task);
      this._parentElement.insertAdjacentHTML("afterbegin", markup);
    });
    document.querySelectorAll(".task--complete--btn").forEach((el) => {
      el.addEventListener(
        "click",
        function (e) {
          const element = e.srcElement;
          const taskEl = element.closest("div").querySelector(".task--name");
          this._toggleLineThroughtClass(taskEl);
          const taskSelected = selectedList.tasks.find(
            (task) =>
              task.taskId == Number(element.closest("div").dataset.taskidhtml)
          );
          if (taskEl.classList.contains("line__throught")) {
            taskSelected.completed = true;
          } else {
            taskSelected.completed = false;
          }
          console.log(taskSelected);
        }.bind(this)
      );
    });
  }

  _BackToHomePageHandler(handlerFunction) {
    document.querySelector(".back--button").addEventListener(
      "click",
      function () {
        document.querySelector(".main--page").classList.toggle("hidden");
        document.querySelector(".list--page").classList.toggle("hidden");
        this._parentElement.innerHTML = "";
        handlerFunction();
      }.bind(this)
    );
  }
}

export default new todoView();
