class FormValidator {
    constructor(data, form) {
        this._form = form;
        this._inputSelector = data.inputSelector;
        this._inputErrorClass = data.inputErrorClass;
        this._submitButtonSelector = data.submitButtonSelector;
        this._inactiveButtonClass = data.inactiveButtonClass;
        this._buttonElement = form.querySelector(this._submitButtonSelector);
        this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    }
}

// !!!!!!!!!!!! 11111 !!!!!!!!!!!!

// export default class FormValidator {
//     constructor(data, form) {
//         this._form = form;
//         this._inputSelector = data.inputSelector;
//         this._inputErrorClass = data.inputErrorClass;
//         this._submitButtonSelector = data.submitButtonSelector;
//         this._inactiveButtonClass = data.inactiveButtonClass;
//         this._buttonElement = form.querySelector(this._submitButtonSelector);
//         this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
//     }
  
//     enableValidation() {
//         this._setEventListeners(this._form)
//     };
  
//     _setEventListeners() {
//         this._toggleButtonState();
//         this._inputList.forEach((inputElement) => {
//             inputElement.addEventListener('input', () => {
//                 this._checkInputValidity(inputElement);
//                 this._toggleButtonState();
//             })
//         })
//     }
  
//     _checkInputValidity(inputElement) {
//         if (!inputElement.validity.valid) {
//             this._showInputError(inputElement);
//         } else {
//             this._hideInputError(inputElement);
//         }
//     }
  
//     _showInputError(inputElement) {
//         const errorElement = this._form.querySelector(`.popup__form-input-error_${inputElement.id}`); // Выбираем элемент ошибки на основе уникального класса
//         errorElement.textContent = errorMessage;
//         inputElement.classList.add(this._inputErrorClass);
//     }
  
//     _hideInputError(inputElement) {
//         const errorElement = this._form.querySelector(`.popup__form-input-error_${inputElement.id}`); // Выбираем элемент ошибки на основе уникального класса
//         errorElement.textContent = "";
//         inputElement.classList.remove(this._inputErrorClass);
//     }
  
//     _hasInvalidInput() {
//         return this._inputList.some((inputElement) => {
//             return !inputElement.validity.valid;
//       })
//     }
  
//     _toggleButtonState() {
//         this._buttonElement.disabled = !this._form.checkInputValidity();
//         if (this._buttonElement.disabled) {
//             this._buttonElement.classList.add(this._inactiveButtonClass)
//         } else {
//             this._buttonElement.classList.remove(this._inactiveButtonClass);
//         }
//     }
// }