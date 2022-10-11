const popupEditProfile = document.querySelector('.popup_edit-profile');
const openPopupEditProfile = document.querySelector('.profile__edit-button');
const closePopupEditProfile = popupEditProfile.querySelector('.popup__close-button');
// Находим форму в DOM
const formElementProfile = document.querySelector('.popup__form');// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
const nameInput = document.querySelector('.profile__name');// Воспользуйтесь инструментом .querySelector()
const jobInput = document.querySelector('.profile__job');
const newTextName = document.querySelector('.popup__input_type_name');
const newTextJob = document.querySelector('.popup__input_type_job');

const formElementCard = document.querySelector('.popup__form_add_card');
const cardNameInput = document.querySelector('.popup__input_card_name');
const cardLinkInput = document.querySelector('.popup__input_card_image');

const popupAddCard = document.querySelector('.popup_add_card');
const openPopupAddCard = document.querySelector('.profile__button-add');
const closePopupAddCard = popupAddCard.querySelector('.popup__close-button_add_card');

const list = document.querySelector(".cards");

const popupImage = document.querySelector('.popup_image_big');
const closePopupImage = popupImage.querySelector('.popup__close-button_image_big');
const imageTitle = popupImage.querySelector('.popup__card-name');
const imagePopup = popupImage.querySelector('.popup__big-image');


function openPopup (popup) {
  // включение валидации вызовом enableValidation
  // Вызовем функцию
  // все настройки передаются при вызове
  enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.button',
    invalidButtonClass: 'popup__button_invalid',
    inactiveButtonClass: "disabled",
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
  });

  popup.classList.add('popup_opened');
}
function closePopup (popup) {
  popup.classList.remove('popup_opened');
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function submitEditProfileForm (evt) {
  evt.preventDefault();

  nameInput.textContent = newTextName.value;
  jobInput.textContent = newTextJob.value;
  closePopup(popupEditProfile);
}

function submitAddCardForm (evt) {
  evt.preventDefault();

  const userNewCard = {
    name: '',
    link: '',
  };
  userNewCard.name = cardNameInput.value;
  userNewCard.link = cardLinkInput.value;

  list.prepend(createCard(userNewCard));

  closePopup(popupAddCard);
}

// основная функция рендеринга
function createCard(text) {
  const newHtmlElement = document.querySelector(".card-template").content.cloneNode(true); // клонируем ноду
  const card = newHtmlElement.querySelector('.card'); // теперь мы свободны от template и работаем именно с dom узлом
  const header = card.querySelector('.card__name');
  const image = card.querySelector('.card__image');
  header.textContent = text.name; // устанавливаем заголовок элемента
  image.src = text.link;
  image.alt = text.name;

  setListenersForItem(card);
  return card;
}

function renderInitialCards() {
  const itemslist = items.map(createCard);
	list.prepend(...itemslist);
}

// element это наша карточка с кнопками
function setListenersForItem(element) {
  const deleteButton = element.querySelector('.card__delete');
  deleteButton.addEventListener('click', handleDelete); // TODO передаем ссылку на функцию

  const likeButton = element.querySelector('.card__like');
  likeButton.addEventListener('click', handleLike);

  const cardImage = element.querySelector('.card__image-btn');
  cardImage.addEventListener('click', () => handleGenerateImagePopup(element));
}

function handleGenerateImagePopup(element) {
  const bigImageName = element.querySelector('.card__name').textContent;
  const bigImage = element.querySelector('.card__image');

  imagePopup.src = bigImage.src;
  imageTitle.textContent = bigImageName;
  imagePopup.alt = bigImageName;

  openPopup(popupImage);
}

function handleDelete(event) {
  const currentListItem = event.target.closest('.card'); // получаем родителя кнопки
  currentListItem.remove();
}

function handleLike(event) {
  const currentListItem = event.target.classList.toggle('card__like_active');
}

// !!!!!!! !!! !!!!!!!
// функция закрытия при нажатии на Esc: если значение нажатой кнопки Esc, то закрываем все модалки.(Нужен рефакторинг)
function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    closePopup(popupAddCard);
    closePopup(popupEditProfile);
    closePopup(popupImage);
  }
}
// функция закрытия при нажатии на overlay
function closePopupOverlay (e) {
  const target = e.target;
  const its_popupProfile = target == popupEditProfile;
  const its_popupCard = target == popupAddCard;
  const its_popupImage = target == popupImage;
  
  if (its_popupProfile) {
      closePopup(popupEditProfile);
  }
  if (its_popupCard) {
    closePopup(popupAddCard);
  }
  if (its_popupImage) {
    closePopup(popupImage);
  }
}

// Вызовем функцию
renderInitialCards();

// !!!!!!! esc, overlay !!!!!!! 
document.addEventListener('keydown', closePopupEsc);
document.addEventListener("click", closePopupOverlay);

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElementProfile.addEventListener('submit', submitEditProfileForm); 
openPopupEditProfile.addEventListener('click', () => {
  newTextName.value = nameInput.textContent;
  newTextJob.value = jobInput.textContent;
  openPopup(popupEditProfile);
});
closePopupEditProfile.addEventListener('click', () => {
  closePopup(popupEditProfile);
});

formElementCard.addEventListener('submit', submitAddCardForm);
openPopupAddCard.addEventListener('click', () => {
  cardNameInput.value = "";
  cardLinkInput.value = "";
  openPopup(popupAddCard);
});
closePopupAddCard.addEventListener('click', () => {
  closePopup(popupAddCard);
});

closePopupImage.addEventListener('click', () => {
  closePopup(popupImage);
});