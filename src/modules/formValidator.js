export default class FormValidator {
    constructor(formV) {
        this.formV = formV;
        this.setEventListeners = this.setEventListeners.bind(this);
    }
  
    checkInputValidity (inputElement, errorMessageElement) {
        if (inputElement.validity.valueMissing) {
        errorMessageElement.textContent = 'Это обязательное поле';
        return false;
        } 
        if (inputElement.validity.tooShort || inputElement.validity.tooLong) {
        errorMessageElement.textContent = 'Должно быть от 2 до 30 символов';
        return false;
        }  
        if (inputElement.validity.typeMismatch && inputElement.type === 'url') {
        errorMessageElement.textContent = 'Здесь должна быть ссылка';
        return false;
        } else {
        errorMessageElement.textContent = '';
        return true;
        }
    }
    
    setSubmitButtonState(state) {
        const button = this.formV.querySelector('button');
        if (state) {
        button.removeAttribute('disabled', true);
        button.classList.add('popup__form_valid');
        }
         else{
        button.setAttribute('disabled', true);
        button.classList.remove('popup__form_valid');
        }     
    }

    isFieldValid(input) {
        const errorElem = this.formV.querySelector(`#${input.id}-error`);
        const valid = this.checkInputValidity(input ,errorElem);
        return valid;
    }

  setEventListeners() {
    const inputs = [...this.formV.querySelectorAll('input')];
    this.formV.addEventListener('input', (event)=>{
      const inputForValidation = event.target;
      this.isFieldValid(inputForValidation);
      if (inputs.every((input) => input.validity.valid)) {
        this.setSubmitButtonState(true);
        } else {
        this.setSubmitButtonState(false);
        }
    });
  } 
}