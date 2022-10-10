const popupEditProfile = document.querySelector('.popup_edit-profile');
const openPopupEditProfile = document.querySelector('.profile__edit-button');
const closePopupEditProfile = popupEditProfile.querySelector('.popup__close-button');
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
const closePopupAddCard = popupAddCard.querySelector('.popup__close-button_add_card');

const list = document.querySelector(".cards");

const popupImage = document.querySelector('.popup_image_big');
const closePopupImage = popupImage.querySelector('.popup__close-button_image_big');
const imageTitle = popupImage.querySelector('.popup__card-name');
const imagePopup = popupImage.querySelector('.popup__big-image');


// Функция принимает массив полей
const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция
    // hasInvalidInput вернёт true
    return !inputElement.validity.valid;
  })
}; 

// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять
const toggleButtonState = (inputList, buttonElement) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add('popup__button_invalid');
    buttonElement.setAttribute("disabled", true);
  } else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove('popup__button_invalid');
    buttonElement.removeAttribute("disabled", false);
  }
}; 

// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage) => {
  // Находим элемент ошибки
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add('popup__input_type_error');
  // Заменим содержимое span с ошибкой на переданный параметр
  errorElement.textContent = errorMessage;
  // Показываем сообщение об ошибке
  errorElement.classList.add('popup__input-error_active');
  // isValidAddText (inputElement);
}

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement) => {
  // Находим элемент ошибки
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove('popup__input_type_error');
  // Скрываем сообщение об ошибке
  errorElement.classList.remove('popup__input-error_active');
    // Очистим ошибку
    errorElement.textContent = '';
}

// Функция isValid теперь принимает formElement и inputElement,
// а не берёт их из внешней области видимости
const isValid = (formElement, inputElement) => {
  const submitButton = formElement.querySelector('.button');

  if (!inputElement.validity.valid) {
    // setSubmitButton(submitButton, false);

    isValidText (inputElement);
    // showInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    // setSubmitButton(submitButton, true);

    // hideInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    hideInputError(formElement, inputElement);
  }
}

const setEventListeners = (formElement) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  // Найдём в текущей форме кнопку отправки
  const buttonElement = formElement.querySelector('.button');
  // Вызовем toggleButtonState, чтобы не ждать ввода данных в поля
  //!!!!!!!!  Не работает, нужно иправить  !!!!!!!!
  // toggleButtonState(inputList, buttonElement);

  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      isValid(formElement, inputElement);
      // чтобы проверять его при изменении любого из полей
      // Вызовем toggleButtonState и передадим ей массив полей и кнопку
      toggleButtonState(inputList, buttonElement);
    });
  });
}

const enableValidation = () => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll('.popup__form'));

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(formElement);
  });
}

const errorMassage = {
  empty: 'Вы пропустили это поле.',
  wrongUrl: 'Введите адрес сайта.'
}

const isValidText = (input) => {
  input.setCustomValidity("");

  if (input.validity.valueMissing) {
    input.setCustomValidity(errorMassage.empty);

    return false;
  }

  if (input.validity.typeMismatch && input.type === 'url') {
    input.setCustomValidity(errorMassage.wrongUrl);

    return false;
  }

  return input.checkValidity();
}





function openPopup (popup) {
  popup.classList.add('popup_opened');
}
function closePopup (popup) {
  popup.classList.remove('popup_opened');
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function submitEditProfileForm (evt) {
  evt.preventDefault();

  // const currentForm = evt.target;

  // if (currentForm.checkValidity()) {
  //   console.log('Форма успешно отправлена');
  //   nameInput.textContent = newTextName.value;
  //   jobInput.textContent = newTextJob.value;
  //   closePopup(popupEditProfile);
  //   evt.target.reset();

  // } else {
  //   console.log('Чтото пошло не так');
  // }

  // Выберите элементы, куда должны быть вставлены значения полей
  // Вставьте новые значения с помощью textContent
  nameInput.textContent = newTextName.value;
  jobInput.textContent = newTextJob.value;
  closePopup(popupEditProfile);
}

function submitAddCardForm (evt) {
  evt.preventDefault();

  // const currentForm = evt.target;

  // if (currentForm.checkValidity()) {
  //   console.log('Форма успешно отправлена');

  //   const userNewCard = {
  //     name: '',
  //     link: '',
  //   };
  //   userNewCard.name = cardNameInput.value;
  //   userNewCard.link = cardLinkInput.value;
  
  //   list.prepend(createCard(userNewCard));
  
  //   closePopup(popupAddCard);
  //   evt.target.reset();
  // } else {
  //   console.log('Чтото пошло не так');
  // }
  const userNewCard = {
    name: '',
    link: '',
  };
  userNewCard.name = cardNameInput.value;
  userNewCard.link = cardLinkInput.value;

  list.prepend(createCard(userNewCard));

  closePopup(popupAddCard);
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

// Вызовем функцию
enableValidation(); 
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
  cardNameInput.value = "";
  cardLinkInput.value = "";
  openPopup(popupAddCard);
});
closePopupAddCard.addEventListener('click', () => {
  closePopup(popupAddCard);
});

closePopupImage.addEventListener('click', () => {
  closePopup(popupImage);
});





// функция закрытия при нажатии на Esc: если значение нажатой кнопки Esc, то закрываем все модалки.(Нужен рефакторинг)
function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    closePopup(popupAddCard);
    closePopup(popupEditProfile);
    closePopup(popupImage);
  }
}
document.addEventListener('keydown', closePopupEsc);


// функция закрытия при нажатии на overlay
function closePopupOverlay (e) {
  const target = e.target;
  const its_popupProfile = target == popupEditProfile;
  const its_popupCard = target == popupAddCard;
  const its_popupImage = target == popupImage;
  
  if (its_popupProfile) {
      closePopup(popupEditProfile);
  }
  if (its_popupCard) {
    closePopup(popupAddCard);
  }
  if (its_popupImage) {
    closePopup(popupImage);
  }
}
document.addEventListener("click", closePopupOverlay);