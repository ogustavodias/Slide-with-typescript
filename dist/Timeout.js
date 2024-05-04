export default class Timeout {
    id;
    time;
    start;
    timeleft;
    handler;
    constructor(handler, time) {
        this.id = setTimeout(handler, time);
        this.handler = handler;
        this.time = time;
        this.start = new Date().getTime();
        this.timeleft = time;
    }
    clear() {
        clearTimeout(this.id);
    }
    pause() {
        const now = new Date().getTime();
        this.clear();
        this.timeleft = this.time - (now - this.start);
        this.start = now;
    }
    resume() {
        this.id = setTimeout(this.handler, this.timeleft);
    }
}
//# sourceMappingURL=Timeout.js.map