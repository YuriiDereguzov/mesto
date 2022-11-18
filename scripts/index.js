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
} from '../utils/constants.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

const formProfileValidator = new FormValidator (validationConfig, popupEditProfile);
const formCardValidator = new FormValidator (validationConfig, popupAddCard);
const cardList = new Section({ data: initialCards }, cardsContainer);
const popupCard = new Popup (popupAddCard);
const popupProfile = new Popup (popupEditProfile);
const popupWithImage = new PopupWithImage(popupImage);
const userInfo = new UserInfo ({ name: '.profile__name', job: '.profile__job' });
const popupEdProfile = new PopupWithForm(
  popupEditProfile,
  formElementProfile,
  {
    handleFormSubmit: (items) => {
      userInfo.setUserInfo(items.name, items.job);
    }
  }
); 
const popupCardAdd = new PopupWithForm(
  popupAddCard,
  formElementCard,
  {
    handleFormSubmit: (items) => {
      const cardData = {
        name: items.name,
        link: items.link,
      }; 
      cardsContainer.prepend(cardList.createCard(cardData));
      formCardValidator.disableSubmitButton();
    }
  }
); 

export function openImagePopup (link, name) {
  popupWithImage.open(link, name);
}

// Вызоваем функции
formProfileValidator.enableValidation();
formCardValidator.enableValidation();
cardList.renderer();
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