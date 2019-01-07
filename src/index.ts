import * as config from "config";
import { Worker } from "./worker";
import {IWorker} from "./interfaces";
import {Publisher} from "./publisher";
import * as Logger from "simple-node-logger";
const kafkaConfig: any = config.get("worker.kafka");
export const log = Logger.createSimpleLogger();

export async function fakeSales(num)  {
    let worker: IWorker = null;
    try {
        worker = new Worker(new Publisher(kafkaConfig), kafkaConfig.topic);
        await worker.start(num);
    } catch (e) {
        log.error(e);
    } finally {
        worker.stop();
    }
}
