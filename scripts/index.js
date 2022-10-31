import FormValidator from './FormValidator.js';
import Card from './Card.js';

const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.button',
  invalidButtonClass: 'popup__button_invalid',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
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

const list = document.querySelector(".cards");

export default function openPopup (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
}
function closePopup (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape); 
}

// Обработчик «отправки» формы
function submitEditProfileForm (evt) {
  evt.preventDefault();

  nameInput.textContent = textNameNew.value;
  jobInput.textContent = textJobNew.value;
  closePopup(popupEditProfile);
  evt.target.reset();
}

function submitAddCardForm (evt) {
  evt.preventDefault();

  const userNewCard = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  }; 

  list.prepend(createCard(userNewCard));

  closePopup(popupAddCard);
  evt.target.reset();
}
//
function createCard (item) {
  // Создадим экземпляр карточки
  const card = new Card(item, '.card-template');
  // Создаём карточку и возвращаем наружу
  const cardElement = card.generateCard();

  return cardElement;
};
//
function renderInitialCards() {
  const itemslist = items.map(createCard);
	list.prepend(...itemslist);
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
function closePopupOverlay () {
  const popups = document.querySelectorAll('.popup')

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

function deliteError (formElement) {
  // Найдём все спаны и инпуты с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const spanList = Array.from(formElement.querySelectorAll('.popup__input-error'));
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  // Переберём полученные коллекции
  spanList.forEach((spanElement) => {
    // Скрываем сообщение об ошибке
    spanElement.classList.remove('popup__input-error_active');
    // Очистим ошибку
    spanElement.textContent = '';
  });
  inputList.forEach((inputElement) => {
    // скрываем красное подчеркивание
    inputElement.classList.remove('popup__input_type_error');
  });
}

// Вызовем функцию
renderInitialCards();

document.addEventListener("click", closePopupOverlay);
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElementProfile.addEventListener('submit', submitEditProfileForm); 
popupEditProfileOpen.addEventListener('click', () => {
  const formValidatorAdd = new FormValidator (settings, popupEditProfile)
  formValidatorAdd.enableValidation()
  deliteError(popupEditProfile);
  textNameNew.value = nameInput.textContent;
  textJobNew.value = jobInput.textContent;
  openPopup(popupEditProfile);
});

formElementCard.addEventListener('submit', submitAddCardForm);
popupAddCardOpen.addEventListener('click', () => {
  const formValidatorAdd = new FormValidator (settings, popupAddCard)
  formValidatorAdd.enableValidation()
  openPopup(popupAddCard)
});