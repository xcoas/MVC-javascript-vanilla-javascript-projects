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
    this._parentElement.innerHTML = "";
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
        }.bind(this)
      );
    });
    document.querySelectorAll(".task--delete--btn").forEach((el) => {
      el.addEventListener(
        "click",
        function (e) {
          const element = e.srcElement;
          const taskId = Number(element.closest("div").dataset.taskidhtml);

          const taskIndex = selectedList.tasks.findIndex(
            (task) => task.taskId === taskId
          );

          if (taskIndex !== -1) {
            selectedList.tasks.splice(taskIndex, 1);
            element.closest("div").remove();
          }
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

  _toggleNewTaskPopup() {
    document.querySelector(".newTaskPopup").classList.toggle("hidden");
  }

  _AddnewTaskPopup() {
    [
      document.querySelector(".new--task--button"),
      document.querySelector(".task--edit--btn--close"),
      document.querySelector(".outlay--newTask"),
    ].forEach(
      function (el) {
        el.addEventListener("click", this._toggleNewTaskPopup);
      }.bind(this)
    );
  }

  _FormatDate(date) {
    console.log(date.getMonth());
    return `${String(date.getDate()).padStart(2, "0")}.${String(
      date.getMonth()
    ).padStart(2, "0")}.${date.getFullYear()}`;
  }

  _InitializeTodoDate() {
    const currdate = new Date();
    const formattedDate = this._FormatDate(currdate);
    document.querySelector(".date").innerHTML = formattedDate;
  }

  _AddnewTaskConfirmValidation() {
    document.querySelector(".task--edit--btn--confirm").addEventListener(
      "click",
      function (e) {
        const NewTaskName = document.querySelector(
          ".task--edit--name--label"
        ).value;
        if (!NewTaskName) return;

        document.querySelector(".task--edit--name--label").value = "";

        let currList = state.Lists.find(
          (el) => el.id === state.currListSelectedId
        );

        state.Lists.find((el) => el.id === state.currListSelectedId).tasks.push(
          {
            taskId: currList.tasks.length,
            taskName: NewTaskName,
            completed: false,
          }
        );

        this._GenerateTasks(currList);

        console.log(state.Lists);

        this._toggleNewTaskPopup();
      }.bind(this)
    );
  }
}

export default new todoView();
