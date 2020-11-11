export default class CardList {

  /**
   * Это конструктор класса, в него мы передаем ссылку на список,
   * изначальный массив и функцию создания карточки
   */
  constructor(container, api, createCardFunction) {
    this.container = container;
    this.api = api;
    this.createCardFunction = createCardFunction;
  }

  // тут просто добавляем карточку, вызываем переданную функцию в конструктор
  addCard(name, link) {
    const card = this.createCardFunction(name, link);
    this.container.appendChild(card);
  }

  render(){
    this.api.getCards().then((res)=>{
      res.forEach((item) =>{
        this.addCard(item.name, item.link);
      })
    })
    .catch((err)=>{
      console.log(err)
    })
  /*REVIEW. Надо исправить.  В конце каждой цепочки промисов обязательно должен быть блок catch, иначе ошибки при работе с сервером, произошедшие в этой цепочке
  нигде не обработаются, вызовут исключение и останов приложения, или выполнение методов then с неверными результатами. Если ошибки обнаружатся в блоке catch, который будет в конце цепочки промисов, автоматической остановки приложения
не будет. Об этом также можно прочитать здесь: https://learn.javascript.ru/promise-error-handling.
Добавьте метод catch в конец каждой цепочки промисов обработки ответов сервера. +
*/

  }
}

