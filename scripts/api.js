class Api {
    constructor(config) {
      this.url = config.url;
      this.authorization= config.authorization
    }

    /*REVIEW. Надо исправить. Структура методов класса Api должна быть следующей:

methodApi = (...) => {
  return fetch(`...`, {
     ...
    })
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res.status);
      } else {
        return res.json();
      }
    })
}
То есть после проверки, в каком диапазоне находится HTTP-статус ответа сервера (если в диапазоне 200-299, то res.ok === true, иначе res.ok === false,
https://learn.javascript.ru/fetch) должно быть  возвращение Promise.reject(res.status), так как  в случае неуспешного запроса и ответа,
в вашем блоке catch не сможет быть обнаружена ситуация неуспешности запроса, так как блок catch может обнаружить только объект ошибки,
если он каким-либо образом создаётся. Так как сервер всегда в методе fetch возвращает объект ответа, а не ошибки, в случае ошибочного
ответа и нужно вызвать метод Promise.reject(res.status), который и вернёт объект ошибки со статусом res.status, который и сможет быть
обнаружен и обработан в catch.

Структура вызова преобразованного метода API и обработки результата ответа должна быть такой:
api.methodApi(параметры).then(обработка ответа силами методов других классов).catch(...);

*/

    getResponseData(res){
      if(!res.ok){
        return Promise.reject(new Error(`Ошибка: ${res.status}`));
      } else {
        return res.json();
      }
    }

    getCards = () => {
      return fetch(this.url, {
        method: 'GET',
        headers: {
            authorization: this.authorization
        }
      })
      .then(this.getResponseData)
    }

    sendRequest(url) {
      return fetch(url, {
        method: 'GET',
        headers: {
        authorization: this.authorization
        }
      })
      .then(this.getResponseData)
    }
    changeProfile(url, Name, About) {
      return fetch(url, {
            method: 'PATCH',
            headers: {
                authorization: this.authorization,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            name: Name,
            about: About
            })
        })
        .then(this.getResponseData)
    }
}