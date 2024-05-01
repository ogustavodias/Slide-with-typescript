export default class Interval {
    id;
    handler;
    constructor(handler, time) {
        this.id = setInterval(handler, time);
        this.handler = handler;
    }
    clear() {
        clearInterval(this.id);
    }
}
//# sourceMappingURL=Interval.js.map