import openPopup from './index.js';
export default class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector; // записали селектор в приватное поле
  }
      
  _getTemplate() {
    // забираем разметку из HTML и клонируем элемент
    const cardElement = document
    .querySelector(this._templateSelector) // используем this._templateSelector
    .content
    .querySelector('.card')
    .cloneNode(true);
    // вернём DOM-элемент карточки
    return cardElement;
  }

  generateCard() {
    // Запишем разметку в приватное поле _element. 
    // Так у других элементов появится доступ к ней.
    this._element = this._getTemplate();
    this._setEventListeners(); // добавим обработчики
    // Добавим данные
    this._element.querySelector('.card__image').src = `${this._link}`;
    this._element.querySelector('.card__name').textContent = this._name;
    // Вернём элемент наружу
    return this._element;
  }

  _handleLike() {
    this._element.querySelector('.card__like').classList.toggle('card__like_active');
  }

  _handleDelete() {
    const currentListItem = this._element.closest('.card');
    currentListItem.remove();
  }

  _setEventListeners() {
    const cardImageButton = this._element.querySelector('.card__image-btn')
    const likeButton = this._element.querySelector('.card__like')
    const deleteButton = this._element.querySelector('.card__delete')

    likeButton.addEventListener('click', () => {
      this._handleLike();
    });

    deleteButton.addEventListener('click', () => {
      this._handleDelete();
    });

    cardImageButton.addEventListener('click', () => {
      const popupImage = document.querySelector('.popup_image_big');
      document.querySelector('.popup__big-image').src = this._link;
      document.querySelector('.popup__card-name').textContent = this._name;
      openPopup(popupImage);
    });
  }
}
      
// items.forEach((item) => {
//   // Создадим экземпляр карточки
//   const card = new Card(item, '.card-template');
//   // Создаём карточку и возвращаем наружу
//   const cardElement = card.generateCard();

//   // Добавляем в DOM
//   document.querySelector('.cards').append(cardElement);
// }); 