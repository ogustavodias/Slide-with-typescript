export default class Slide {
  slides: HTMLElement[] | null;
  controls: HTMLElement | null;
  currentElement: HTMLElement;
  currentIndex: number;

  constructor() {
    this.controls = document.querySelector("#slides-controls");
    this.slides = [...document.querySelectorAll<HTMLElement>(".slide-item")];
    this.currentIndex = 0;
    this.currentElement = this.slides[this.currentIndex];
    this.init();
    console.log(this);
  }

  createControls() {
    const prevButton = document.createElement("button");
    const nextButton = document.createElement("button");

    prevButton.innerText = "Previous slide";
    nextButton.innerText = "Next slide";

    prevButton.addEventListener("click", () => this.prev());
    nextButton.addEventListener("click", () => this.next());
    return { prevButton, nextButton };
  }

  addControls() {
    const { prevButton, nextButton } = this.createControls();
    if (this.controls) {
      this.controls.appendChild(prevButton);
      this.controls.appendChild(nextButton);
    }
  }

  updateCurrent() {
    if (this.slides) {
      this.currentElement.classList.remove("active");
      this.currentElement = this.slides[this.currentIndex];
      this.currentElement.classList.add("active");
    }
  }

  next() {
    if (this.slides) {
      const lenght = this.slides.length - 1;
      this.currentIndex < lenght
        ? this.currentIndex++
        : (this.currentIndex = 0);
      this.updateCurrent();
    }
    return this;
  }

  prev() {
    if (this.slides) {
      const lenght = this.slides.length - 1;
      this.currentIndex > 0
        ? this.currentIndex--
        : (this.currentIndex = lenght);
      this.updateCurrent();
    }
    return this;
  }

  init() {
    this.addControls();
  }
}
