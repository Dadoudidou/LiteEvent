"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LiteEvent {
    constructor() {
        this.handlers = [];
        this.on = this.on.bind(this);
        this.off = this.off.bind(this);
        this.expose = this.expose.bind(this);
        this.trigger = this.trigger.bind(this);
    }
    on(handler) {
        this.handlers.push(handler);
    }
    off(handler) {
        this.handlers = this.handlers.filter(h => h !== handler);
    }
    trigger(data) {
        this.handlers.slice(0).forEach(h => h(data));
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
    on(eventName, handler) {
        if (this.events[eventName]) {
            this.events[eventName].on(handler);
        }
    }
    off(eventName, handler) {
        if (this.events[eventName]) {
            this.events[eventName].off(handler);
        }
    }
    trigger(eventName) {
        if (this.events[eventName]) {
            console.log(this.events[eventName]);
            return this.events[eventName].trigger;
        }
        return () => { };
    }
}
exports.LiteEventManager = LiteEventManager;
