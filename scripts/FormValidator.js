export default class FormValidator {
    constructor(setting, form) {
        this._form = form;
        this._inputSelector = setting.inputSelector;
        this._inputErrorClass = setting.inputErrorClass;
        this._errorClass = setting.errorClass;
        this._invalidButtonClass = setting.invalidButtonClass;
        this._submitButtonSelector = setting.submitButtonSelector;
        this._buttonElement = this._form.querySelector(this._submitButtonSelector);
        this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    }

    // метод принимает массив полей ввода
    // и элемент кнопки, состояние которой нужно менять
    _toggleButtonState () {
        // Если есть хотя бы один невалидный инпут
        if (this._hasInvalidInput(this._inputList)) {
            // сделай кнопку неактивной
            this._buttonElement.setAttribute('disabled', '');
            this._buttonElement.classList.add(this._invalidButtonClass);
        } else {
            // иначе сделай кнопку активной
            this._buttonElement.removeAttribute('disabled');
            this._buttonElement.classList.remove(this._invalidButtonClass);
        }
    }

    // метод принимает массив полей
    _hasInvalidInput () {
        // проходим по этому массиву методом some
        return this._inputList.some((inputElement) => {
            // Если поле не валидно, колбэк вернёт true
            // Обход массива прекратится и вся функция
            // hasInvalidInput вернёт true
            return !inputElement.validity.valid;
        })
    }

    // метод, который добавляет класс с ошибкой
    _showInputError (inputElement) {    
        inputElement.classList.add(this.inputErrorClass);
        this._errorElement.textContent = inputElement.validationMessage;
        this._errorElement.classList.add(this.errorClass);
    }
    
    // метод, который удаляет класс с ошибкой
    _hideInputError (inputElement) {
        if (!this._errorElement) return;
        inputElement.classList.remove(this._inputErrorClass);
        this._errorElement.textContent = '';
        this._errorElement.classList.remove(this._errorClass);
    }

    _isValid(inputElement) {
        // Находим элемент ошибки
        this._errorElement = this._form.querySelector(`.${inputElement.id}-error`);

        if (!inputElement.validity.valid) {
            this._showInputError(inputElement);
        } else {
            this._hideInputError(inputElement);
        }
    }

    // Добавление обработчиков всем полям формы
    _setEventListeners () {
        this._toggleButtonState();
        
        // Обойдём все элементы полученной коллекции
        this._inputList.forEach((inputElement) => {
            // каждому полю добавим обработчик события input
            inputElement.addEventListener('input', () => {
            // Внутри колбэка вызовем isValid,
            // передав ей форму и проверяемый элемент
            this._isValid(inputElement);
            // чтобы проверять его при изменении любого из полей
            // Вызовем toggleButtonState и передадим ей массив полей и кнопку
            this._toggleButtonState();
            });
        });
    }

    enableValidation() {
        this._setEventListeners(this._form);
    }
}