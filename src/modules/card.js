export default class Card {
    constructor(name, link, openImagePopup, itemTemplate) {
        this.name = name;
        this.link = link;
        
        // функция открытия попапа
        this.openImagePopup = openImagePopup;
        
        // ссылка на шаблон
        this.itemTemplate = itemTemplate;
    }

  create() {
    const card = this.itemTemplate.cloneNode(true).children[0];
    const cardName = card.querySelector('.place-card__name');
    const cardImage = card.querySelector('.place-card__image');
    cardName.textContent = this.name;
    /*
    Отлично, что используется интерполяция строк из ES6
    */
    cardImage.style.backgroundImage = `url(${this.link})`;  
    // тут функция создания карточки,
    // мы должны вернуть ссылку на элемент карточки
    // созданные элемент буде
    this.cardElement = card;
    this.addListeners();
    return this.cardElement;
  }

  addListeners() {
      this.cardElement.querySelector('.place-card__like-icon').addEventListener('click', this.like);
      this.cardElement.querySelector('.place-card__delete-icon').addEventListener('click', this.remove);
      this.cardElement.querySelector('.place-card__image').addEventListener('click', this.openPopup);
  }

  remove = (event) => {
    event.stopPropagation();
    this.removeEventListeners();
    this.cardElement.remove();
  }

  removeEventListeners = () => {
    this.cardElement.querySelector('.place-card__like-icon').removeEventListener('click', this.like);
    this.cardElement.querySelector('.place-card__image').removeEventListener('click', this.openPopup);
    this.cardElement.querySelector('.place-card__delete-icon').removeEventListener('click', this.remove);
  }

  like = (event) => {
    event.target.classList.toggle('place-card__like-icon_liked');
}

  openPopup = (event) => {

    // тут мы вызываем функцию открытия попапа,
    // которую передали в конструктор
    // параметром может быть что угодно и любую обработку можем выполнить тут
    this.openImagePopup(event);
  }
}