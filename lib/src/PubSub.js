"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PubSub {
    constructor() {
        this.callbacks = [];
    }
    subscribe(callback) {
        // @ts-expect-error TS(2345) FIXME: Argument of type 'any' is not assignable to parame... Remove this comment to see the full error message
        this.callbacks.push(callback);
    }
    unsubscribe(callback) {
        this.callbacks = this.callbacks.filter((cb) => cb !== callback);
    }
    publish(obj) {
        this.callbacks.forEach((cb) => {
            // @ts-expect-error TS(2349) FIXME: This expression is not callable.
            cb(obj);
        });
    }
}
exports.default = PubSub;
//# sourceMappingURL=PubSub.js.map