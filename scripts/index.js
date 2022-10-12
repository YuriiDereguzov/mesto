const popupEditProfile = document.querySelector('.popup_edit-profile');
const openPopupEditProfile = document.querySelector('.profile__edit-button');
// const closePopupEditProfile = popupEditProfile.querySelector('.popup__close-button');

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
// const closePopupAddCard = popupAddCard.querySelector('.popup__close-button_add_card');
const buttonSubmitCard = popupAddCard.querySelector('.popup__button-save');

const list = document.querySelector(".cards");

const popupImage = document.querySelector('.popup_image_big');
// const closePopupImage = popupImage.querySelector('.popup__close-button_image_big');
const imageTitle = popupImage.querySelector('.popup__card-name');
const imagePopup = popupImage.querySelector('.popup__big-image');


function openPopup (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
}
function closePopup (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape); 
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function submitEditProfileForm (evt) {
  evt.preventDefault();

  nameInput.textContent = newTextName.value;
  jobInput.textContent = newTextJob.value;
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

  inactiveButtonSubmit(buttonSubmitCard);
  // buttonSubmitCard.classList.add('popup__button_invalid');
  // buttonSubmitCard.setAttribute("disabled", true);

  closePopup(popupAddCard);
  evt.target.reset();
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
// функция закрытия при нажатии на Esc: если значение нажатой кнопки Esc, то закрываем открытый попап.
function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened') // нашли открытый попап
    // закрыли попап
    closePopup(openedPopup);
  }
} 
// function closeByEscape(evt) {
//   if (evt.key === 'Escape') {
//     closePopup(popupAddCard);
//     closePopup(popupEditProfile);
//     closePopup(popupImage);
//   }
// }

// функция закрытия при нажатии на overlay
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
// function closePopupOverlay (e) {
//   const target = e.target;
//   const its_popupProfile = target == popupEditProfile;
//   const its_popupCard = target == popupAddCard;
//   const its_popupImage = target == popupImage;
  
//   if (its_popupProfile) {
//       closePopup(popupEditProfile);
//   }
//   if (its_popupCard) {
//     closePopup(popupAddCard);
//   }
//   if (its_popupImage) {
//     closePopup(popupImage);
//   }
// }

// Вызовем функцию
renderInitialCards();

// !!!!!!! esc, overlay !!!!!!! 
// document.addEventListener('keydown', closePopupEsc);
document.addEventListener("click", closePopupOverlay);

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElementProfile.addEventListener('submit', submitEditProfileForm); 
openPopupEditProfile.addEventListener('click', () => {
  newTextName.value = nameInput.textContent;
  newTextJob.value = jobInput.textContent;
  openPopup(popupEditProfile);
});

formElementCard.addEventListener('submit', submitAddCardForm);
openPopupAddCard.addEventListener('click', () => {
  // formElementCard.reset();
  // cardNameInput.value = "";
  // cardLinkInput.value = "";
  openPopup(popupAddCard);
});
// closePopupEditProfile.addEventListener('click', () => {
//   closePopup(popupEditProfile);
// });

// closePopupAddCard.addEventListener('click', () => {
//   closePopup(popupAddCard);
// });

// closePopupImage.addEventListener('click', () => {
//   closePopup(popupImage);
// });