export default class Card {
  constructor(data, { handleCardClick }, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._openImagePopup = handleCardClick;
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
    // const cardImage = this._element.querySelector('.card__image');
    // Добавим данные
    this._cardImage.src = this._link;
    this._cardName.textContent = this._name;
    this._cardImage.alt = this._name;
    // Вернём элемент наружу
    return this._element;
  }

  _handleLike() {
    this._likeElement.classList.toggle('card__like_active');
  }

  _handleDelete() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._cardImage = this._element.querySelector('.card__image');
    this._cardName = this._element.querySelector('.card__name');
    this._cardImageButton = this._element.querySelector('.card__image-btn');
    this._likeElement = this._element.querySelector('.card__like');
    this._deleteElement = this._element.querySelector('.card__delete');

    this._likeElement.addEventListener('click', () => {
      this._handleLike();
    });

    this._deleteElement.addEventListener('click', () => {
      this._handleDelete();
    });

    this._cardImageButton.addEventListener('click', () => {
      this._openImagePopup(this._link, this._name);
    });
  }
}