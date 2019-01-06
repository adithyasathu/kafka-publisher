import * as Logger from "simple-node-logger";
import { Producer } from "node-rdkafka";
import {IPublisher} from "./interfaces";
export const log = Logger.createSimpleLogger();


export class Publisher implements IPublisher {

    private readonly producer: Producer;

    constructor(options) {
        this.producer = new Producer(options.client, options.topics);
    }

    public async start() {
        return new Promise (( resolve, reject) => {
            log.info("Starting Publisher ..");
            // initiate the producer
            this.producer.connect({},(err, data) => {
                reject(err);
            });

            // logging debug messages, if debug is enabled
            this.producer.on('event.log', (trace) => {
                log.info(trace);
            });

            //logging all errors
            this.producer.on('event.error', (err)=> {
                log.error('Error from producer', err);
            });

            this.producer.on("error", (err) => {
                reject(err);
                // we can enable messaging slack/email/message before exiting
            });

            //Wait for the ready event before producing
            this.producer.on('ready', () => {
                log.info('Publisher ready...');
                resolve(this.producer);
            });


        });
    }

    public async send(message, key, topic) {
            // if partition is set to -1, librdkafka will use the default partitioner
            const partition = -1; // TODO: come up with logic to manage the partition
            await this.producer.produce(topic, partition, Buffer.from(message), key);

    }

    public async stop() {
        log.info(`Disconnecting publisher ..`);
        this.producer.disconnect();
    }

}
