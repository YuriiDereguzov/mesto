import './index.css';
import {
  validationConfig,
  initialCards,
} from '../utils/constants.js';
import {
  popupEditAvatar,
  popupEditAvatarOpen,
  popupEditProfile,
  popupEditProfileOpen,
  popupAddCard,
  popupAddCardOpen,
  textNameNew,
  textJobNew
} from '../utils/elements.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Card from '../components/Card.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import { api } from '../components/Api.js';
let userId

function createCard(cardData) {
  // Создадим экземпляр карточки
  const card = new Card(
      cardData,
      {
          handleCardClick: (link, name) => {
              popupWithImage.open(link, name);
          },
          handleDeleteClick: (id) => {
            deletePopup.open();
            deletePopup.setSubmitHandler(() => {
              api.deleteCard(id)
                .then(res => {
                  card.handleDelete();
                  deletePopup.close();
                })
                .catch((err) => {
                  console.log(`Ошибка: ${err}`); // выведем ошибку в консоль
                })
            });
          },
          handleLikeClick: (id) => {
            api.toggleLike(id, card.isLiked())
              .then(res => {
                  card.setLikes(res.likes);
              })
              .catch((err) => {
                console.log(`Ошибка: ${err}`); // выведем ошибку в консоль
              })
          }
      },
      '.card-template',
  );
  // Создаём карточку и возвращаем наружу
  const cardElement = card.generateCard();
  // Вернем готовую карточку
  return cardElement;
}

function renderCard(cardData) {
  const cardElement = createCard(cardData); // createCard просто создает карточку и возвращает её html представление
  section.addItem(cardElement);
}

function renderLoading(isLoading) {
  const openedPopup = document.querySelector('.popup_opened'); // нашли открытый попап
  const butonSave = openedPopup.querySelector('.popup__button-save');
  if(isLoading) {
    butonSave.textContent = "Сохранение..."
  } else {
    butonSave.textContent = "Сохранить"
  }
}

export const popupWithImage = new PopupWithImage('.popup_image_big');
const section = new Section({ /* items: [] initialCards */ renderer: renderCard }, '.cards')
const formProfileValidator = new FormValidator (validationConfig, popupEditProfile);
const formCardValidator = new FormValidator (validationConfig, popupAddCard);
const formAvatarValidator = new FormValidator (validationConfig, popupEditAvatar);
const userInfo = new UserInfo ({ nameSelector: '.profile__name', jobSelector: '.profile__job', avatarSelector: '.profile__avatar'});
const formPopupEditProfile = new PopupWithForm(
  '.popup_edit-profile',
  {
    handleFormSubmit: (items) => {
      renderLoading(true);
      api.editProfile(items.name, items.job)
        .then(res => {
          userInfo.setUserInfo(items.name, items.job);
          renderLoading(false);
          formPopupEditProfile.close();
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`); // выведем ошибку в консоль
        })
        // .finally(() => {
        //   // вызов renderLoading
        //   renderLoading(false);
        // })
    }
  }
); 
const formPopupAddCard = new PopupWithForm(
  '.popup_add_card',
  {
    handleFormSubmit: (items) => {
      renderLoading(true);
      api.addCard(items.name, items.link)
        .then(res => {
          const card = createCard({
            name: res.name,
            link: res.link,
            likes: res.likes,
            id: res._id,
            userId: userId,
            ownerId: res.owner._id
          });
          section.addItem(card);
          renderLoading(false);
          formPopupAddCard.close();
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`); // выведем ошибку в консоль
        })
        // .finally(() => {
        //   // вызов renderLoading
        //   renderLoading(false);
        // })
    }
  }
); 
const deletePopup = new PopupWithConfirmation(
  '.popup_delete_card',
  {
    handleFormSubmit: () => {}
  }
); 
const formPopupEditAvatar = new PopupWithForm(
  '.popup_edit_avatar',
  {
    handleFormSubmit: (items) => {
      renderLoading(true);
      // console.log(items)
      api.editAvatar(items.link)
        .then(res => {
          // console.log('ответ', res)
          userInfo.setUserAvatar(items.link);
          renderLoading(false);
          formPopupEditAvatar.close();
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`); // выведем ошибку в консоль
        })
        // .finally(() => {
        //   // вызов renderLoading
        //   renderLoading(false);
        // })
    }
  }
); 

api.getProfile()
  .then(res => {
    // console.log('ответ', res)
    userInfo.setUserInfo(res.name, res.about);
    userInfo.setUserAvatar(res.avatar);
    userId = res._id;
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`); // выведем ошибку в консоль
  })
api.getInitialCards()
  .then(cardList => {
    cardList.forEach(data => {
      const card = createCard({
        name: data.name,
        link: data.link,
        likes: data.likes,
        id: data._id,
        userId: userId,
        ownerId: data.owner._id
      });
      section.addItem(card);
    });
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`); // выведем ошибку в консоль
  })
// Вызоваем функции
formProfileValidator.enableValidation();
formCardValidator.enableValidation();
formAvatarValidator.enableValidation();
popupWithImage.setEventListeners();
formPopupAddCard.setEventListeners();
formPopupEditProfile.setEventListeners();
formPopupEditAvatar.setEventListeners();
deletePopup.setEventListeners();
// section.renderInitialItems(initialCards);

// Вешаем обработчики
popupEditProfileOpen.addEventListener('click', () => {
  formProfileValidator.resetValidation();
  const {name, job} = userInfo.getUserInfo();
  textNameNew.value = name;
  textJobNew.value = job;
  formPopupEditProfile.open();
});
popupAddCardOpen.addEventListener('click', () => {
  formPopupAddCard.open();
  formCardValidator.disableSubmitButton();
});
popupEditAvatarOpen.addEventListener('click', () => {
  formPopupEditAvatar.open();
  formAvatarValidator.disableSubmitButton();
});