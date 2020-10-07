export default class Popup {
	constructor(element, openClassName) {
        this.element = element;
		this.element.querySelector('.popup__close').addEventListener("click", () => this.close());
		this.openClassName = openClassName;
	}

	open() {
		this.element.classList.add(this.openClassName);	
	}

	close() {
		this.element.classList.remove(this.openClassName);
		this.element.querySelectorAll('.popup__error').forEach((element) => {element.textContent = '';});
	}
}