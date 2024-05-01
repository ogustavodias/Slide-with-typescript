export default class Interval {
  id;
  handler;

  constructor(handler: TimerHandler, time: number) {
    this.id = setInterval(handler, time);
    this.handler = handler;
  }

  clear() {
    clearInterval(this.id);
  }
}
