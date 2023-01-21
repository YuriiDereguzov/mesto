import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(selector, { handleFormSubmit }) {
        super(selector);
        this._form = this._container.querySelector('.popup__form');
        this._handleFormSubmit = handleFormSubmit;
        this._inputList = this._form.querySelectorAll('.popup__input');
        this._buttonElement = this._form.querySelector('.button');
    }

    renderLoading(isLoading) {
        if(isLoading) {
            this._buttonElement.textContent = "Сохранение..."
        } else {
            this._buttonElement.textContent = "Сохранить"
        }
    }

    _getInputValues() {
        // создаём пустой объект
        this._formValues = {};
        // добавляем в этот объект значения всех полей
        this._inputList.forEach(input => {
          this._formValues[input.name] = input.value;
        });
        // возвращаем объект значений
        return this._formValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            // добавим вызов функции _handleFormSubmit
            // передадим ей объект — результат работы _getInputValues
            this._handleFormSubmit(this._getInputValues());
        });
    }
    close() {
        super.close();
        this._form.reset();
    }
}