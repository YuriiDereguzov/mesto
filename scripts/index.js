import { initialCards } from './constants.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.button',
  invalidButtonClass: 'popup__button_invalid',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
  spanError: '.popup__input-error'
}

const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupEditProfileOpen = document.querySelector('.profile__edit-button');
// Находим форму в DOM
const formElementProfile = document.querySelector('.popup__form');// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
const nameInput = document.querySelector('.profile__name');// Воспользуйтесь инструментом .querySelector()
const jobInput = document.querySelector('.profile__job');
const textNameNew = document.querySelector('.popup__input_type_name');
const textJobNew = document.querySelector('.popup__input_type_job');

const formElementCard = document.querySelector('.popup__form_add_card');
const cardNameInput = document.querySelector('.popup__input_card_name');
const cardLinkInput = document.querySelector('.popup__input_card_image');

const popupAddCard = document.querySelector('.popup_add_card');
const popupAddCardOpen = document.querySelector('.profile__button-add');

const cardsContainer = document.querySelector(".cards");
const popups = document.querySelectorAll('.popup');

const popupImage = document.querySelector('.popup_image_big');
const imageBig = document.querySelector('.popup__big-image');
const cardName = document.querySelector('.popup__card-name');

const formProfileValidator = new FormValidator (validationConfig, popupEditProfile);
const formCardValidator = new FormValidator (validationConfig, popupAddCard);

const CardList = new Section({ data: initialCards }, cardsContainer);

export function openImagePopup (link, name) {
  imageBig.src = link;
  cardName.textContent = name;
  imageBig.alt = name;
  openPopup(popupImage);
}

function openPopup (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
}
function closePopup (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape); 
}

// Обработчик «отправки» формы
function handleProfileFormSubmit (evt) {
  evt.preventDefault();

  nameInput.textContent = textNameNew.value;
  jobInput.textContent = textJobNew.value;
  closePopup(popupEditProfile);
}

function handleCardFormSubmit (evt) {
  evt.preventDefault();

  const cardData = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  }; 

  cardsContainer.prepend(CardList.createCard(cardData));

  closePopup(popupAddCard);
  evt.target.reset();
  formCardValidator.disableSubmitButton();
}

// функция закрытия при нажатии на Esc: если значение нажатой кнопки Esc, то закрываем открытый попап.
function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened') // нашли открытый попап
    // закрыли попап
    closePopup(openedPopup);
  }
} 

// функция закрытия при нажатии на overlay и кнопку
function bindClosePopupByOverlayHandlers () {
  popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        closePopup(popup);
      }
      if (evt.target.classList.contains('popup__close')) {
        closePopup(popup);
      }
    });
  });
}

function setProfileFormInputsValues () {
  textNameNew.value = nameInput.textContent;
  textJobNew.value = jobInput.textContent;
}

// Вызовем функцию
// renderInitialCards();
bindClosePopupByOverlayHandlers();
formProfileValidator.enableValidation();
formCardValidator.enableValidation();

CardList.renderer();

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElementProfile.addEventListener('submit', handleProfileFormSubmit); 
popupEditProfileOpen.addEventListener('click', () => {
  formProfileValidator.resetValidation();
  setProfileFormInputsValues();
  openPopup(popupEditProfile);
});

formElementCard.addEventListener('submit', handleCardFormSubmit);
popupAddCardOpen.addEventListener('click', () => openPopup(popupAddCard));