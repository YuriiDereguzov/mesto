const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.button',
  invalidButtonClass: 'popup__button_invalid',
  inactiveButtonClass: "disabled",
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
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

// сделай кнопку неактивной
const inactiveButtonSubmit = (buttonElement, obj) => {
  // buttonElement.classList.add(obj.invalidButtonClass);
  // buttonElement.setAttribute(obj.inactiveButtonClass, true);
  buttonElement.classList.add('popup__button_invalid');
  buttonElement.setAttribute("disabled", true);
}
// сделай кнопку активной
const activeButtonSubmit = (buttonElement, obj) => {
  buttonElement.classList.remove(obj.invalidButtonClass);
  buttonElement.removeAttribute(obj.inactiveButtonClass, false);
}

// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять
const toggleButtonState = (inputList, buttonElement, obj) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    inactiveButtonSubmit(buttonElement, obj);
  } else {
    // иначе сделай кнопку активной
    activeButtonSubmit(buttonElement, obj);
  }
}; 
  
// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage, obj) => {
  // Находим элемент ошибки
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  
  inputElement.classList.add(obj.inputErrorClass);
  // Заменим содержимое span с ошибкой на переданный параметр
  errorElement.textContent = errorMessage;
  // Показываем сообщение об ошибке
  errorElement.classList.add(obj.errorClass);
}
  
// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement, obj) => {
  // Находим элемент ошибки
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  
  inputElement.classList.remove(obj.inputErrorClass);
  // Скрываем сообщение об ошибке
  errorElement.classList.remove(obj.errorClass);
  // Очистим ошибку
  errorElement.textContent = '';
}
  
// Функция isValid теперь принимает formElement и inputElement,
// а не берёт их из внешней области видимости
const isValid = (obj, formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    isValidText (inputElement);
    // showInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    showInputError(formElement, inputElement, inputElement.validationMessage, obj);
  } else {
    // hideInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    hideInputError(formElement, inputElement, obj);
  }
}
  
// Добавление обработчиков всем полям формы
const setEventListeners = (formElement, obj) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector));
  // Найдём в текущей форме кнопку отправки
  const buttonElement = formElement.querySelector(obj.submitButtonSelector);
  // Вызовем toggleButtonState, чтобы не ждать ввода данных в поля
  toggleButtonState(inputList, buttonElement, obj);
  
  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      isValid(obj, formElement, inputElement);
      // чтобы проверять его при изменении любого из полей
      // Вызовем toggleButtonState и передадим ей массив полей и кнопку
      toggleButtonState(inputList, buttonElement, obj);
    });
  });
}
  
// Добавление обработчиков всем формам
const enableValidation = (obj) => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll(obj.formSelector));
  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(formElement, obj);
  });
}
// включение валидации вызовом enableValidation
// Вызовем функцию
// все настройки передаются при вызове
enableValidation(settings); 