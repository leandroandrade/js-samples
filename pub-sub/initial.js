function PubSub() {
    const subscribers = {};

    function subscribe(eventName, callback) {
        if (!Array.isArray(subscribers[eventName])) {
            subscribers[eventName] = [];
        }
        subscribers[eventName].push(callback);

        return {
            unsubscribe() {
                subscribers[eventName] = subscribers[eventName].filter(cb => {
                    if (cb === callback) return false;
                    return true;
                });
            },
        };
    }

    function publish(eventName, data) {
        if (!Array.isArray(subscribers[eventName])) return;
        subscribers[eventName].forEach(callback => {
            callback(data);
        });
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
