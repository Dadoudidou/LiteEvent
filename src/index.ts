export interface ILiteEvent<T> {
    on(handler: LiteEventHandler<T>) : void;
    off(handler: LiteEventHandler<T>) : void;
}

export type LiteEventHandler<T> = (data?: T) => void

export class Subscription<T = any> {
    context?: any
    handler: LiteEventHandler<T>
    constructor(handler: LiteEventHandler<T>, context?: any){
        this.context = context;
        this.handler = handler;
    }
}

export class LiteEvent<T = any> implements ILiteEvent<T> {
    private handlers: Subscription<T>[] = [];
    constructor(){
        this.on = this.on.bind(this);
        this.off = this.off.bind(this);
        this.expose = this.expose.bind(this);
        this.trigger = this.trigger.bind(this);
    }

    public on(handler: LiteEventHandler<T>, context?: any) : void {
        this.handlers.push(new Subscription(handler, context));
    }

    public off(handler?: LiteEventHandler<T>) : void {
        if(handler){
            this.handlers = this.handlers.filter(h => h.handler !== handler);
        } else {
            this.handlers = [];
        }
        
    }

    public trigger(data?: T) {
        this.handlers.slice(0).forEach(h => h.handler(data));
    }

    public pipe(){

    }

    public expose() : ILiteEvent<T> {
        return this;
    }
}

export type LiteEventList = {
    [key: string]: any | undefined
}

export class LiteEventManager<T extends LiteEventList> {
    protected events: { [key: string]: LiteEvent } = {};
    
    add<K extends keyof T>(eventName: K){
        this.events[eventName as string] = new LiteEvent()
    }
    remove<K extends keyof T>(eventName: K){
        (this.events[eventName as string] as any) = undefined;
    }
    on<K extends keyof T>(eventName: K | K[], handler: LiteEventHandler<T[K]>, context?: any){
        if(Array.isArray(eventName)){
            let _results: any[] = [];
            (eventName as K[]).forEach(x => {
                _results.push(this.on(x, handler))
            });
            return _results;
        }
        if(!this.events[eventName as string]) this.events[eventName as string] = new LiteEvent();
        return {
            attach: () => {
                this.events[eventName as string].on(handler, context);
            },
            detach: () => {
                this.events[eventName as string].off(handler);
            },
            pipe: () => {}
        }.attach()
        //this.events[eventName as string].on(handler);
    }
    off<K extends keyof T>(eventName: K | LiteEventHandler<T[K]>, handler?: LiteEventHandler<T[K]>){
        if(typeof(eventName) == "string"){
            if(this.events[eventName as string]){
                if(handler){
                    this.events[eventName as string].off(handler);
                } else {
                    this.events[eventName as string].off();
                }
            }
        } else if(typeof(eventName) == "function"){
            for(let key in this.events){
                this.events[key].off(eventName)
            }
        }
    }
    trigger<K extends keyof T>(eventName: K): LiteEventHandler<T[K]>{
        if(this.events[eventName as string]){
            return this.events[eventName as string].trigger;
        }
        return () => {}
    }
    getEvents(){
        return this.events;
    }
}
