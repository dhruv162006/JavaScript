// Dependency storage (private via closure)
const createStore = (initialState) => {
    let state = { ...initialState }; // immutable copy
    const listeners = new Set(); // pub-sub

    // WeakMap for dependency tracking
    const deps = new WeakMap();

    const notify = () => {
        queueMicrotask(() => {  // Microtask (runs before setTimeout)
            listeners.forEach(listener => listener(state));
        });
    };

    const subscribe = (listener) => {
        listeners.add(listener);
        return () => listeners.delete(listener);
    };

    const setState = (updater) => {
        const newState =
            typeof updater === "function"
                ? updater(state)
                : updater;

        state = { ...state, ...newState }; // immutable update
        notify();
    };

    // Proxy to track access
    const reactiveState = new Proxy(state, {
        get(target, prop) {
            return target[prop];
        },
        set() {
            throw new Error("Direct mutation not allowed. Use setState()");
        }
    });

    return {
        getState: () => reactiveState,
        setState,
        subscribe
    };
};


// =====================
// Using the Store
// =====================

const store = createStore({ count: 0, user: "Dhruv" });

// Subscribe (Observer pattern)
const unsubscribe = store.subscribe((newState) => {
    console.log("State Updated:", newState);
});

// Higher-order function + currying
const incrementBy = (value) => (state) => ({
    count: state.count + value
});

// Update state
store.setState(incrementBy(5));
store.setState({ user: "Engineer" });

// Try direct mutation (will fail)
try {
    store.getState().count = 100;
} catch (err) {
    console.log(err.message);
}

// Unsubscribe
unsubscribe();

// Further updates won't trigger listener
store.setState({ count: 999 });