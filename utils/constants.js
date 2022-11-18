export const popupEditProfile = document.querySelector('.popup_edit-profile');
export const popupEditProfileOpen = document.querySelector('.profile__edit-button');
// Находим форму в DOM
export const formElementProfile = document.querySelector('.popup__form');// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
export const nameInput = document.querySelector('.profile__name');// Воспользуйтесь инструментом .querySelector()
export const jobInput = document.querySelector('.profile__job');
export const textNameNew = document.querySelector('.popup__input_type_name');
export const textJobNew = document.querySelector('.popup__input_type_job');
  
export const formElementCard = document.querySelector('.popup__form_add_card');
export const cardNameInput = document.querySelector('.popup__input_card_name');
export const cardLinkInput = document.querySelector('.popup__input_card_image');
  
export const popupAddCard = document.querySelector('.popup_add_card');
export const popupAddCardOpen = document.querySelector('.profile__button-add');
  
export const cardsContainer = document.querySelector(".cards");
  
export const popupImage = document.querySelector('.popup_image_big');
export const imageBig = document.querySelector('.popup__big-image');
export const cardName = document.querySelector('.popup__card-name');

export const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.button',
    invalidButtonClass: 'popup__button_invalid',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active',
    spanError: '.popup__input-error'
}

export const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];