import './index.css';
import {
  validationConfig,
  initialCards,
} from '../utils/constants.js';
import {
  popupEditProfile,
  popupEditProfileOpen,
  popupAddCard,
  popupAddCardOpen,
  textNameNew,
  textJobNew
} from '../utils/elements.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
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
      renderCard(cardData);

      formPopupAddCard.close();
    }
  }
); 

// Вызоваем функции
formProfileValidator.enableValidation();
formCardValidator.enableValidation();
popupWithImage.setEventListeners();
formPopupAddCard.setEventListeners();
formPopupEditProfile.setEventListeners();

// Вешаем обработчики
popupEditProfileOpen.addEventListener('click', () => {
  formProfileValidator.resetValidation();
  const {name, job} = userInfo.getUserInfo();
  textNameNew.value = name;
  textJobNew.value = job;
  formPopupEditProfile.open();
});
popupAddCardOpen.addEventListener('click', () => {
  formPopupAddCard.open();
  formCardValidator.disableSubmitButton();
});