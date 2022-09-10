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


const togglePopup = () => {
    popup.classList.toggle('popup_opened');
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


openPopupButton.addEventListener('click', () => {
    togglePopup();
    newTextName.value = nameInput.textContent;
    newTextJob.value = jobInput.textContent;
})

closePopupButton.addEventListener('click', togglePopup);


// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler); 


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



// const likes = document.querySelectorAll('.card__like');

// const toggleClass = (e) => {
//     e.classList.toggle('card__like_active');
// }

// likes.addEventListener('click', (e) => {
// debugger;    toggleClass(e.currentTarget);
// })