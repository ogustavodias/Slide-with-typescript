export default class Slide {
  slides: HTMLElement[];
  currentElement: HTMLElement;
  currentIndex: number;

  constructor() {
    this.slides = [...document.querySelectorAll<HTMLElement>(".slide-item")];
    this.currentIndex = 0;
    this.currentElement = this.slides[this.currentIndex];
    console.log(this);
  }

  updateCurrent() {
    this.currentElement.classList.remove("active");
    this.currentElement = this.slides[this.currentIndex];
    this.currentElement.classList.add("active");
  }

  next() {
    const lenght = this.slides.length - 1;
    this.currentElement.classList.remove("active");
    this.currentIndex < lenght ? this.currentIndex++ : (this.currentIndex = 0);
    this.updateCurrent();
    return this;
  }

  prev() {
    const lenght = this.slides.length - 1;
    this.currentElement.classList.remove("active");
    this.currentIndex > 0 ? this.currentIndex-- : (this.currentIndex = lenght);
    this.updateCurrent();
    return this;
  }
}
