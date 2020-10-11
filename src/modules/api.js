export default class Api {
    constructor(config) {
      this.url = config.url;
      this.authorization= config.authorization
    }

    getResponseData(res){
      if(!res.ok){
        return Promise.reject(new Error(`Ошибка: ${res.status}`));
      } else {
        return res.json();
      }
    }

    getCards = () => {
      return fetch(`${this.url}/cards`, {
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