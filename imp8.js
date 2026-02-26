class EventEmitter {
    constructor() {
        this.events = {};
    }

    on(event, listener) {
        (this.events[event] ||= []).push(listener);
    }

    emit(event, ...args) {
        (this.events[event] || []).forEach(fn => fn(...args));
    }
}

class MyPromise {
    constructor(executor) {
        this.state = "pending";
        this.value = undefined;
        this.handlers = [];

        const resolve = (value) => {
            if (this.state !== "pending") return;
            this.state = "fulfilled";
            this.value = value;
            this.handlers.forEach(h => h(value));
        };

        executor(resolve);
    }

    then(callback) {
        if (this.state === "fulfilled") {
            callback(this.value);
        } else {
            this.handlers.push(callback);
        }
        return this;
    }
}

const compose = (middlewares) => {
    return (context) => {
        const dispatch = (i) => {
            if (i >= middlewares.length) return;
            const fn = middlewares[i];
            fn(context, () => dispatch(i + 1));
        };
        dispatch(0);
    };
};

const PRIVATE = Symbol("private");

class TaskRunner extends EventEmitter {
    constructor() {
        super();
        this[PRIVATE] = {
            tasks: [],
            middlewares: []
        };
    }

    use(middleware) {
        this[PRIVATE].middlewares.push(middleware);
    }

    addTask(task) {
        this[PRIVATE].tasks.push(task);
    }

    run() {
        const context = { completed: 0 };
        const pipeline = compose(this[PRIVATE].middlewares);

        this[PRIVATE].tasks.forEach(task => {
            pipeline(context);

            new MyPromise(resolve => {
                setTimeout(() => {
                    resolve(task());
                }, 500);
            }).then(result => {
                context.completed++;
                this.emit("taskComplete", result);
            });
        });
    }
}

const runner = new TaskRunner();

runner.use((ctx, next) => {
    console.log("Starting task...");
    next();
});

runner.use((ctx, next) => {
    console.log("Tasks completed so far:", ctx.completed);
    next();
});

runner.on("taskComplete", (result) => {
    console.log("Task Result:", result);
});

runner.addTask(() => "Task 1 Done");
runner.addTask(() => "Task 2 Done");

runner.run();