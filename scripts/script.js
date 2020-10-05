const module = (function () {
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

/*REVIEW. Надо лучше. target в параметрах функции и в её коде, интерпретатор js не воспринимает, как одно и то же. Поэтому параметр target
в функции никак не используется. Если код функции зависит от event.target, нужно как параметр задавать объект события event. Но, лучше задать
параметром переменную link, которая будет принимать как значение значение ссылки  this.link в классе Card, тогда вычисление
imagePicture.src не потребуется, так как imagePicture.src будет равно link */
const openImagePopup = (event) => {
  imagePicture.src = event.target.style.backgroundImage.slice(5, -2);
  popupImage.open();
}

function formUserSubmit(event){
  event.preventDefault();
  /*REVIEW. Надо исправить. Заносить информацию из полей формы в элементы страницы, показывающие её на экране, до обращения к серверу и прихода от него
положительного ответа, нельзя (см. комментарий ниже). */
  /*REVIEW. Надо исправить. Вы никак не обрабатываете ответ от сервера после запроса к нему с помощью метода  api.changeProfile, а это нужно делать.
После вызова  api.changeProfile должен быть метод then (перед catch), где и надо будет занести информацию о профиле
в DOM-элементы страницы, так как эта информация должна там меняться только в случае успешного ответа сервера, а в случае неуспешного (информация
на сервере не сохранилась) вообще не должна меняться, чтобы не нарушалась идентичность информации на сервере и на странице. Для верности
лучше в элементы страницы вносить информацию из объекта, который вернёт сервер (читайте об этом объекте в описании задания пункт "3. Редактирование профиля"),
а не информацию из формы. */
  api.changeProfile(urlAughtor, inputNameUser.value, inputAboutMeUser.value)
  .then((res) => { 
    userInfoInitial.updateUserInfo();
    popupUser.close();
  })
  .catch(err => console.log(err));
 /*REVIEW. Надо исправить. В этом же методе then, нужно произвести закрытие формы профиля, (и нигде в другом месте при сабмите формы инструкции её закрытия
быть не должно), так как форма должна закрыться только после прихода успешного ответа от сервера и заполнения элементов страницы информацией (не раньше).
Если придёт неуспешный ответ (информация на сервере не сохранилась) форма вообще не должна закрываться - пользователь может выйти из формы по крестику,
когда Вы ему сообщите о неуспешности, или попробовать ещё раз.
Инструкция закрытия формы должна быть именно в методе then обработки ответа сервера, так как взаимодействие с сервером является асинхронной операцией.
Если же Вы поместите вызов метода закрытия в другом месте, закрытие произойдёт заведомо раньше, чем придёт какой-либо ответ от сервера (успешный, или неуспешный)
Асинхронность означает, что все команды проекта, находящиеся вне метода then обработки ответа от сервера, выполнятся (которые могут выполниться
в это время ожидания ответа в соответствии с очередью) раньше, чем придёт ответ от сервера. И, если Вы хотите, чтобы какие-то команды не выполнялись до
прихода ответа, их нужно поместить в методы then, catch или finally обработки ответа сервера.
*/
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
  url:'https://nomoreparties.co/cohort12/cards',
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
})();



/* REVIEW. Резюме.
В целом очень неплохой проект.

Но, надо исправить некоторые существенные нюансы.


Что надо исправить.

1. При входе в форму профиля сразу после загрузки страницы, в её полях нет информации со страницы (см. снимок 1 экрана в корне Вашего проекта),
хотя должна быть всегда при открытии этой формы. +

2. Если выйти из формы профиля по крестику, предварительно сделав информацию в форме невалидной, при повторном входе в форму после этого,
информация со страницы на неё не переносится, хотя должна переносится всегда (см. снимок 2 экрана в корне Вашего проекта). Нужно делать перенос
информации в слушателе события открытия этой формы. +

3. Нужно преобразовать структуру методов Api (подробный комментарий и образец в файле api.js). +

4. В конце каждой цепочки промисов обязательно должен быть блок catch. Добавьте метод catch в конец каждой цепочки промисов
обработки ответов сервера (подробный комментарий в файле cardList.js). +

5. Заносить информацию из полей формы в элементы страницы, показывающие её на экране, до обращения к серверу и прихода от него
положительного ответа, нельзя (подробный комментарий в файле script.js в коде formUserSubmit). +

6. Вы никак не обрабатываете ответ от сервера после запроса к нему с помощью метода  api.changeProfile, а это нужно делать
(подробный комментарий в файле script.js в коде formUserSubmit). +

7. Нужно произвести закрытие формы профиля при сабмите в методе then обработки ответа сервера (подробный комментарий в файле script.js в коде formUserSubmit). +


Что можно улучшить.

1. В функции openImagePopup лучше задать параметром переменную link, которая будет принимать как значение значение ссылки
(подробный комментарий в файле script.js).


*/