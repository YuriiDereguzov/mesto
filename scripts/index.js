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






// let cardsContainer = document.querySelector('.cards');
// const cardElement = document.querySelector('.card');

// function addcard(imageValue, titleValue) {
//     const cardTemplate = document.querySelector('#card-template').content;
//     const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  
//     cardElement.querySelector('.card__image').textContent = imageValue;
//     cardElement.querySelector('.card__name').textContent = titleValue;
    
//     cardElement.querySelector('.card__like').addEventListener('click', (e) => {
//     e.target.classList.toggle('card__like_active');
//     });
    
//     cardsContainer.append(cardElement);
//   }




// let cardsContainer = document.querySelector('.cards');
// function addcard(newNameCard, newCardImage) {
//     const cardTemplate = document.querySelector('#card-template').content;
//     const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

//     nameInputCard.textContent = newNameCard.value;
//     imageInputCard.src = newCardImage.value;
//     imageInputCard.alt = newNameCard.value;

    
//     cardElement.querySelector('.card__like').addEventListener('click', (e) => {
//     e.target.classList.toggle('card__like_active');
//     });
    
//     cardsContainer.append(cardElement);
// }


//  initialCards.forEach(function(e) {
//     const template = document.querySelector('#card').textContent;
//     const card = card.cloneNode(true);
//     nameInputCard.textContent = element.name;
//     imageInputCard.src = element.link;
//     imageInputCard.alt = element.name;
//     list.appen(card)
// })

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1
// let formElementCard = document.querySelector('.popup__form_add_card');
// let nameInputCard = document.querySelector('.card__name');
// let imageInputCard = document.querySelector('.card__image');
// let newNameCard = document.querySelector('.popup__input_card_name')
// let newCardImage = document.querySelector('.popup__input_card_image')

// function formSubmitHandlerCard (evt) {
//     evt.preventDefault();

//     nameInputCard.textContent = newNameCard.value;
//     imageInputCard.src = newCardImage.value;
//     imageInputCard.alt = newNameCard.value;

//         togglePopupCard();
//     }
// formElementCard.addEventListener('submit', formSubmitHandlerCard); 

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
  
    // const editButton = element.querySelector('.edit');
    // editButton.addEventListener('click', handleEdit);
  
    // const duplicateButton = element.querySelector('.duplicate');
    // duplicateButton.addEventListener('click', handleDuplicate);
  }

  function handleDelete(event) {
    const currentListItem = event.target.closest('.card') // получаем родителя кнопки
      currentListItem.remove();
      resetEditMode();
  }
  






render();