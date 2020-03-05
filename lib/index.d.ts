export interface ILiteEvent<T> {
    on(handler: LiteEventHandler<T>): void;
    off(handler: LiteEventHandler<T>): void;
}
export declare type LiteEventHandler<T> = (data?: T) => void;
export declare class Subscription<T = any> {
    context?: any;
    handler: LiteEventHandler<T>;
    constructor(handler: LiteEventHandler<T>, context?: any);
}
export declare class LiteEvent<T = any> implements ILiteEvent<T> {
    private handlers;
    constructor();
    on(handler: LiteEventHandler<T>, context?: any): void;
    off(handler?: LiteEventHandler<T>): void;
    trigger(data?: T): void;
    pipe(): void;
    expose(): ILiteEvent<T>;
}
export declare type LiteEventList = {
    [key: string]: any | undefined;
};
export declare class LiteEventManager<T extends LiteEventList> {
    protected events: {
        [key: string]: LiteEvent;
    };
    add<K extends keyof T>(eventName: K): void;
    remove<K extends keyof T>(eventName: K): void;
    on<K extends keyof T>(eventName: K | K[], handler: LiteEventHandler<T[K]>, context?: any): void | any[];
    off<K extends keyof T>(eventName: K | LiteEventHandler<T[K]>, handler?: LiteEventHandler<T[K]>): void;
    trigger<K extends keyof T>(eventName: K): LiteEventHandler<T[K]>;
    getEvents(): {
        [key: string]: LiteEvent<any>;
    };
}
