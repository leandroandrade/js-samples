function PubSub() {
    const subscribers = {};

    function subscribe(eventName, callback) {
        if (!subscribers[eventName]) {
            subscribers[eventName] = new Map();
        }

        const key = `key${Math.random()}`;
        subscribers[eventName].set(key, callback);

        return {
            unsubscribe: () => subscribers[eventName].delete(key),
        };
    }

    function publish(eventName, data) {
        if (!subscribers[eventName]) return;
        subscribers[eventName].forEach(callback => callback(data));
    }

    return {
        subscribe,
        publish,
    };
}

const first = money => console.log(`The first received: ${money}`);
const second = money => console.log(`The second received: ${money}`);

const ps = PubSub();
const eventName = 'send-money';

const subFirst = ps.subscribe(eventName, first);
ps.subscribe(eventName, second);

ps.publish(eventName, 100);

subFirst.unsubscribe();

ps.publish(eventName, 200);
