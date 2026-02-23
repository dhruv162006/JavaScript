"use strict";

var globalVar = "I am var";
let blockScoped = "I am let";
const constantValue = 42;

const user = {
    name: "Dhruv",
    age: 20,
    skills: ["JavaScript", "React", "Node"],
    greet() {
        return `Hello, my name is ${this.name}`;
    }
};

class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    introduce() {
        return `${this.name} is ${this.age} years old`;
    }

    static species() {
        return "Homo Sapiens";
    }
}

class Developer extends Person {
    constructor(name, age, stack) {
        super(name, age);
        this.stack = stack;
    }

    code() {
        return `${this.name} codes in ${this.stack.join(", ")}`;
    }
}

const dev = new Developer("Dhruv", 20, ["JS", "C++"]);

function normalFunction(a, b) {
    return a + b;
}

const arrowFunction = (a, b) => a * b;

function higherOrder(fn, a, b) {
    return fn(a, b);
}

function closureExample() {
    let count = 0;
    return function () {
        count++;
        return count;
    };
}

const counter = closureExample();

const numbers = [1, 2, 3, 4, 5];

const squared = numbers.map(n => n * n);
const even = numbers.filter(n => n % 2 === 0);
const sum = numbers.reduce((acc, curr) => acc + curr, 0);

const [first, second, ...rest] = numbers;

const newArray = [...numbers, 6, 7];

function restExample(...args) {
    return args.reduce((a, b) => a + b, 0);
}

const modulePattern = (function () {
    let privateData = "Secret";
    return {
        getData() {
            return privateData;
        },
        setData(value) {
            privateData = value;
        }
    };
})();

function asyncOperation() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Async Completed");
        }, 1000);
    });
}

async function runAsync() {
    try {
        const result = await asyncOperation();
        return result;
    } catch (error) {
        return error;
    }
}

async function fetchData() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
        const data = await response.json();
        return data;
    } catch (error) {
        return error;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const container = document.createElement("div");
    container.id = "app";

    const button = document.createElement("button");
    button.textContent = "Click Me";

    const output = document.createElement("p");

    button.addEventListener("click", async () => {
        const asyncResult = await runAsync();
        const apiData = await fetchData();
        output.textContent = `${asyncResult} | Title: ${apiData.title}`;
        localStorage.setItem("lastResult", output.textContent);
    });

    container.appendChild(button);
    container.appendChild(output);
    document.body.appendChild(container);
});

try {
    const result1 = normalFunction(5, 10);
    const result2 = arrowFunction(5, 10);
    const result3 = higherOrder(normalFunction, 10, 20);
    const closureCount = counter();
    const moduleData = modulePattern.getData();
    const intro = dev.introduce();
    const coding = dev.code();
} catch (err) {
    console.error("Error occurred:", err);
}