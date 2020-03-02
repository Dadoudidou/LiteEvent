export interface ILiteEvent<T> {
    on(handler: LiteEventHandler<T>): void;
    off(handler: LiteEventHandler<T>): void;
}
export declare type LiteEventHandler<T> = (data?: T) => void;
export declare class LiteEvent<T = any> implements ILiteEvent<T> {
    private handlers;
    constructor();
    on(handler: LiteEventHandler<T>): void;
    off(handler: LiteEventHandler<T>): void;
    trigger(data?: T): void;
    expose(): ILiteEvent<T>;
}
export declare type LiteEventList = {
    [key: string]: any | undefined;
};
export declare class LiteEventManager<T extends LiteEventList> {
    private events;
    add<K extends keyof T>(eventName: K): void;
    remove<K extends keyof T>(eventName: K): void;
    on<K extends keyof T>(eventName: K, handler: LiteEventHandler<T[K]>): void;
    off<K extends keyof T>(eventName: K, handler: LiteEventHandler<T[K]>): void;
    trigger<K extends keyof T>(eventName: K): LiteEventHandler<T[K]>;
}
