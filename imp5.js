// Base Class
class Task {
    static totalTasks = 0; // Static property

    #id; // Private field

    constructor(title) {
        this.title = title;
        this.completed = false;
        this.#id = ++Task.totalTasks;
    }

    toggleStatus() {
        this.completed = !this.completed;
    }

    getDetails() {
        return `#${this.#id} - ${this.title} [${this.completed ? "Done" : "Pending"}]`;
    }

    static getTotalTasks() {
        return Task.totalTasks;
    }
}

// Inheritance
class TimedTask extends Task {
    constructor(title, deadline) {
        super(title);
        this.deadline = deadline;
    }

    getDetails() {
        return `${super.getDetails()} | Deadline: ${this.deadline}`;
    }
}

// Closure for private storage
function createTaskManager() {
    const taskMap = new Map(); // private storage

    return {
        addTask(task) {
            taskMap.set(task.title, task);
        },

        async completeTask(title) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    const task = taskMap.get(title);
                    if (!task) {
                        reject("Task not found");
                    } else {
                        task.toggleStatus();
                        resolve(task);
                    }
                }, 1000);
            });
        },

        getAllTasks() {
            return [...taskMap.values()].map(task => task.getDetails());
        }
    };
}

// Using everything
async function main() {
    const manager = createTaskManager();

    const t1 = new Task("Learn JS");
    const t2 = new TimedTask("Build Project", "March 5");

    manager.addTask(t1);
    manager.addTask(t2);

    console.log("All Tasks:", manager.getAllTasks());

    try {
        const updatedTask = await manager.completeTask("Learn JS");
        console.log("Completed:", updatedTask.getDetails());
    } catch (err) {
        console.log(err);
    }

    console.log("Total Tasks Created:", Task.getTotalTasks());

    // Spread + Rest example
    const tasksArray = manager.getAllTasks();
    const [first, ...rest] = tasksArray;

    console.log("First Task:", first);
    console.log("Remaining Tasks:", rest);
}

main();