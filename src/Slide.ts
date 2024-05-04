import Timeout from "./Timeout.js";

export default class Slide {
  container: HTMLElement | null;
  slides: HTMLElement[];
  controls: HTMLElement | null;
  timeBarContainer: HTMLElement | null;
  timeBarItens: HTMLElement[] | null;
  currentElement: HTMLElement;
  currentIndex: number;
  time;
  timeout: Timeout | null;
  paused: boolean;
  pausedTimeout: Timeout | null;

  constructor(time: number = 5000) {
    this.container = document.querySelector("#slides");
    this.slides = [...document.querySelectorAll<HTMLElement>(".slide-item")];
    this.controls = document.querySelector("#slides-controls");
    this.timeBarContainer = document.querySelector("#slides-time-bar");
    this.timeBarItens = null;
    this.currentIndex = 0;
    this.currentElement = this.slides[this.currentIndex];
    this.time = time;
    this.timeout = null;
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

  createTimeBar() {
    if (this.timeBarContainer) {
      this.slides.forEach(() => {
        this.timeBarContainer!.innerHTML += "<span><span></span></span>";
      });
      this.timeBarItens = [
        ...this.timeBarContainer.querySelectorAll<HTMLElement>("span > span"),
      ];
    }
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
    this.currentElement.classList.remove("active");
    this.currentElement = this.slides[this.currentIndex];
    this.currentElement.classList.add("active");

    if (this.timeBarContainer) {
      this.timeBarItens!.forEach((item) => item.classList.remove("happen"));
      this.timeBarItens![this.currentIndex].classList.toggle("happen");
      this.timeBarItens![
        this.currentIndex
      ].style.animationDuration = `${this.time}ms`;
    }
  }

  auto() {
    if (this.currentElement instanceof HTMLVideoElement) {
      const time = this.currentElement.duration * 1000;
      this.timeout = new Timeout(() => this.next(), time);
      this.timeBarItens![
        this.currentIndex
      ].style.animationDuration = `${time}ms`;
    } else this.timeout = new Timeout(() => this.next(), this.time);
  }

  pause() {
    this.pausedTimeout = new Timeout(() => {
      this.paused = true;
      this.timeout?.pause();
      this.timeBarItens![this.currentIndex].classList.add("paused");
      console.log(this.timeout?.timeleft);
    }, 300);
  }

  resume() {
    this.paused = false;
    this.pausedTimeout?.clear();
    this.timeout?.resume();
    this.timeBarItens![this.currentIndex].classList.remove("paused");
  }

  next() {
    if (!this.paused) {
      this.timeout?.clear();
      const lenght = this.slides.length - 1;
      this.currentIndex < lenght
        ? this.currentIndex++
        : (this.currentIndex = 0);
      this.auto();
      this.updateCurrent();
    }
    return this;
  }

  prev() {
    if (!this.paused) {
      this.timeout?.clear();
      const lenght = this.slides.length - 1;
      this.currentIndex > 0
        ? this.currentIndex--
        : (this.currentIndex = lenght);
      this.auto();
      this.updateCurrent();
    }
    return this;
  }

  init() {
    if (this.slides) {
      this.addControls();
      this.createTimeBar();
      this.updateCurrent();
      this.auto();
    }
  }
}
