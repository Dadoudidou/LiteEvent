"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Subscription {
    constructor(handler, context) {
        this.context = context;
        this.handler = handler;
    }
}
exports.Subscription = Subscription;
class LiteEvent {
    constructor() {
        this.handlers = [];
        this.on = this.on.bind(this);
        this.off = this.off.bind(this);
        this.expose = this.expose.bind(this);
        this.trigger = this.trigger.bind(this);
    }
    on(handler, context) {
        this.handlers.push(new Subscription(handler, context));
    }
    off(handler) {
        if (handler) {
            this.handlers = this.handlers.filter(h => h.handler !== handler);
        }
        else {
            this.handlers = [];
        }
    }
    trigger(data) {
        this.handlers.slice(0).forEach(h => h.handler(data));
    }
    pipe() {
    }
    expose() {
        return this;
    }
}
exports.LiteEvent = LiteEvent;
class LiteEventManager {
    constructor() {
        this.events = {};
    }
    add(eventName) {
        this.events[eventName] = new LiteEvent();
    }
    remove(eventName) {
        this.events[eventName] = undefined;
    }
    on(eventName, handler, context) {
        if (Array.isArray(eventName)) {
            let _results = [];
            eventName.forEach(x => {
                _results.push(this.on(x, handler));
            });
            return _results;
        }
        if (!this.events[eventName])
            this.events[eventName] = new LiteEvent();
        return {
            attach: () => {
                this.events[eventName].on(handler, context);
            },
            detach: () => {
                this.events[eventName].off(handler);
            },
            pipe: () => { }
        }.attach();
    }
    off(eventName, handler) {
        if (typeof (eventName) == "string") {
            if (this.events[eventName]) {
                if (handler) {
                    this.events[eventName].off(handler);
                }
                else {
                    this.events[eventName].off();
                }
            }
        }
        else if (typeof (eventName) == "function") {
            for (let key in this.events) {
                this.events[key].off(eventName);
            }
        }
    }
    trigger(eventName) {
        if (this.events[eventName]) {
            return this.events[eventName].trigger;
        }
        return () => { };
    }
    getEvents() {
        return this.events;
    }
}
exports.LiteEventManager = LiteEventManager;
