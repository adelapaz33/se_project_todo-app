import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupwithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopupEl.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopupEl.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

function handleCheck(completed) {
  todoCounter.updateCompleted(completed);
}
function handleDelete(completed) {
  if (completed) {
    todoCounter.updateCompleted(false);
  }
  todoCounter.updateTotal(false);
}
const addTodoPopup = new PopupwithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (data) => {
    const name = data.name;
    const dateInput = data.date;

    // Create a date object and adjust for timezone
    const date = new Date(dateInput);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    const id = uuidv4();
    const values = { name, date, id };
    renderTodo(values);
    addTodoPopup.close();
    newTodoValidator.resetValidation();
    todoCounter.updateTotal(true);
  },
});

addTodoPopup.setEventListeners();

const section = new Section({
  items: initialTodos,

  renderer: (item) => {
    renderTodo(item);
  },

  containerSelector: ".todos__list",
});
// call section instance's renderItems method
// renderItems();

// const closeModal = (modal) => {
// modal.classList.remove("popup_visible");
// };

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", handleCheck, handleDelete);
  const todoElement = todo.getView();
  return todoElement;

  // todoNameEl.textContent = data.name;
  // todoCheckboxEl.checked = data.completed;

  // // Apply id and for attributes.
  // // The id will initially be undefined for new todos.

  // // If a due date has been set, parsing this it with `new Date` will return a
  // // number. If so, we display a string version of the due date in the todo.
};

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

const renderTodo = (item) => {
  const todo = generateTodo(item);
  section.addItem(todo);
};

// addTodoForm.addEventListener("submit", (evt) => {

// });

initialTodos.forEach((item) => {
  renderTodo(item);
});

// section.renderItems(renderTodo(item));

// section.renderItems((item) => {
//   renderTodo(item);
// });
const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
