import * as config from "config";
import { Worker } from "./worker";
import {IWorker} from "./interfaces";
import {Publisher} from "./publisher";
const kafkaConfig: any = config.get("worker.kafka");

export async function fakeSales(num)  {
    let worker: IWorker = null;
    try {
        worker = new Worker(new Publisher(kafkaConfig), kafkaConfig.topic);
        await worker.start(num);
    } catch (e) {
        console.error(e);
    } finally {
        worker.stop();
    }
}
