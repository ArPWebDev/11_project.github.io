import Api from './api';
import Card from './card';
import CardList from './cardList';
import FormValidator from './formValidator';
import Popup from './popup';
import UserInfo from './userInfo';
import './pages/index.css';

(function () {
const placesList = document.querySelector('.places-list');
const itemTemplate = document.querySelector('.item_template').content;
const popupWindow = document.querySelector('.popup');
const openForm = document.querySelector('.user-info__button');
const closeForm = document.querySelector('.popup__close');
const popupForm = document.querySelector('.popup__form');
const popupUserForm = document.querySelector('.popup__form_user');
const name = document.querySelector('.popup__input_type_name');
const link = document.querySelector('.popup__input_type_link-url');
const popupUserWindow = document.querySelector('.popup_user');
const openUserForm = document.querySelector('.user-info__button-edit');
const popupImageWindow = document.querySelector('.popup_image');
const imagePicture = document.querySelector('.popup__picture');
const formNew = document.forms.new;
const formUser = document.forms.user;
const inputNameUser = formUser.elements.name;
const inputAboutMeUser = formUser.elements.job;
const urlAughtor = 'https://nomoreparties.co/cohort12/users/me';

function addNewCard(event) {
  event.preventDefault();
  cardList.addCard(name.value, link.value);
  popupAddCard.close();
  popupForm.reset();
  sendFormAdd.setSubmitButtonState(false);
}

const openImagePopup = (event) => {
  imagePicture.src = event.target.style.backgroundImage.slice(5, -2);
  popupImage.open();
}

function formUserSubmit(event){
  event.preventDefault();
  api.changeProfile(urlAughtor, inputNameUser.value, inputAboutMeUser.value)
  .then((res) => { 
    userInfoInitial.updateUserInfo();
    popupUser.close();
  })
  .catch(err => console.log(err));
}

const userInfoInitial = new UserInfo(document.querySelector('.user-info__name'), document.querySelector('.user-info__job'), document.querySelector('.user-info__photo'), inputNameUser, inputAboutMeUser); // - экземпляр класса UserInfo
const popupAddCard = new Popup(popupWindow,'popup_is-opened'); // - экземпляр функции открытия попапа доб новой карточки
const popupUser = new Popup(popupUserWindow,'popup_is-opened'); // - окна пользователя
const popupImage = new Popup(popupImageWindow,'popup_is-opened'); // - окна картинки

const sendFormAdd= new FormValidator(formNew);
sendFormAdd.setEventListeners();
const sendFormProfil= new FormValidator(formUser);
sendFormProfil.setEventListeners();


const api = new Api({
  url: `${(NODE_ENV==='development') ? 'http://nomoreparties.co/cohort12' : 'https://nomoreparties.co/cohort12'}`,
  authorization: '5fa2f291-5995-4891-ba48-42ee022650b8'
}); //создаем экзмепляр класса Api


const createCardFunction = (...args) => {
  // не забываем передавать фукнцию открытия попапа
  const card = new Card(...args, openImagePopup, itemTemplate);
  return card.create();
}


const cardList = new CardList(placesList, api, createCardFunction);
cardList.render();


api.sendRequest(urlAughtor)
.then((res) => {
  userInfoInitial.setUserInfo(res.name, res.about, res.avatar)
})
.catch(err => console.log(err));

popupForm.addEventListener('submit', addNewCard);
popupUserForm.addEventListener('submit', () => {formUserSubmit(event)});
openForm.addEventListener("click",() => { popupAddCard.open();});
openUserForm.addEventListener("click", () => { popupUser.open(); userInfoInitial.actualInputInfo(); sendFormProfil.setSubmitButtonState(true)});
closeForm.addEventListener("click", () => {popupForm.reset(); sendFormAdd.setSubmitButtonState(false);});
}());