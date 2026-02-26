// Constructor Function (Prototype concept)
function User(name, balance) {
    this.name = name;
    this.balance = balance;
}

// Prototype Method
User.prototype.getDetails = function () {
    return `${this.name} has ₹${this.balance}`;
};

// Closure for private transaction counter
function createBankSystem() {
    let transactionCount = 0; // private variable

    return {
        processTransaction(user, amount) {
            transactionCount++;

            return new Promise((resolve, reject) => {
                setTimeout(() => {  // Event loop concept
                    if (amount < 0 && Math.abs(amount) > user.balance) {
                        reject("Insufficient balance!");
                    } else {
                        user.balance += amount;
                        resolve({
                            user: user.name,
                            balance: user.balance,
                            totalTransactions: transactionCount
                        });
                    }
                }, 1000);
            });
        }
    };
}

// Using everything together
async function main() {
    const bank = createBankSystem();

    const user1 = new User("Dhruv", 1000);

    console.log(user1.getDetails());

    try {
        const result = await bank.processTransaction(user1, 500);

        // Destructuring
        const { user, balance, totalTransactions } = result;

        console.log(`Updated: ${user} now has ₹${balance}`);
        console.log(`Total Transactions: ${totalTransactions}`);

    } catch (error) {
        console.log("Error:", error);
    }

    console.log(user1.getDetails());
}

main();