class FormValidator {
  constructor(settings, formEl) {
    this._settings = settings;
    this._formEl = formEl;
  }

  _hideInputError(inputElement) {
    this._errorElementId = `#${inputElement.id}-error`;
    this._errorElement = this._formEl.querySelector(errorElementId);
    inputElement.classList.remove(this._settings.inputErrorClass);
    this._errorElement.classList.remove(this._settings.errorClass);
    this._errorElement.textContent = "";
  }
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      showInputError(
        this._formEl,
        inputElement,
        inputElement.validationMessage,
        this._settings
      );
    } else {
      hideInputError(this._formEl, inputElement, this._settings);
    }
  }
  _setEventListeners() {
    this._inputList = Array.from(
      this._formEl.querySelectorAll(this._settings.inputSelector)
    );
    const buttonElement = this._formEl.querySelector(
      this._settings.submitButtonSelector
    );

    toggleButtonState(this._inputList, buttonElement, this._settings);

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        toggleButtonState(this._inputList, buttonElement, this._settings);
      });
    });
  }
  enableValidation() {
    this._formEl.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    this._setEventListeners();
  }
}
export default FormValidator;
