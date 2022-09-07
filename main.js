const overlayEl = document.querySelector('.overlay');
const openPopupButton = document.querySelector('.info-item__edit-button');
const closePopupButton = overlayEl.querySelector('.popup__close-button');

// openPopupButton.addEventListener('click', () => {
//     overlayEl.classList.add('overlay_opened');
// })

// closePopupButton.addEventListener('click', () => {
//     overlayEl.classList.remove('overlay_opened');
// })

const toggleOverlay = () => {
    overlayEl.classList.toggle('overlay_opened');
}

openPopupButton.addEventListener('click', () => {
    toggleOverlay();
    newTextName.value = nameInput.textContent;
    newTextJob.value = jobInput.textContent;
})

closePopupButton.addEventListener('click', () => {
    toggleOverlay();
})

// document.addEventListener('click', (event) => {

//     if (event.target.classList.contains('info-item__edit-button')) {
//         toggleOverlay();
//     }

//     if (event.target.classList.contains('popup__close-button')) {
//         toggleOverlay();
//     }
// });





// Находим форму в DOM
let formElement = document.querySelector('.popup__container');// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = document.querySelector('.info-item__title');// Воспользуйтесь инструментом .querySelector()
let jobInput = document.querySelector('.info-item__subtitle');// Воспользуйтесь инструментом .querySelector()

let newTextName = document.querySelector('.popup__data-name')
let newTextJob = document.querySelector('.popup__data-job')

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
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler); 

onsubmit = toggleOverlay;