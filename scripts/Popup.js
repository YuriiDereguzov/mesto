export default class Popup {
    constructor(selector) {
        this._container = selector;
    }

    open() {
        this._container.classList.add('popup_opened');
        document.addEventListener('keydown', (evt) => this._handleEscClose(evt));
    }

    close() {
        this._container.classList.remove('popup_opened');
        document.removeEventListener('keydown', (evt) => this._handleEscClose(evt));
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    setEventListeners() {
        this._container.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('popup_opened')) {
                this.close();
            }
            if (evt.target.classList.contains('popup__close')) {
                this.close();
            }
        });
    }
}