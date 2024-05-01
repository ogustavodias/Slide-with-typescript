import Interval from "./Interval.js";

export default class Slide {
  container: HTMLElement | null;
  slides: HTMLElement[] | null;
  controls: HTMLElement | null;
  currentElement: HTMLElement;
  currentIndex: number;
  interval: Interval | null;
  time: number;
  paused: boolean;
  pausedTimeout: number | null;

  constructor(time: number = 5000) {
    this.container = document.querySelector("#slides");
    this.slides = [...document.querySelectorAll<HTMLElement>(".slide-item")];
    this.controls = document.querySelector("#slides-controls");
    this.currentIndex = 0;
    this.currentElement = this.slides[this.currentIndex];
    this.interval = null;
    this.time = time;
    this.paused = false;
    this.pausedTimeout = null;
    this.init();
  }

  createControls() {
    const prevButton = document.createElement("button");
    const nextButton = document.createElement("button");

    prevButton.innerText = "Previous slide";
    nextButton.innerText = "Next slide";

    prevButton.addEventListener("pointerup", () => this.prev());
    nextButton.addEventListener("pointerup", () => this.next());

    return { prevButton, nextButton };
  }

  addControls() {
    const { prevButton, nextButton } = this.createControls();
    if (this.controls) {
      this.controls.appendChild(prevButton);
      this.controls.appendChild(nextButton);
      this.controls.addEventListener("pointerdown", () => this.pause());
      this.controls.addEventListener("pointerup", () => this.resume());
    }
  }

  updateCurrent() {
    if (this.slides) {
      this.currentElement.classList.remove("active");
      this.currentElement = this.slides[this.currentIndex];
      this.currentElement.classList.add("active");
    }
  }

  auto(time: number) {
    this.interval?.clear();
    this.interval = new Interval(() => this.next(), time);
  }

  pause() {
    this.pausedTimeout = setTimeout(() => {
      this.paused = true;
    }, 300);
  }

  resume() {
    this.paused = false;
    if (this.pausedTimeout) clearTimeout(this.pausedTimeout);
  }

  next() {
    if (this.slides && !this.paused) {
      const lenght = this.slides.length - 1;
      this.currentIndex < lenght
        ? this.currentIndex++
        : (this.currentIndex = 0);
      this.updateCurrent();
    }
    return this;
  }

  prev() {
    if (this.slides && !this.paused) {
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
    this.auto(this.time);
  }
}
