import './index.css';
import {
  validationConfig,
  initialCards,
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
} from '../utils/constants.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Card from '../components/Card';


// !!!!!!!!!!!!!!!!!!!!!!!!!!! //
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
section.renderItems()
// !!!!!!!!!!!!!!!!!!!!!!!!!!! //


const formProfileValidator = new FormValidator (validationConfig, popupEditProfile);
const formCardValidator = new FormValidator (validationConfig, popupAddCard);
// const cardList = new Section({ data: initialCards }, cardsContainer);
// const popupCard = new Popup (popupAddCard);
// const popupProfile = new Popup (popupEditProfile);
const popupCard = new Popup ('.popup_add_card');
const popupProfile = new Popup ('.popup_edit-profile');
export const popupWithImage = new PopupWithImage('.popup_image_big');
const userInfo = new UserInfo ({ name: '.profile__name', job: '.profile__job' });
const popupEdProfile = new PopupWithForm(
  '.popup_edit-profile',
  formElementProfile,
  {
    handleFormSubmit: (items) => {
      userInfo.setUserInfo(items.name, items.job);
      popupEdProfile.close();
    }
  }
); 
const popupCardAdd = new PopupWithForm(
  '.popup_add_card',
  formElementCard,
  {
    handleFormSubmit: (items) => {
      const cardData = {
        name: items.name,
        link: items.link,
      }; 
      // cardsContainer.prepend(cardList.createCard(cardData));
      renderCard(cardData);

      formCardValidator.disableSubmitButton();
      popupCardAdd.close();
    }
  }
); 

// Вызоваем функции
formProfileValidator.enableValidation();
formCardValidator.enableValidation();
// cardList.renderer();
popupWithImage.setEventListeners();
popupCardAdd.setEventListeners();
popupEdProfile.setEventListeners();

// Вешаем обработчики
popupEditProfileOpen.addEventListener('click', () => {
  formProfileValidator.resetValidation();
  userInfo.getUserInfo();
  popupProfile.open();
});
popupAddCardOpen.addEventListener('click', () => popupCard.open());