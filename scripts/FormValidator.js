// const settings = {
//     formSelector: '.popup__form',
//     inputSelector: '.popup__input',
//     submitButtonSelector: '.button',
//     invalidButtonClass: 'popup__button_invalid',
//     inactiveButtonClass: "disabled",
//     inputErrorClass: 'popup__input_type_error',
//     errorClass: 'popup__input-error_active'
// }

export default class FormValidator {
    constructor(setting, form) {
        this._form = form
        this._inputSelector = setting.inputSelector
        this._inputErrorClass = setting.inputErrorClass
        this._errorClass = setting.errorClass
        this._invalidButtonClass = setting.invalidButtonClass
        this._inactiveButtonClass = setting.inactiveButtonClass 
        this._submitButtonSelector = setting.submitButtonSelector
        this._buttonElement = this._form.querySelector(this._submitButtonSelector)
        this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector))
    }

    // сделай кнопку неактивной
    _inactiveButtonSubmit () {
        this._buttonElement.classList.add(this._invalidButtonClass);
        this._buttonElement.setAttribute(this._inactiveButtonClass, true);
    }
    // сделай кнопку активной
    _activeButtonSubmit () {
        this._buttonElement.classList.remove(this._invalidButtonClass);
        this._buttonElement.removeAttribute(this._inactiveButtonClass, false);
    }

    // метод принимает массив полей ввода
    // и элемент кнопки, состояние которой нужно менять
    _toggleButtonState () {
        // Если есть хотя бы один невалидный инпут
        if (this._hasInvalidInput(this._inputList)) {
            // сделай кнопку неактивной
            _inactiveButtonSubmit();
        } else {
            // иначе сделай кнопку активной
            _activeButtonSubmit();
        }
    }

    // метод принимает массив полей
    _hasInvalidInput () {
        // проходим по этому массиву методом some
        return this.inputList.some((inputElement) => {
            // Если поле не валидно, колбэк вернёт true
            // Обход массива прекратится и вся функция
            // hasInvalidInput вернёт true
            return !inputElement.validity.valid;
        })
    }

    // Функция, который добавляет класс с ошибкой
    _showInputError (inputElement) {
        // Находим элемент ошибки
        const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
        
        inputElement.classList.add(this._inputErrorClass);
        // Заменим содержимое span с ошибкой на переданный параметр
        errorElement.textContent = errorMessage;
        // Показываем сообщение об ошибке
        inputElement.classList.add(this._inputErrorClass);
    }
    
    // метод, который удаляет класс с ошибкой
    _hideInputError (inputElement) {
        // Находим элемент ошибки
        const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
        
        inputElement.classList.remove(this._inputErrorClass);
        // Скрываем сообщение об ошибке
        errorElement.classList.remove(this._errorClass);
        // Очистим ошибку
        errorElement.textContent = '';
    }

    _isValid(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }

    // Добавление обработчиков всем полям формы
    _setEventListeners () {
        this.toggleButtonState();
        
        // Обойдём все элементы полученной коллекции
        this.inputList.forEach((inputElement) => {
            // каждому полю добавим обработчик события input
            inputElement.addEventListener('input', () => {
            // Внутри колбэка вызовем isValid,
            // передав ей форму и проверяемый элемент
            this.isValid(inputElement);
            // чтобы проверять его при изменении любого из полей
            // Вызовем toggleButtonState и передадим ей массив полей и кнопку
            this.toggleButtonState();
            });
        });
    }

    enableValidation() {
        this._setEventListeners(this._form)
    }
}


// !!!!!!!!!!!!!!!! 1111111111111111 !!!!!!!!!!!!!!!!

// export default class FormValidator {
//     constructor (data, form) {
//         this._form = form
//         this._inputSelector = data.inputSelector
//         this._submitButtonSelector = data.submitButtonSelector
//         this._inputErrorClass = data.inputErrorClass
//         this._errorClass = data.errorClass
//         this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector))
//         this._buttonElement = this._form.querySelector(this._submitButtonSelector)
//     }

//     _hasInvalidInput = () => {
//         // проходим по этому массиву методом some
//         return this.inputList.some((input) => !input.validity.valid);
//         // Если поле не валидно, колбэк вернёт true
//         // Обход массива прекратится и вся функция
//         // hasInvalidInput вернёт tru
//     }

//     _togleButtonState () {
//         if (this._hasInvalidInput(this._inputList)) {
//             this._buttonElement.setAttribute('disabled', '')
//         } else {
//             this._buttonElement.remuveAttribute('disabled')
//         }
//     }

//     // Функция, которая добавляет класс с ошибкой
//     _showInputError (inputElement) {
//         inputElement.classList.add(this.inputErrorClass);
//         this._errorElement.textContent = inputElement.validationMessage
//         this._errorElement.classList.add(this.errorClass);
//     }

//     // Функция, которая удаляет класс с ошибкой
//     _hideInputError (inputElement) {
//         if (!this._errorElement) return;
//         inputElement.classList.remove(this._inputErrorClass)
//         this.errorElement.textContent = ''
//         this.errorElement.classList.remove(this._errorClass);
//     }

//     _isValid(inputElement) {
//         this._errorElement = this._form.querySelector('.popup__input_type_error$(inputElement.name)')
//         // Находим элемент ошибки
//         this._errorElement = this._form.querySelector(`.${inputElement.id}-error`)

//         if (!inputElement.validity.valid) {
//             this._showInputError(inputElement)
//         } else {
//             this._hideInputError(inputElement)
//         }
//     }

//     // Добавление обработчиков всем полям формы
//     _setEventListeners () {
//         this.toggleButtonState()
//         // Обойдём все элементы полученной коллекции
//         this.inputList.forEach((inputElement) => {
//             // каждому полю добавим обработчик события input
//             inputElement.addEventListener('input', () => {
//             // Внутри колбэка вызовем isValid,
//             // передав ей форму и проверяемый элемент
//             this.isValid(inputElement);
//             // чтобы проверять его при изменении любого из полей
//             // Вызовем toggleButtonState и передадим ей массив полей и кнопку
//             this.toggleButtonState()
//             });
//         });
//     }

//     enableValidation() {
//         this._setEventListeners(this._form)
//     }
// }