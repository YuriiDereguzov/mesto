export default class Section {
    constructor({ items, renderer }, selector) {
        this._items = items;
        this._renderer = renderer; 
      
        this._container = document.querySelector(selector);
    }
   
    renderInitialItems() {
        this._items.forEach((item) => this._renderer(item));
    }
   
    addItem(element) {
        this._container.prepend(element);
        // this._container.append(element);
    }
}
// import Card from './Card.js';
// import { popupWithImage } from '../pages/index.js';

// export default class Section {
//     constructor({ data }, selector) {
//         this._initialArray = data;
//         this._container = selector;
//     }

//     createCard(cardData) {
//         // Создадим экземпляр карточки
//         const card = new Card(
//             cardData,
//             {
//                 handleCardClick: (link, name) => {
//                     popupWithImage.open(link, name);
//                 }
//             },
//             '.card-template');
//         // Создаём карточку и возвращаем наружу
//         const cardElement = card.generateCard();
//         // Вернем готовую карточку
//         return cardElement;
//     }

//     setItem(element) {
//         this._container.append(element);
//     }

//     renderer() {
//         // Переберем массив _initialArray с начальными карточками
//         this._initialArray.map((item) => {
//             // Создадим экземпляр карточки
//             this.createCard(item);
//             // Вставим разметку на страницу,
//             // используя метод setItem класса Section
//             this.setItem(this.createCard(item));
//         });
//     }
// }