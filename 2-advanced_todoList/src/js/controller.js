import { state } from "./model";
import { addNewListToState } from "./model";
import listView from "./Views/listView";
import todoView from "./Views/todoView";

const GenerateTodoLists = function () {
  listView._clear();
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
};
init();
