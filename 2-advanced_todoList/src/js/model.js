export const state = {
  Lists: [
    {
      id: 1,
      name: "zakupy",
      description: "lista zakupów na środe",
      createDate: "08.08.2024",
      tasks: [
        { taskId: 1, taskName: "kupić ", completed: false },
        { taskId: 2, taskName: "kupić mleko", completed: false },
      ],
    },
    {
      id: 2,
      name: "zaky",
      description: "lista zakupów na środe",
      createDate: "07.08.2024",
      tasks: [
        { taskId: 1, taskName: "kupić ", completed: false },
        { taskId: 2, taskName: "kupić mleko", completed: false },
      ],
    },
  ],
  sorted: false,
  currListId: 0,
  currListSelectedId: 0,
  allHTMLListsOnPage: "",
};

export function addNewListToState(ListName) {
  const newId = state.Lists[state.Lists.length - 1].id + 1;
  const date = new Date();
  state.Lists.push({
    id: newId,
    name: ListName,
    description: "",
    createDate: `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`,
    tasks: [],
  });
}
