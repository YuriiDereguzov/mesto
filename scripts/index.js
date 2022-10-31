import FormValidator from './FormValidator.js';
import Card from './Card.js';

const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.button',
  invalidButtonClass: 'popup__button_invalid',
  inactiveButtonClass: "disabled",
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}
// new FormValidator (settings, popupEditProfile)
// new FormValidator (settings, popupAddCard)



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
// const buttonSubmitCard = popupAddCard.querySelector('.popup__button-save');

const list = document.querySelector(".cards");

const popupImage = document.querySelector('.popup_image_big');
// const imageTitle = popupImage.querySelector('.popup__card-name');
// const imagePopup = popupImage.querySelector('.popup__big-image');

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

  // inactiveButtonSubmit(buttonSubmitCard);
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
// // основная функция рендеринга
// function createCard(text) {
//   const newHtmlElement = document.querySelector(".card-template").content.cloneNode(true); // клонируем ноду
//   const card = newHtmlElement.querySelector('.card'); // теперь мы свободны от template и работаем именно с dom узлом
//   const header = card.querySelector('.card__name');
//   const image = card.querySelector('.card__image');
//   header.textContent = text.name; // устанавливаем заголовок элемента
//   image.src = text.link;
//   image.alt = text.name;

//   setListenersForItem(card);
//   return card;
// }

// // element это наша карточка с кнопками
// function setListenersForItem(element) {
//   const deleteButton = element.querySelector('.card__delete');
//   deleteButton.addEventListener('click', handleDelete); // TODO передаем ссылку на функцию

//   const likeButton = element.querySelector('.card__like');
//   likeButton.addEventListener('click', handleLike);

//   const cardImage = element.querySelector('.card__image-btn');
//   cardImage.addEventListener('click', () => handleGenerateImagePopup(element));
// }

// function handleGenerateImagePopup(element) {
//   const bigImageName = element.querySelector('.card__name').textContent;
//   const bigImage = element.querySelector('.card__image');

//   imagePopup.src = bigImage.src;
//   imageTitle.textContent = bigImageName;
//   imagePopup.alt = bigImageName;

//   openPopup(popupImage);
// }

// function handleDelete(event) {
//   const currentListItem = event.target.closest('.card'); // получаем родителя кнопки
//   currentListItem.remove();
// }

// function handleLike(event) {
//   const currentListItem = event.target.classList.toggle('card__like_active');
// }

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
  deliteError(popupEditProfile);
  textNameNew.value = nameInput.textContent;
  textJobNew.value = jobInput.textContent;
  openPopup(popupEditProfile);
});

formElementCard.addEventListener('submit', submitAddCardForm);
popupAddCardOpen.addEventListener('click', () => openPopup(popupAddCard));