export default class Timeout {
    id;
    handler;
    timeleft;
    start;
    constructor(handler, time) {
        this.id = setTimeout(handler, time);
        this.handler = handler;
        this.start = new Date();
        this.timeleft = time;
    }
    clear() {
        clearTimeout(this.id);
    }
    pause() {
        this.timeleft = new Date().getTime() - this.start.getTime();
        console.log(this.timeleft);
    }
    resume() { }
}
//# sourceMappingURL=Interval.js.map