export default class Card {
  constructor(data, { handleCardClick, handleDeleteClick, handleLikeClick }, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data.id;
    this._userId = data.userId;
    this._ownerId = data.ownerId;
    this._openImagePopup = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
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
    this.setLikes(this._likes);

    if(this._ownerId !== this._userId) {
      this._deleteElement.style.display = 'none';
    }
    // Вернём элемент наружу
    return this._element;
  }

  isLiked() {
    return this._likes.find(user => user._id === this._userId);
  }

  _handleLikeActive() {
    this._likeElement.classList.add('card__like_active');
  }
  _handleLikeInactive() {
    this._likeElement.classList.remove('card__like_active');
  }

  setLikes(newLike) {
    this._likes = newLike
    const likeCount = this._element.querySelector('.card__like-count');
    likeCount.textContent = this._likes.length;

    if(this.isLiked()) {
      this._handleLikeActive()
    } else {
      this._handleLikeInactive()
    }
  }

  handleDelete() {
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
      this._handleLikeClick(this._id);
      // this._handleLike();
    });

    this._deleteElement.addEventListener('click', () => {
      this._handleDeleteClick(this._id);
    });

    this._cardImageButton.addEventListener('click', () => {
      this._openImagePopup(this._link, this._name);
    });
  }
}