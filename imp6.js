// IIFE (Module Pattern)
const AnalyticsSystem = (function () {

    const _privateKey = Symbol("auth"); // Symbol for hidden access
    let eventCount = 0; // Closure private variable

    // Generator for unique IDs
    function* idGenerator() {
        let id = 1;
        while (true) {
            yield id++;
        }
    }

    const generateId = idGenerator();

    // Currying example
    const createLogger = (type) => (message) => {
        console.log(`[${type}] ${message}`);
    };

    const infoLogger = createLogger("INFO");
    const errorLogger = createLogger("ERROR");

    // Debounce function
    function debounce(fn, delay) {
        let timer;
        return function (...args) {
            clearTimeout(timer);
            timer = setTimeout(() => {
                fn.apply(this, args);
            }, delay);
        };
    }

    class Event {
        constructor(name) {
            this.id = generateId.next().value;
            this.name = name;
        }
    }

    // Proxy for validation
    function secureEvent(event) {
        return new Proxy(event, {
            set(target, prop, value) {
                if (prop === "name" && value.length < 3) {
                    throw new Error("Event name too short");
                }
                target[prop] = value;
                return true;
            }
        });
    }

    async function logEvent(event, key) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {  // Event loop
                if (key !== _privateKey) {
                    errorLogger("Unauthorized attempt");
                    reject("Invalid key");
                } else {
                    eventCount++;
                    infoLogger(`Event Logged: ${event.name} (ID: ${event.id})`);
                    resolve(eventCount);
                }
            }, 500);
        });
    }

    return {
        createEvent(name) {
            return secureEvent(new Event(name));
        },
        log(event) {
            return logEvent(event, _privateKey);
        },
        getEventCount() {
            return eventCount;
        },
        debounce
    };

})();


// =======================
// USING THE SYSTEM
// =======================

async function main() {

    const event1 = AnalyticsSystem.createEvent("Login");

    try {
        const total = await AnalyticsSystem.log(event1);
        console.log("Total Events:", total);
    } catch (err) {
        console.log(err);
    }

    // Debounce usage
    const debouncedLog = AnalyticsSystem.debounce(
        () => console.log("Search event triggered"),
        1000
    );

    debouncedLog();
    debouncedLog();
    debouncedLog(); // Only last one runs
}

main();