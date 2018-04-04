export declare class EventListenerSet {
    private readonly _eventListeners;
    constructor();
    get(kutId: string, event: string): Function;
    set(kutId: string, event: string, eventListener: (e: Event) => void): void;
    del(kutId: string, event: string): void;
    delAll(kutId: string): void;
}
export declare const eventListenerSet: EventListenerSet;
