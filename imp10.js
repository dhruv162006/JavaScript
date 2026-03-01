const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class MyPromise {
    constructor(executor) {
        this.state = PENDING;
        this.value = undefined;
        this.handlers = [];

        const resolve = (value) => {
            if (this.state !== PENDING) return;
            if (value instanceof MyPromise) {
                return value.then(resolve, reject);
            }
            this.state = FULFILLED;
            this.value = value;
            this.runHandlers();
        };

        const reject = (reason) => {
            if (this.state !== PENDING) return;
            this.state = REJECTED;
            this.value = reason;
            this.runHandlers();
        };

        try {
            executor(resolve, reject);
        } catch (err) {
            reject(err);
        }
    }

    runHandlers() {
        queueMicrotask(() => {
            this.handlers.forEach(h => this.handle(h));
            this.handlers = [];
        });
    }

    handle(handler) {
        if (this.state === PENDING) {
            this.handlers.push(handler);
            return;
        }

        if (this.state === FULFILLED) {
            if (!handler.onFulfilled) {
                handler.resolve(this.value);
            } else {
                try {
                    const result = handler.onFulfilled(this.value);
                    handler.resolve(result);
                } catch (err) {
                    handler.reject(err);
                }
            }
        }

        if (this.state === REJECTED) {
            if (!handler.onRejected) {
                handler.reject(this.value);
            } else {
                try {
                    const result = handler.onRejected(this.value);
                    handler.resolve(result);
                } catch (err) {
                    handler.reject(err);
                }
            }
        }
    }

    then(onFulfilled, onRejected) {
        return new MyPromise((resolve, reject) => {
            this.handle({
                onFulfilled,
                onRejected,
                resolve,
                reject
            });
        });
    }

    catch(onRejected) {
        return this.then(null, onRejected);
    }

    static resolve(value) {
        return new MyPromise((res) => res(value));
    }

    static reject(reason) {
        return new MyPromise((_, rej) => rej(reason));
    }
}