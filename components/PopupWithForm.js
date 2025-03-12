import Popup from "./Popup.js";

class PopupwithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".popup__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._popupForm.querySelectorAll(".popup__input");
  }

  getForm() {
    return this._popupForm;
  }

  _getInputValues() {
    const values = {};
    this._inputList.forEach((input) => {
      values[input.name] = input.value;
    });
    console.log("form input values:", values);
    return values;
  }
  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();

      this._handleFormSubmit(this._getInputValues());
    });
  }
}

export default PopupwithForm;
