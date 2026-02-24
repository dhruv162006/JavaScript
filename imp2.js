"use strict";

const uniqueId = Symbol("id");

function createUser(name, role) {
    return {
        name,
        role,
        [uniqueId]: Math.random().toString(36).slice(2)
    };
}

function Animal(type) {
    this.type = type;
}
Animal.prototype.speak = function () {
    return `${this.type} makes a sound`;
};

function Dog(name) {
    Animal.call(this, "Dog");
    this.name = name;
}
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;
Dog.prototype.bark = function () {
    return `${this.name} barks`;
};

const dog = new Dog("Rocky");

const map = new Map();
map.set("a", 1);
map.set("b", 2);

const set = new Set([1, 2, 3, 3, 4]);

const weakMap = new WeakMap();
const objKey = {};
weakMap.set(objKey, "private");

function* idGenerator() {
    let id = 1;
    while (true) {
        yield id++;
    }
}

const generator = idGenerator();
const genId1 = generator.next().value;
const genId2 = generator.next().value;

const iterableObject = {
    data: [10, 20, 30],
    [Symbol.iterator]() {
        let index = 0;
        return {
            next: () => ({
                value: this.data[index],
                done: index++ >= this.data.length
            })
        };
    }
};

const proxyTarget = { name: "Dhruv", age: 20 };
const proxy = new Proxy(proxyTarget, {
    get(target, prop, receiver) {
        if (prop in target) {
            return Reflect.get(target, prop, receiver);
        }
        return "Property not found";
    },
    set(target, prop, value) {
        if (prop === "age" && value < 0) return false;
        return Reflect.set(target, prop, value);
    }
});

function debounce(fn, delay) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
    };
}

function throttle(fn, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            fn.apply(this, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
}

class EventEmitter {
    constructor() {
        this.events = {};
    }
    on(event, listener) {
        if (!this.events[event]) this.events[event] = [];
        this.events[event].push(listener);
    }
    emit(event, data) {
        if (this.events[event]) {
            this.events[event].forEach(listener => listener(data));
        }
    }
}

const emitter = new EventEmitter();
emitter.on("login", user => console.log("User logged in:", user));
emitter.emit("login", "Dhruv");

function deepClone(obj) {
    if (obj === null || typeof obj !== "object") return obj;
    if (Array.isArray(obj)) return obj.map(deepClone);
    const cloned = {};
    for (let key in obj) {
        cloned[key] = deepClone(obj[key]);
    }
    return cloned;
}

const original = { a: 1, b: { c: 2 } };
const cloned = deepClone(original);

const jsonString = JSON.stringify(original);
const parsed = JSON.parse(jsonString);

const now = new Date();
const formattedDate = new Intl.DateTimeFormat("en-IN", {
    dateStyle: "full",
    timeStyle: "long"
}).format(now);

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const isValidEmail = emailRegex.test("test@example.com");

const sealedObject = Object.seal({ name: "Dhruv" });
const frozenObject = Object.freeze({ role: "Developer" });

performance.mark("start");
for (let i = 0; i < 1000000; i++) {}
performance.mark("end");
performance.measure("loop", "start", "end");

document.addEventListener("DOMContentLoaded", () => {
    const box = document.createElement("div");
    box.style.height = "200px";
    box.style.background = "lightblue";
    document.body.appendChild(box);

    const observer = new MutationObserver(mutations => {
        mutations.forEach(m => console.log("Mutation:", m));
    });

    observer.observe(box, { attributes: true });

    const intersection = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                box.textContent = "Visible on screen";
            }
        });
    });

    intersection.observe(box);

    setTimeout(() => {
        box.setAttribute("data-test", "123");
    }, 2000);
});

if (window.Worker) {
    const workerCode = `
        self.onmessage = function(e) {
            const result = e.data * 2;
            self.postMessage(result);
        }
    `;
    const blob = new Blob([workerCode], { type: "application/javascript" });
    const worker = new Worker(URL.createObjectURL(blob));
    worker.onmessage = e => console.log("Worker result:", e.data);
    worker.postMessage(5);
}