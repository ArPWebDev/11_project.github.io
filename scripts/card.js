class Card {
    constructor(name, link, openImagePopup, itemTemplate) {
        /* Можно лучше: 
    
        Лучше передавать не отдельные параметры, а сразу весь объект с данными карточки,
        т.к. представьте что у карточки появится ещё одно свойство (например author) которое нужно будет отобразить
        Если у нас создание карточки вызывается как new Card(name,link), придется во всех местах
        где вызывается создание карточки переписывать её вызов с new Card(name,link) на new Card(name, link, author) 
        Если ли же мы передаем просто объект карточки в функцию ( new Card(cardData) ) нам придется гораздо меньше менять программу
        */
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

  // обрати внимание, как я задаю функцию обработчик,
  // это нужно для того, что не потерялся контекст this
  // в одном из тредов я кидал набор статей про контекст,
  //  рекомендую почитать
  /* Надо исправить:

  При удалении карточки необходимо так же удалять обработчики событий с её элементов, это есть в чеклисте
  "Если слушать события становится не нужно или элемент удаляется из разметки, обработчик должен быть удалён."
  Для удаления обработчиков событий необходимо использовать метод removeEventListener. 

  Удаление обработчиков собыйти с элементов лучше всего вынести в отдельный метод - removeEventListeners
  и вызывать его в методе remove
  */
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