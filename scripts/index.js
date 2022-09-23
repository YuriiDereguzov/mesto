const popupEditProfile = document.querySelector('.popup_edit-profile');
const openPopupEditProfile = document.querySelector('.profile__edit-button');
const closePopupEditProfile = popupEditProfile.querySelector('.popup__close-button');
// Находим форму в DOM
const formElementProfile = document.querySelector('.popup__form');// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
const nameInput = document.querySelector('.profile__name');// Воспользуйтесь инструментом .querySelector()
const jobInput = document.querySelector('.profile__job');// Воспользуйтесь инструментом .querySelector()
const newTextName = document.querySelector('.popup__input_type_name');
const newTextJob = document.querySelector('.popup__input_type_job');

const formElementCard = document.querySelector('.popup__form_add_card');
const newNameCard = document.querySelector('.popup__input_card_name');
const newCardImage = document.querySelector('.popup__input_card_image');

const popupAddCard = document.querySelector('.popup_add_card');
const openPopupAddCard = document.querySelector('.profile__button-add');
const closePopupAddCard = popupAddCard.querySelector('.popup__close-button_add_card');

const list = document.querySelector(".cards");
const itemTemplate = document.querySelector(".card-template").content;
const formButton = document.querySelector(".popup__button-save"); // кнопка сабмита
const formInput = document.querySelector(".popup__input_card_name"); // инпут формы
const formInputImg = document.querySelector(".popup__input_card_image"); // инпут формы

const popupImage = document.querySelector('.popup_image_big');
const closePopupImage = popupImage.querySelector('.popup__close-button_image_big');
const imageTitle = popupImage.querySelector('.popup__card-name');
const imagePopup = popupImage.querySelector('.popup__big-image');

function openPopup (popup) {
  popup.classList.add('popup_opened');
}
function closePopup (popup) {
  popup.classList.remove('popup_opened');
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function submitEditProfileForm (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                              // Так мы можем определить свою логику отправки.
                                              // О том, как это делать, расскажем позже.
  // Получите значение полей jobInput и nameInput из свойства value
  // Выберите элементы, куда должны быть вставлены значения полей
  // Вставьте новые значения с помощью textContent
  nameInput.textContent = newTextName.value;
  jobInput.textContent = newTextJob.value;
  closePopup(popupEditProfile);
}

function submitAddCardForm (evt) {
  evt.preventDefault();

  const newHtmlElement = itemTemplate.cloneNode(true); // клонируем ноду
  const header = newHtmlElement.querySelector('.card__name');
  const image = newHtmlElement.querySelector('.card__image');
  header.textContent = newNameCard.value; // устанавливаем заголовок элемента
  image.src = newCardImage.value;
  image.alt = newNameCard.value;

  setListenersForItem(newHtmlElement); // назначаем листенеры внутри каждого элемента
  list.prepend(newHtmlElement);

  newNameCard.value = "";
  newCardImage.value = "";
  closePopup(popupAddCard);
}

// основная функция рендеринга
function createCard(text) {
	const newHtmlElement = itemTemplate.cloneNode(true); // клонируем ноду
	const header = newHtmlElement.querySelector('.card__name');
  const image = newHtmlElement.querySelector('.card__image');
  header.textContent = text.name; // устанавливаем заголовок элемента
  image.src = text.link;
  image.alt = text.name;

  setListenersForItem(newHtmlElement);
  return newHtmlElement;
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

  const bigImageName = element.querySelector('.card__name').textContent;
  const bigImage = element.querySelector('.card__image');

  const openPopupImage = element.querySelector('.card__image-btn');
  openPopupImage.addEventListener('click', () => handleGenerateImagePopup(imagePopup.src = bigImage.src, imageTitle.textContent = bigImageName));
}
function handleGenerateImagePopup() {
  openPopup(popupImage);
}

function handleDelete(event) {
  const currentListItem = event.target.closest('.card'); // получаем родителя кнопки
  currentListItem.remove();
}

function handleLike(event) {
  const currentListItem = event.target.classList.toggle('card__like_active');
}

renderInitialCards();

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
  newNameCard.value = "";
  newCardImage.value = "";
  openPopup(popupAddCard);
});
closePopupAddCard.addEventListener('click', () => {
  closePopup(popupAddCard);
});

closePopupImage.addEventListener('click', () => {
  closePopup(popupImage);
});
