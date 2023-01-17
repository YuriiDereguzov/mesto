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
import { api } from '../components/Api.js';

let userId

api.getProfile()
  .then(res => {
    // console.log('ответ', res)
    userInfo.setUserInfo(res.name, res.about);
    userInfo.setUserAvatar(res.avatar);
    userId = res._id;
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
  });

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
                });
            });
          },
          handleLikeClick: (id) => {
            if(card.isLiked()) {
              api.deleteLike(id)
                .then(res => {
                  card.setLikes(res.likes);
                });
            } else {
              api.addLike(id)
                .then(res => {
                  card.setLikes(res.likes);
                });
              }
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

const section = new Section({ items: []/* initialCards */, renderer: renderCard }, '.cards')
section.renderInitialItems();

const formProfileValidator = new FormValidator (validationConfig, popupEditProfile);
const formCardValidator = new FormValidator (validationConfig, popupAddCard);
const formAvatarValidator = new FormValidator (validationConfig, popupEditAvatar);
export const popupWithImage = new PopupWithImage('.popup_image_big');
const userInfo = new UserInfo ({ nameSelector: '.profile__name', jobSelector: '.profile__job', avatarSelector: '.profile__avatar'});

const formPopupEditProfile = new PopupWithForm(
  '.popup_edit-profile',
  {
    handleFormSubmit: (items) => {
      api.editProfile(items.name, items.job)
        .then(res => {
          userInfo.setUserInfo(items.name, items.job);
          formPopupEditProfile.close();
        });
      // userInfo.setUserInfo(items.name, items.job);
      // formPopupEditProfile.close();
    }
  }
); 

const formPopupAddCard = new PopupWithForm(
  '.popup_add_card',
  {
    handleFormSubmit: (items) => {
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
          formPopupAddCard.close();
        });
      // const cardData = {
      //   name: items.name,
      //   link: items.link,
      // }; 
      // renderCard(cardData);

      // formPopupAddCard.close();
    }
  }
); 

const deletePopup = new PopupWithForm(
  '.popup_delete_card',
  {
    handleFormSubmit: () => {
      // api.deleteCard(id)
      //   .then(res => {
      //     console.log('res', res)
      //   })
      // console.log('delete!!!')
    }
  }
); 

const formPopupEditAvatar = new PopupWithForm(
  '.popup_edit_avatar',
  {
    handleFormSubmit: (items) => {
      // console.log(items)
      api.editAvatar(items.link)
        .then(res => {
          // console.log('ответ', res)
          userInfo.setUserAvatar(items.link);
          formPopupEditAvatar.close();
        });
    }
  }
); 

// Вызоваем функции
formProfileValidator.enableValidation();
formCardValidator.enableValidation();
formAvatarValidator.enableValidation();
popupWithImage.setEventListeners();
formPopupAddCard.setEventListeners();
formPopupEditProfile.setEventListeners();
formPopupEditAvatar.setEventListeners();
deletePopup.setEventListeners();

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