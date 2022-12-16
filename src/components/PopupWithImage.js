import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector);
        this._image = this._container.querySelector('.popup__big-image');
        this._cardName = this._container.querySelector('.popup__card-name');
    }

    open(link, name) {
        this._image.src = link;
        this._cardName.textContent = name;
        this._image.alt = name;
        
        super.open();
    }
}