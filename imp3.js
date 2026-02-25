function greet(name = "Guest") {
  return "Welcome " + name;
}

function sumAll(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

function operate(a, b, operation) {
  return operation(a, b);
}

const divide = (a, b) => a / b;

function counter() {
  let count = 0;
  return function () {
    count++;
    return count;
  };
}

const increment = counter();

let account = {
  owner: "Dhruv",
  balance: 1000,

  deposit(amount) {
    this.balance += amount;
    return this.balance;
  },

  withdraw(amount) {
    if (amount <= this.balance) {
      this.balance -= amount;
      return this.balance;
    }
    return "Insufficient balance";
  },

  getBalance: function () {
    return this.balance;
  },

  wrongMethod: () => {
    return this.balance;
  }
};

class Product {
  constructor(name, price) {
    this.name = name;
    this._price = price;
  }

  get price() {
    return this._price;
  }

  set price(value) {
    if (value > 0) {
      this._price = value;
    }
  }

  details() {
    return this.name + " costs " + this._price;
  }
}

const product1 = new Product("Laptop", 50000);

console.log(greet());
console.log(sumAll(10, 20, 30));
console.log(operate(10, 5, divide));
console.log(increment());
console.log(increment());

console.log(account.deposit(500));
console.log(account.withdraw(300));
console.log(account.getBalance());
console.log(account.wrongMethod());

console.log(product1.details());
product1.price = 55000;
console.log(product1.price);