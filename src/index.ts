export interface ILiteEvent<T> {
    on(handler: LiteEventHandler<T>) : void;
    off(handler: LiteEventHandler<T>) : void;
}

export type LiteEventHandler<T> = (data?: T) => void

export class LiteEvent<T = any> implements ILiteEvent<T> {
    private handlers: LiteEventHandler<T>[] = [];

    public on(handler: LiteEventHandler<T>) : void {
        this.handlers.push(handler);
    }

    public off(handler: LiteEventHandler<T>) : void {
        this.handlers = this.handlers.filter(h => h !== handler);
    }

    public trigger(data?: T) {
        this.handlers.slice(0).forEach(h => h(data));
    }

    public expose() : ILiteEvent<T> {
        return this;
    }
}

export type LiteEventList = {
    [key: string]: any | undefined
}

export class LiteEventManager<T extends LiteEventList> {
    private events: { [key: string]: LiteEvent } = {};
    
    add<K extends keyof T>(eventName: K){
        this.events[eventName as string] = new LiteEvent()
    }
    remove<K extends keyof T>(eventName: K){
        (this.events[eventName as string] as any) = undefined;
    }
    on<K extends keyof T>(eventName: K, handler: LiteEventHandler<T[K]>){
        if(this.events[eventName as string]){
            this.events[eventName as string].on(handler);
        }
    }
    off<K extends keyof T>(eventName: K, handler: LiteEventHandler<T[K]>){
        if(this.events[eventName as string]){
            this.events[eventName as string].off(handler);
        }
    }
    trigger<K extends keyof T>(eventName: K): LiteEventHandler<T[K]>{
        if(this.events[eventName as string]){
            return this.events[eventName as string].trigger;
        }
        return () => {}
    }
}