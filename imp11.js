function myNew(Constructor, ...args) {
    const obj = Object.create(Constructor.prototype);
    const result = Constructor.apply(obj, args);
    return (typeof result === "object" && result !== null) ? result : obj;
}

function deepClone(value, hash = new WeakMap()) {
    if (value === null || typeof value !== "object") return value;

    if (hash.has(value)) return hash.get(value);

    const result = Array.isArray(value)
        ? []
        : Object.create(Object.getPrototypeOf(value));

    hash.set(value, result);

    Reflect.ownKeys(value).forEach(key => {
        const desc = Object.getOwnPropertyDescriptor(value, key);
        if (desc.get || desc.set) {
            Object.defineProperty(result, key, desc);
        } else {
            result[key] = deepClone(value[key], hash);
        }
    });

    return result;
}

function Person(name, age) {
    this.name = name;
    this.age = age;
}

Object.defineProperty(Person.prototype, "info", {
    get: function () {
        return `${this.name} is ${this.age} years old`;
    }
});

Person.prototype.greet = function () {
    return `Hi, I am ${this.name}`;
};

const original = myNew(Person, "Dhruv", 21);

original.skills = ["JS", "C++"];
original.meta = { active: true };
original.self = original;

const cloned = deepClone(original);

console.log(original.greet());
console.log(cloned.greet());

console.log(original.info);
console.log(cloned.info);

console.log(cloned.self === cloned);
console.log(cloned instanceof Person);
console.log(Object.getPrototypeOf(cloned) === Person.prototype);