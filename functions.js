function add(a, b) {
  return a + b;
}

const multiply = function (a, b) {
  return a * b;
};

const subtract = (a, b) => a - b;

const greet = function (name) {
  return "Hello " + name;
};

(function () {
  console.log("IIFE executed");
})();

function processNumber(num, callback) {
  return callback(num);
}

const square = function (n) {
  return n * n;
};

console.log(add(5, 3));
console.log(multiply(5, 3));
console.log(subtract(5, 3));
console.log(greet("Dhruv"));
console.log(processNumber(4, square));

let student = {
  name: "Dhruv",
  age: 21,
  greet() {
    return "Hi, I am " + this.name;
  },
  increaseAge() {
    this.age++;
    return this.age;
  }
};

console.log(student.greet());
console.log(student.increaseAge());

function User(name, age) {
  this.name = name;
  this.age = age;
  this.introduce = function () {
    return "My name is " + this.name;
  };
}

let user1 = new User("Rahul", 22);
console.log(user1.introduce());

class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    return "Hello, I am " + this.name;
  }

  static info() {
    return "This is a Person class";
  }
}

let p1 = new Person("Ankit", 25);

console.log(p1.greet());
console.log(Person.info());