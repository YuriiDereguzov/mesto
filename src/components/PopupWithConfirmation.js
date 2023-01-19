import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
    constructor(selector, { handleFormSubmit }) {
        super(selector);
        this._form = this._container.querySelector('.popup__form');
        this._handleFormSubmit = handleFormSubmit;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            // добавим вызов функции _handleFormSubmit
            this._handleFormSubmit();
        });
    }

    setSubmitHandler(newSubmitHandler) {
        this._handleFormSubmit = newSubmitHandler;
    }
}