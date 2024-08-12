import View from "./View";
import { TODOPXHEIGHT } from "../config";
import { state } from "../model";

class CalendarView extends View {
  _parentElement = document.querySelector(".calendar");
  _Currday = new Date().getDate();

  _generateMarkup(iteration, currday) {
    return `<div class="calendar--box ${
      iteration !== 0 ? `not--` : ``
    }current--day">${currday + iteration}</div>`;
  }

  _insertCalendarElements(numOfCalElements) {
    for (let i = 0; i < numOfCalElements; i++) {
      const markup = this._generateMarkup(i, this._Currday);
      this._parentElement.insertAdjacentHTML("beforeend", markup);
    }
  }

  _initializeCalendar() {
    const numOfCalElements = 7;
    this._insertCalendarElements(numOfCalElements);
    setInterval(() => {
      this._parentElement.innerHTML = "";
      this._insertCalendarElements(numOfCalElements);
    }, 60000);
  }
}

export default new CalendarView();
