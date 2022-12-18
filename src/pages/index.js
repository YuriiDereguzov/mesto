import './index.css';
import {
  validationConfig,
  initialCards,
} from '../utils/constants.js';
import {
  popupEditProfile,
  popupEditProfileOpen,
  formElementProfile,
  formElementCard,
  popupAddCard,
  popupAddCardOpen,
  cardsContainer,
  popupImage,
  cardName,
  imageBig,
} from '../utils/elements.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Card from '../components/Card';

function createCard(cardData) {
  // Создадим экземпляр карточки
  const card = new Card(
      cardData,
      {
          handleCardClick: (link, name) => {
              popupWithImage.open(link, name);
          }
      },
      '.card-template');
  // Создаём карточку и возвращаем наружу
  const cardElement = card.generateCard();
  // Вернем готовую карточку
  return cardElement;
}

function renderCard(cardData) {
  const cardElement = createCard(cardData) // createCard просто создает карточку и возвращает её html представление
  section.addItem(cardElement)
}

const section = new Section({ items: initialCards, renderer: renderCard }, '.cards')
section.renderInitialItems()

const formProfileValidator = new FormValidator (validationConfig, popupEditProfile);
const formCardValidator = new FormValidator (validationConfig, popupAddCard);
// const cardList = new Section({ data: initialCards }, cardsContainer);
// const popupCard = new Popup (popupAddCard);
// const popupProfile = new Popup (popupEditProfile);
// const popupCard = new Popup ('.popup_add_card');
// const popupProfile = new Popup ('.popup_edit-profile');
export const popupWithImage = new PopupWithImage('.popup_image_big');
const userInfo = new UserInfo ({ nameSelector: '.profile__name', jobSelector: '.profile__job' });
const formPopupEditProfile = new PopupWithForm(
  '.popup_edit-profile',
  {
    handleFormSubmit: (items) => {
      userInfo.setUserInfo(items.name, items.job);
      formPopupEditProfile.close();
    }
  }
); 
const formPopupAddCard = new PopupWithForm(
  '.popup_add_card',
  {
    handleFormSubmit: (items) => {
      const cardData = {
        name: items.name,
        link: items.link,
      }; 
      // cardsContainer.prepend(cardList.createCard(cardData));
      renderCard(cardData);

      formPopupAddCard.close();
    }
  }
); 

// Вызоваем функции
formProfileValidator.enableValidation();
formCardValidator.enableValidation();
// cardList.renderer();
popupWithImage.setEventListeners();
formPopupAddCard.setEventListeners();
formPopupEditProfile.setEventListeners();

// Вешаем обработчики
popupEditProfileOpen.addEventListener('click', () => {
  formProfileValidator.resetValidation();
  userInfo.getUserInfo();
  formPopupEditProfile.open();
});
popupAddCardOpen.addEventListener('click', () => {
  formPopupAddCard.open();
  formCardValidator.disableSubmitButton();
});