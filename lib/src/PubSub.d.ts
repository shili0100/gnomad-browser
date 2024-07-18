declare class PubSub {
    callbacks: never[];
    subscribe(callback: any): void;
    unsubscribe(callback: any): void;
    publish(obj: any): void;
}
export default PubSub;
