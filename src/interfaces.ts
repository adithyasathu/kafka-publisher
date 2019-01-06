export interface IWorker {
    start(num?: number);
    stop();
}

export interface IPublisher {
    start();
    stop();
    send(message, key, topic);
}
