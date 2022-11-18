import Popup from "./Popup.js";
import { imageBig, cardName } from "../utils/constants.js";

export default class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector);
    }

    open(link, name) {
        super.open();
        imageBig.src = link;
        cardName.textContent = name;
        imageBig.alt = name;
    }
}