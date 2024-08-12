import { state } from "./model";
import { addNewListToState } from "./model";
import calendarView from "./Views/calendarView";
import listView from "./Views/listView";
import todoView from "./Views/todoView";
import calendarView from "./Views/calendarView";

const GenerateTodoLists = function (sort = false) {
  listView._clear();
  listView._insertSortBtn(GenerateTodoLists);

  if (sort === true && state.sorted === false) {
    state.Lists.sort((a, b) => {
      const dateA = new Date(a.createDate);
      const dateB = new Date(b.createDate);
      return dateA - dateB;
    });
    state.sorted = true;
  } else if (sort === true && state.sorted === true) {
    state.Lists.sort((a, b) => {
      const dateA = new Date(a.createDate);
      const dateB = new Date(b.createDate);
      return dateB - dateA;
    });
    state.sorted = false;
  }

  state.Lists.forEach((list) => {
    listView.render(list, true, GenerateTodoLists);
  });

  listView._insertAddNewListBtn();
};

const controllAddList = function (ListName) {
  addNewListToState(ListName);
};

const init = function () {
  GenerateTodoLists();
  todoView._BackToHomePageHandler(GenerateTodoLists);
  listView._ToggleAddNewListPopup();
  listView._AddHandlersNewListPopup();
  listView._addNewTaskListHandler(controllAddList, GenerateTodoLists);
  listView._InitializeMonthName();
  calendarView._initializeCalendar();
  todoView._AddnewTaskPopup();
  todoView._AddnewTaskConfirmValidation();
  todoView._InitializeTodoDate();
};
init();
