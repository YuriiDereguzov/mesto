// openPopupButton.addEventListener('click', () => {
//     overlayEl.classList.add('overlay_opened');
// })

// closePopupButton.addEventListener('click', () => {
//     overlayEl.classList.remove('overlay_opened');
// })


// document.addEventListener('click', (event) => {

//     if (event.target.classList.contains('info-item__edit-button')) {
//         toggleOverlay();
//     }

//     if (event.target.classList.contains('popup__close-button')) {
//         toggleOverlay();
//     }
// });


// const cardElement = document.querySelector('.card');
// cardElement.querySelector('.card__like').addEventListener('click', (e) => {
//     e.target.classList.toggle('card__like_active');
//   });



const popup = document.querySelector('.popup');
const openPopupButton = document.querySelector('.profile__edit-button');
const closePopupButton = popup.querySelector('.popup__close-button');
// Находим форму в DOM
let formElement = document.querySelector('.popup__form');// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = document.querySelector('.profile__name');// Воспользуйтесь инструментом .querySelector()
let jobInput = document.querySelector('.profile__job');// Воспользуйтесь инструментом .querySelector()
let newTextName = document.querySelector('.popup__input_type_name')
let newTextJob = document.querySelector('.popup__input_type_job')

const popupCard = document.querySelector('.popup_add_card');
const openPopupCard = document.querySelector('.profile__button-add');
const closePopupCard = popupCard.querySelector('.popup__close-button_add_card');


const togglePopup = () => {
    popup.classList.toggle('popup_opened');
}


const togglePopupCard = () => {
    popupCard.classList.toggle('popup_opened');
}


// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value

    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
    nameInput.textContent = newTextName.value;
    jobInput.textContent = newTextJob.value;
    togglePopup();
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler); 




openPopupButton.addEventListener('click', () => {
    togglePopup();
    newTextName.value = nameInput.textContent;
    newTextJob.value = jobInput.textContent;
})
closePopupButton.addEventListener('click', togglePopup);


openPopupCard.addEventListener('click', togglePopupCard)
closePopupCard.addEventListener('click', togglePopupCard);


// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
let formElementCard = document.querySelector('.popup__form_add_card');
let newNameCard = document.querySelector('.popup__input_card_name')
let newCardImage = document.querySelector('.popup__input_card_image')

function formSubmitHandlerCard (evt) {
    evt.preventDefault();


    const newHtmlElement = itemTemplate.cloneNode(true); // клонируем ноду
	  const header = newHtmlElement.querySelector('.card__name');
    const image = newHtmlElement.querySelector('.card__image');
    header.textContent = newNameCard.value; // устанавливаем заголовок элемента
    image.src = newCardImage.value;
    image.alt = newNameCard.value;

    setListenersForItem(newHtmlElement); // назначаем листенеры внутри каждого элемента
	  list.appendChild(newHtmlElement);

    newNameCard.value = "";
    newCardImage.value = "";
    togglePopupCard();
}
formElementCard.addEventListener('submit', formSubmitHandlerCard); 

const items = [
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

const list = document.querySelector(".cards");
const itemTemplate = document.querySelector(".card-template").content;
const formButton = document.querySelector(".popup__button-save"); // кнопка сабмита
const formInput = document.querySelector(".popup__input_card_name"); // инпут формы
const formInputImg = document.querySelector(".popup__input_card_image"); // инпут формы



function render() {
	items.forEach(renderItem);
}

// основная функция рендеринга
function renderItem(text) {
	const newHtmlElement = itemTemplate.cloneNode(true); // клонируем ноду
	const header = newHtmlElement.querySelector('.card__name');
  const image = newHtmlElement.querySelector('.card__image');
  header.textContent = text.name; // устанавливаем заголовок элемента
  image.src = text.link;

  // newHtmlElement готовая карточка с кнопками
	setListenersForItem(newHtmlElement); // назначаем листенеры внутри каждого элемента
	list.appendChild(newHtmlElement); // вставляем в DOM
}

// element это наша карточка с кнопками
function setListenersForItem(element) {
    const deleteButton = element.querySelector('.card__delete');
    deleteButton.addEventListener('click', handleDelete); // TODO передаем ссылку на функцию

    const likeButton = element.querySelector('.card__like')
    likeButton.addEventListener('click', handleLike);

    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    const bigImageName = element.querySelector('.card__name').textContent;
    const popupImageName = document.querySelector('.popup__card-name');
    const bigImage = element.querySelector('.card__image');
    const popupBigImage = document.querySelector('.popup__big-image');
    
    const openButtonImage = element.querySelector('.card__image-btn');
    openButtonImage.addEventListener('click', () => {
      popupBigImage.src = bigImage.src;
      popupImageName.textContent = bigImageName;

      popupImage.classList.add('popup_opened');
    });
  }

  function handleDelete(event) {
    const currentListItem = event.target.closest('.card') // получаем родителя кнопки
    currentListItem.remove();
  }

  function handleLike(event) {
    const currentListItem = event.target.classList.toggle('card__like_active')
  }


  const popupImage = document.querySelector('.popup_image_big');
  const closePopupImage = popupImage.querySelector('.popup__close-button_image_big');
    
  closePopupImage.addEventListener('click', () => {
    popupImage.classList.remove('popup_opened');
  })
  
render();